
import request from '@/utils/request_fron' ; 

// 首页信息
export function index(data) {
  return request({
    url: '/demand/findHomeDate',
    method: 'POST',
    data
  })
}

export function getOrgById(id){
  return request({
    url: '/org/getById?id='+id,
    method: 'POST',
    data:{
      id
    }
  })
}

