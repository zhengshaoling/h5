import request from '@/utils/request' ;
export default {
  list(data) {
    return request({
      url: '/org/list',
      method: 'post',
      data
    })
  },
  save(data) {
    return request({
      url: '/org/save',
      method: 'post',
      data
    })
  },
  getById(id) {
    return request({
      url: '/org/getById/'+id,
      method: 'post'
    })
  },
  delete(data) {
    return request({
      url: '/org/delete',
      method: 'post',
      data
    })
  }
}
