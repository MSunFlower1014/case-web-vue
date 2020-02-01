<template>
  <div class="menu-wrapper">
    <el-menu class="topbar-el-menu"
      :default-active="$route.path"
      mode="horizontal"
      background-color="#383737"
      text-color="#d3d3d3"
      active-text-color="#fff">
      <template v-for="item in routes"
       >

        <router-link v-if="!item.childMenus || item.childMenus.length===0"
          :to="'/'+item.url"
          :key="item.id">
          <el-menu-item :index="item.url"
            :class="{'submenu-title-noDropdown':!isNest}">
            <!-- <i :class="item.menuIcon"></i> -->
            <span style="margin-left: 5px;">{{item.name}}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-else
          :index="item.url"
          :key="item.id"
          popper-class="popper-class">
          <template slot="title">
            <!-- <i :class="item.menuIcon"></i> -->
            <span style="margin-left: 5px;">{{item.name}}</span>
          </template>

          <template v-for="child in item.childMenus"
          >
            <el-menu-item :is-nest="true"
              class="nest-menu"
              v-if="child.childMenus&&child.childMenus.length>0"
              :routes="[child]"
              :key="child.id"></el-menu-item>

            <router-link v-else
              :to="'/'+item.url+'/'+child.url"
              :key="child.id">
              <el-menu-item :index="'/'+item.url+'/'+child.url">
                <!-- <i :class="child.menuIcon"></i> -->
                <span style="margin-left: 5px;">{{child.name}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'MenubarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateTitle
  }
}
</script>

<style lang="scss">
.topbar-el-menu {
  span {
    text-align: center;
    line-height: 60px;
    font-size: 1.05rem;
  }
  .el-menu--horizontal .el-submenu-item:not(.is-disabled):hover {
    color: black !important;
  }
  .popper-class {
    background-color: #fff!important;
  }
}
</style>
