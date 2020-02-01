<template>
  <el-menu class="navbar"
    mode="horizontal">
    <div style="float:left">
      <i class="fa fa-navicon"></i>
    </div>
    <breadcrumb style="display:inline-block;"></breadcrumb>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    Breadcrumb
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('system/login/logout').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  background-color: #fff;
  border-bottom: #eaeaea 1px solid;
  padding: 0 2%;
  display: block;
  height: 40px;
  line-height: 40px;
  border-radius: 0px !important;
  color: #2D8CF0 !important;
}
</style>

