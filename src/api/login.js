import request from '@/utils/request';

const auth = '/auth';
const srm = '/srm';

/**
 * 登录
 * @param {*} account
 * @param {*} password
 */
export function loginByUsername(account, password, context) {
  const data = {
    account,
    password,
    context
  };
  return request({
    url: '/jwt/token',
    method: 'post',
    data
  });
}

/**
 * 登出
 */
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

/**
 * 登录用户信息
 * @param {*} token
 */
export function getUserInfo(token) {
  return request({
    url: auth + '/user/getLoginUser',
    method: 'get',
    params: {
      token
    }
  })
}

/**
 * SRM系统信息
 * @param {*} obj
 */
export function getSrmSetupInfo(obj) {
  return request({
    url: srm + '/srm/getSrmSetupInfo',
    method: 'get',
    params: obj
  })
}

/**
 * 菜单
 */
export function getAuthorizedItem() {
  return request({
    url: auth + '/structure/getAuthorizedItem'
  })
}

// header
export function getUnionInfo() {
  return request({
    url: '/front/index/getUnion',
    method: 'get'
  })
}
