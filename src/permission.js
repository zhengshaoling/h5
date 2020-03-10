import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken, setContext, getFrontToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration
// // 白名单
// const whiteList = ['/login', '/auth-redirect']

router.beforeEach((to, from, next) => {
  var context = to.params.name || from.params.name
  if (context) {
    setContext(context)
  } else {
    context = to.path.split("/")[2]
    setContext(context)
  }
  // 获取每个公司标识，并记录每个公司标识
  const company_params = '/dmd/' + (context);
  store.dispatch('Company_params', context);
  // 白名单添加公司标识
  const whiteList = [
    '/401',
    company_params + '/index'
  ]
  // 前端需登录
  const frontAdmin = []

  NProgress.start() // 开始进度条
  const token = getToken();
  if (token) { // 确定是否有令牌
    /* has token*/
    if (to.path === company_params + '/login') {
      next({ path: company_params + '/admin/dashboard' })
      NProgress.done() // 如果当前页面是仪表板，则不会在每个钩子之后触发，因此请手动处理它
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const roles =[] // note: roles must be a array! such as: ['editor','develop']
          if (res.userType === 2){
            roles.push('editor')
          } else if (res.userType === 3) {
            roles.push('admin')
          }
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: company_params + '/admin/dashboard' })
          })
        })
      } else {
        next()
      }
      next()
    }
  } else if (context === 'admin') {
    if (to.path === '/dmd/admin/login'){
      next()
    } else {
      next(company_params + '/login') // 否则全部重定向到首页
      NProgress.done()
    }
  } else if (frontAdmin.indexOf(to.path) !== -1) {
    if (getFrontToken()) {
      next()
    } else {
      next(company_params + '/front/login') // 否则全部重定向到首页
      NProgress.done()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(company_params + '/index') // 否则全部重定向到首页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }

  if (to.meta.title) {
    document.title = to.meta.title
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
