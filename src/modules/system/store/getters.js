const systemGetters = {
  // login信息
  sid: state => state.system.login.sid,
  currentUser: state => state.system.login.currentUser,
  username: state => state.system.login.username,
  realname: state => state.system.login.realname,
  issuerCode: state => state.system.login.issuerCode,
  platCategoryCodes: state => state.system.statics.platCategoryCodes,
  shopCategoryCodes: state => state.system.statics.shopCategoryCodes,
  areas: state => state.coupon.areas,
  couponCategories: state => state.coupon.couponCategories
}
export default systemGetters
