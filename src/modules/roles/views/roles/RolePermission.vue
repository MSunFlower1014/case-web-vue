

<template>
  <div>
    <el-row :gutter="20"
      class="pdb_20">
      <el-col :span="6">
        <div slot="header"
          class="clearfix">
          <span>菜单</span>
        </div>
        <el-tree :data="menuTreeData"
          highlight-current
          node-key="id"
          :props="{label: 'label', children: 'children'}"
          @node-click="handleMenuClick"></el-tree>
      </el-col>
      <el-col :span="18">
        <el-transfer v-model="selectedPerms"
          @change="handlePermsChange"
          :titles="['未授权', '已授权']"
          :button-texts="['撤销', '授权']"
          :render-content="renderFunc"
          :data="menuPerms"></el-transfer>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import menuService from '../../service/menu-service'
import rolePermissionService from '../../service/role-permission-service'
export default {
  props: {
    roleId: {
      type: String
    }
  },
  data() {
    return {
      showDialog: false,
      menuTreeData: [],
      menuPerms: [],
      selectedPerms: [],
      menuPermIdTorolePermId: {},
      currentMenuId: '',
      renderFunc(h, option) {
        return (
          <el-tooltip content={option.label} effect='light'>
            <span>{option.label}</span>
          </el-tooltip>
        )
      }
    }
  },
  methods: {
    getRolePermissionTransferData() {
      // 获取角色对应的菜单权限
      rolePermissionService
        .getRolePermissionTransferData(this.currentMenuId, this.roleId)
        .then(result => {
          this.menuPerms = result.data
          this.selectedPerms = result.selected
          this.menuPermIdTorolePermId = result.menuPermIdTorolePermId
        })
    },
    handleMenuClick(menu) {
      this.currentMenuId = menu.id
      this.getRolePermissionTransferData()
    },
    handlePermsChange(rightCurrentKeys, direction, moveKeys) {
      if (direction === 'left') {
        // 撤销
        const rolePermIds = moveKeys.map(item => {
          return this.menuPermIdTorolePermId[item]
        })
        rolePermissionService.batchDelete(rolePermIds)
        this.$message.success('撤销成功')
        this.getRolePermissionTransferData()
      } else if (direction === 'right') {
        // 授权
        const rolePerms = []
        for (const key of moveKeys) {
          rolePerms.push({
            roleId: this.roleId,
            menuId: this.currentMenuId,
            menuPermissionId: key
          })
        }
        rolePermissionService.batchInsert(rolePerms).then(rspData => {
          this.$message.success('授权成功')
          this.getRolePermissionTransferData()
        })
      } else {
        // console
      }
    }
  },
  mounted() {
    // 获取菜单树
    menuService
      .bootstrapNavTreeData({
        queryParam: {},
        nodeId: '',
        async: false,
        sort: 'name'
      })
      .then(rspData => {
        this.menuTreeData = rspData.data
      })
  }
}
</script>

