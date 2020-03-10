import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout';
const admin = require('./admin.js'); // 后台路由
const arrRouter = [];

export const constantRouterMap = [{
  path: '/index',
  name: 'index', // 首页
  component: _import('front/index'),
  meta: {
    title: "首页"
  },
  hidden: true
},
{
  path: '/404',
  component: _import('404'),
  hidden: true
}];

const addCtx = item => {
  item.path = '/dmd/:name' + item.path;
  if (item.redirect !== undefined && item.redirect !== 'noredirect') {
    item.redirect = '/dmd/:name' + item.redirect;
  }
  return item;
};
constantRouterMap.map(addCtx);
constantRouterMap.push({
  path: '/401',
  component: _import('401'),
  hidden: true
});
// 静态路由
// console.log(constantRouterMap, 'constantRouterMap')
export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = arrRouter.concat(admin.router);
asyncRouterMap.map(addCtx); // 静态路由
