import { loginByUsername, logout, getUserInfo, getUnionInfo } from '@/api/login'
import { login, getLoginUser } from '@/api/admin/user'
import qs from 'qs'
import { getToken, setToken, removeToken, getContext, setContext, removeContext } from '@/utils/auth'
import axios from 'axios'
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    context: getContext() || '',
    name: '',
    avatar: '',
    introduction: '',
    userInfo: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    union: {},
    company_params: getContext() || '',
    unionPath: '/dmd/'+getContext()
  },
  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_CONTEXT: (state, context) => {
      state.context = context
      state.unionPath = '/dmd/'+context
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_COMPANY_PARAMS: (state, company_params) => {
      state.company_params = company_params
      state.unionPath = '/dmd/'+company_params
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_UNION: (state, union) => {
      state.union = union
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const mobile = userInfo.mobile.trim()
      return new Promise((resolve, reject) => {
        login(qs.stringify({ mobile, password: userInfo.password })).then(response => {
          const data = response
          commit('SET_TOKEN', data)
          commit('DEL_ALL_VISITED_VIEWS', [])
          // console.log("//  login : ", mobile)
          // commit('SET_CONTEXT', userInfo.context)
          setToken(data)
          // setContext(userInfo.context)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getLoginUser(state.token).then(response => {
          // console.log(response, 'responseresponseresponse')
          // response.vo['roles']=['admin']
          if (!response) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response
          // if (data.vo.roles && data.vo.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          const userRole = [];
          if (data.userType === 2){
            userRole.push('editor')
          } else if (data.userType === 3) {
            userRole.push('admin')
          }
          commit('SET_ROLES', userRole)
          commit("SET_USERINFO", data)
          // commit("SET_UNION", data.unionVO)
          commit('SET_NAME', data.userName)
          // commit('SET_AVATAR', data.data.avatar)
          // commit('SET_INTRODUCTION', data.data.title)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // 临时退出登陆
        axios({
          method: 'post',
          url: '/api/login/logout'
        }).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit("SET_USERINFO", '')
          commit('DEL_ALL_VISITED_VIEWS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit("SET_USERINFO", '')
        commit('SET_ROLES', [])
        commit('DEL_ALL_VISITED_VIEWS', [])
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    },

    // 公司标识
    Company_params({ commit, dispatch }, company_params) {
      return new Promise(resolve => {
        commit('SET_COMPANY_PARAMS', company_params)
        commit('SET_CONTEXT', company_params)
      })
    },
    // 获取按钮权限
    getAuthorizedItem({ commit, dispatch }, getAuth) {
      return new Promise(resolve => {
        commit('SET_GETAUTHOR', getAuth)
      })
    },

    // 企业信息
    getUnion({ commit }, union) {
      return new Promise((resolve, reject) => {
        getUnionInfo().then(response => {
          const data = response
          commit('SET_UNION', data)
          if (user.state.company_params){
            setContext(user.state.company_params)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default user
