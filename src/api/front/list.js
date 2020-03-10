import request from '@/utils/request' ;
import { getFrontToken } from "@/utils/auth"

// import request from '@/utils/request';

// const usr='/usr'
// const url = 'https://sit.ufa.hk:8081'

// 供需列表信息
export function list(param) {
  return request({
    url: '/demand/queryPage',
    data: param,
    method: 'post'
  })
}
// 达成合作信息
export function matchList(param) {
  return request({
    url: '/demand/findMatch',
    data: param,
    method: 'post'
  })
}

// 供需方详情
export function getDetail(param) {
  return request({
    url: '/demand/getDetail',
    data: param,
    method: 'post'
  })
}

// 添加回复
export function reply(param) {
  return request({
    url: '/comment/add',
    data: param,
    method: 'post',
    headers: {
      'token': getFrontToken()
    }
  })
}
