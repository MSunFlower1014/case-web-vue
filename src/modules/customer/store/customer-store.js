const customerData = {
  namespace: true,
  state: {
    ruleList: [],
    historyList: []
  },
  mutations: {
    setRuleList: (state, ruleList) => {
      state.ruleList = ruleList
    },
    setHistoryList: (state, historyList) => {
      state.historyList = historyList
    }
  },
  actions: {}
}

export default customerData
