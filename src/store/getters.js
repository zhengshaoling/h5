const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  context: state => state.user.context,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  company_params: state => state.user.company_params,
  userInfo: state => state.user.userInfo,
  union: state => state.user.union,
  unionPath: state => state.user.unionPath
}
export default getters
