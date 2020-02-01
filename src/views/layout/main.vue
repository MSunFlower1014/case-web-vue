<template>
  <div class="main app-wrapper"
    :class="classObj">
    <!-- <div v-if="device==='mobile'&&sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"></div> -->
    <topbar></topbar>
    <el-row>
      <el-col>
        <navbar></navbar>
      </el-col>
    </el-row>
    <section class="single-page-con">
      <app-main>
      </app-main>
    </section>
  </div>
</template>

<script>
import { Topbar, AppMain, Navbar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import menuService from '@/modules/roles/service/menu-service'

export default {
  name: 'Main',
  components: {
    Topbar,
    Navbar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  },
  async created() {
    menuService.getUserMenus().then(rspData => {
      this.menuTree = rspData
    })
  },
  mounted() {
    // menuService.getUserMenus().then(rspData => {
    //   this.menuTree = rspData.data
    // })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/assets/styles/mixin.scss';
.single-page-con {
  top: 100px;
  right: 0;
  bottom: 0;
  // overflow: auto;
  transition: left 0.3s;
  .single-page {
    margin: 10px;
  }
}

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  // background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
