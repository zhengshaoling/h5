import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { Toast } from 'mint-ui';
import store from '@/store'
import { getToken, getContext, setUploadsUrl, removeContext,getFrontToken,removeFrontToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (getFrontToken()) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Token'] = getFrontToken()
    } 
    return config
  },
  error => {
    // Do something with request
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response.data,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.code !== '0000') {
      // if (res.code === '4915'){
      //   removeContext()
      //   router.push("/401");
      //   return
      // }
      if(res.code === '4010'){
        removeFrontToken() 
        router.push(store.getters.unionPath+"/front/login");
      }
      Toast(res.msg)

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // 请自行在引入 MessageBox

      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload() // 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      return Promise.reject('error')
    } else {
      setUploadsUrl(response.data.uploadsUrl)
      return response.data.data
    }
  },
  error => {
     
    Toast(error.error)
    return Promise.reject(error)
  }
)

export default service
