import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Context = 'context'
const UploadsUrl = 'uploadsUrl'
const Union='dmd'
const FrontToken='frontToken'
const userInfo='userInfo'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  try {
    return Cookies.set(TokenKey, token)
  }catch (e) {
    console.log('error', e)
  }
  console.log('token', getToken(TokenKey))
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 请求企业上下文
export function getContext() {
  return Cookies.get(Context)
}

export function setContext(context) {
  return Cookies.set(Context, context)
}

export function removeContext() {
  return Cookies.remove(Context)
}

// 请求图片上传路径
export function getUploadsUrl() {
  return Cookies.get(UploadsUrl)
}

export function setUploadsUrl(Url) {
  return Cookies.set(UploadsUrl, Url)
}

export function removeUploadsUrl() {
  return Cookies.remove(UploadsUrl)
}

// 前端token
export function getFrontToken() {
  return Cookies.get(FrontToken)
}

export function setFrontToken(token) {
  return Cookies.set(FrontToken, token)
}

export function removeFrontToken() {
  return Cookies.remove(FrontToken)
}


// 前端用户信息
export function getuserInfo() {
  return Cookies.get(userInfo)
}

export function setuserInfo(obj) {
  return Cookies.set(userInfo, obj)
}

export function removeuserInfo() {
  return Cookies.remove(userInfo)
}
