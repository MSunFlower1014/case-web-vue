<template>
  <div class="topbar-menu-con"
    style="min-width:1280px;">
    <el-row>
      <!-- 平台logo -->
      <el-col :span="5">
        <div class="logo">
          <img class="img_responsive_hg"
            src="@/assets/images/logo.png">
        </div>
        <div class="name">
          优惠券平台
        </div>
      </el-col>
      <!-- 导航菜单 -->
      <el-col :span="17"
        style="min-width:823px;">
        <menubar-item :routes="menuTree"></menubar-item>
      </el-col>
      <!-- 帮助、用户信息 -->
      <el-col :span="1">
        <div class="help">
          <a href="javascript:void(0);">
            <i class="fa fa-question-circle fa-lg"></i>
          </a>
        </div>
      </el-col>
      <el-col :span="1">
        <el-dropdown class="avatar-container"
          trigger="click">
          <div class="avatar-wrapper">
            <img class="user-avatar"
              :src="userImg">
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu class="user-dropdown"
            slot="dropdown">
            <router-link class="inlineBlock"
              to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span @click="logout"
                style="display:block;">LogOut</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenubarItem from './MenubarItem'
import menuService from '@/modules/roles/service/menu-service'
import { constantRouter } from '@/router/router'
import userImg from '@/assets/images/user.jpg'
export default {
  components: {
    MenubarItem
  },
  data() {
    return {
      userImg,
      menuTree: []
    }
  },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    },
    constantRouter() {
      return constantRouter
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('system/login/logout').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handleSelect() {
      // TODO
    }
  },
  mounted() {
    menuService.getUserMenus().then(rspData => {
      console.log('menuTree' + rspData)
      this.menuTree = rspData
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import 'src/assets/styles/variables.scss';
.el-menu-item.is-active {
  background-color: $primary-color !important;
}

.topbar-menu-con {
  // display: block;
  // margin: 0 auto;
  // padding: 0px 25px;
  // clear: both;
  background: url('../../../../../src/assets/images/navigationBg.png') no-repeat
    center center;
  background-size: 100%;
  border-bottom: #7b7978 1px solid;
  height: 60px;
  width: 100%;
  min-width: 1280px;
  .logo {
    float: left;
    height: 40px;
    margin: 10px;
  }
  .name {
    float: left;
    color: #fff;
    font-size: 1.4rem;
    line-height: 60px;
  }
  /* 帮助信息 */
  .help {
    width: 30px;
    text-align: center;
    line-height: 60px;
    margin-right: 5px;
  }
  .help a {
    color: #fff;
  }
  .help a:hover {
    color: #64d1dd;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 10px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
