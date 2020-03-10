import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data
import '@/assets/ufaicon/iconfont.css'// 图标库
import '@/assets/css/common.css' // 引入公共样式
// import { getRequest, postRequest } from './api/axios.js';
import filters from './filters';
import Mint from 'mint-ui'
import { Loadmore } from 'mint-ui';
import '@/assets/css/mint_style.css'

Vue.use(Mint)
Vue.component(Loadmore.name, Loadmore);
//
// Vue.prototype.getRequest = getRequest;
// Vue.prototype.postRequest = postRequest;

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false;
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));// 注册全局过滤器

/** 权限指令**/
Vue.directive('auth', {
  bind: function(el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.setAttribute("disabled", "disabled");
      el.setAttribute("class", el.getAttribute("class").concat(' is-disabled'));
    }
  }
});
// 权限检查方法
Vue.prototype.$_has = function(value) {
  let isExist=false;

  // TODO 对接
  // let buttonpermsStr=sessionStorage.getItem("buttenpremissions");
  // if(buttonpermsStr==undefined || buttonpermsStr==null){
  //   return false;
  // }
  // let buttonperms=JSON.parse(buttonpermsStr);
  const buttonperms = [{ perms: 'edit' }];
  for (let i=0;i<buttonperms.length;i++){
    if (buttonperms[i].perms.indexOf(value)>-1){
      isExist=true;
      break;
    }
  }
  return isExist;
};
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
