<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{realname}}，欢迎您</div>
    <div class="dashboard-text">当前时间:{{getCurrentDate()}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters(['username', 'realname'])
  },
  methods: {
    getCurrentDate() {
      let now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth()
      month = month + 1

      let date = now.getDate()
      let hour = now.getHours()
      let minu = now.getMinutes()
      let sec = now.getSeconds()

      if (month < 10) {
        month = '0' + month
      }
      if (date < 10) {
        date = '0' + date
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minu < 10) {
        minu = '0' + minu
      }
      if (sec < 10) {
        sec = '0' + sec
      }

      let time =
        year + '-' + month + '-' + date + ' ' + hour + ':' + minu + ':' + sec

      return time
    }
  },
  mounted() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  padding: 20px;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
