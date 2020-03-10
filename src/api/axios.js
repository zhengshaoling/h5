import axios from "axios"
import { Message } from 'element-ui'
import { getToken, getFrontToken } from "@/utils/auth"
const base = '/api/dmd';

axios.interceptors.response.use(response => {
  const res = response.data
  if (res.code === '0000') {
    return response.data
  } else {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })
  }
})

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    headers: {
      'token': getToken()
    }
  })
};

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json',
      'token': getToken()
    }
  })
};

// 前端请求
export const getfrontRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    headers: {
      'token': getFrontToken()
    }
  })
};

export const postfrontRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json',
      'token': getFrontToken()
    }
  })
};

export const postFormRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': getToken()
    }
  })
}
