import request from '@/utils/request' ;
/**
 * 登录
 * @param data
 */
export function login(data) {
  return request({
    url: '/user/loginByPwd',
    method: 'post',
    data
  })
}

export function getLoginUser() {
  return request({
    url: '/user/getInfo',
    method: 'get'
  })
}

export function list(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/user/save',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

export function getById(id) {
  return request({
    url: '/user/getById/'+id,
    method: 'post'
  })
}
