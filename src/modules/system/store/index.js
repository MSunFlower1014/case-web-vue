import login from './login-store'
import statics from './static-store'
const system = {
  namespaced: true,
  modules: {
    login,
    statics
  }
}
export default system
