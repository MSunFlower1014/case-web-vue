<template>
  <div class="app-container calendar-list-container">
    <!-- 查询表单 -->
    <el-card class="box-card" shadow="never">
      <el-row :gutter="20" class="query_label_mgr">
        <el-col :span="4">
          <span>一级菜单名称</span>
        </el-col>
        <!-- <el-col :span="4">
          <span>菜单权限</span>
        </el-col>-->
      </el-row>
      <el-row :gutter="20" class="query_input_style">
        <el-col :span="4">
          <el-input
            :placeholder="'菜单名称'"
            @keyup.enter.native="handleQuery()"
            clearable
            v-model="queryParam['query.name||like']"
          ></el-input>
        </el-col>
        <!-- <el-col :span="4">
          <el-input @keyup.enter.native="handleQuery"
            :placeholder="'菜单权限'"
            clearable=""
            v-model="queryParam['query.permission||like']"></el-input>
        </el-col>-->
        <el-col :span="2">
          <el-button @click="handleQuery()" class="query-search-button" size="small" type="primary">
            <i class="fa fa-search"></i> 查询
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="handleAdd" class="query-search-button" size="small" type="primary">
            <i class="fa fa-plus"></i> 添加
          </el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 数据表格 -->
    <el-card class="box-card" shadow="never">
      <el-table
        :data="treePageData.results"
        :header-row-class-name="'table-head-th'"
        :load="handleExpandChange"
        element-loading-text="拼命加载中"
        fit
        highlight-current-row
        lazy
        row-key="id"
        v-loading="loading"
      >
        <el-table-column key="name" label="名称" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column key="url" label="链接" prop="url" show-overflow-tooltip></el-table-column>
        <el-table-column key="permission" label="权限" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.permission||'/'}}</template>
        </el-table-column>
        <el-table-column key="sort" label="排序" prop="sort" show-overflow-tooltip></el-table-column>
        <el-table-column key="isshow" label="是否显示" prop="isshow" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isshow == 1 ? 'success':'danger'"
            >{{isShowDicts[scope.row.isshow]}}</el-tag>
          </template>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button @click="handleAddChild(scope.row)" size="mini" title="添加下级" type="text">
                <i class="fa fa-indent fa-lg funcBtn"></i>
              </el-button>
              <el-button
                @click="handleMenuPermission(scope.row)"
                size="mini"
                title="功能权限"
                type="text"
              >
                <i class="fa fa-th-large fa-lg funcBtn"></i>
              </el-button>
              <el-button @click="handleEdit(scope.row)" size="mini" title="编辑" type="text">
                <i class="fa fa-pencil fa-lg funcBtn"></i>
              </el-button>
              <el-button @click="handleDelete(scope.row)" size="mini" title="删除" type="text">
                <i class="fa fa-trash-o fa-lg funcBtn"></i>
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页信息 -->
      <div class="pagination-container">
        <el-pagination
          :current-page.sync="currentPage"
          :total="treePageData.total"
          @current-change="handleCurrentChange"
          background
          layout="total, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      :before-close="handleDialogClose"
      :title="mode==='add'?'添加菜单':'编辑菜单'"
      :visible.sync="showDialog"
    >
      <menu-edit
        :mode="mode"
        :record="currentRecord"
        @after-edit="afterEdit"
        @close="handleDialogClose"
        ref="editForm"
      ></menu-edit>
    </el-dialog>

    <!-- 功能权限对话框 -->
    <el-dialog :visible.sync="showMenuPermissionDialog" style="width:100%;" title="菜单功能权限">
      <menu-permission :menuId="currentMenuId" ref="menuPermissionForm"></menu-permission>
    </el-dialog>
  </div>
</template>

<script>
import MenuEdit from './MenuEdit'
import MenuPermission from './MenuPermission'
import menuService from '../../service/menu-service'
// import dictService from '../../service/dict-service.js'

export default {
  components: {
    MenuEdit,
    MenuPermission
  },
  mounted() {
    this.handleQuery()
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      mode: 'edit',
      treePageData: {
        results: []
      },
      currentRecord: {},
      currentMenuId: undefined,
      showDialog: false,
      showMenuPermissionDialog: false,
      isShowDicts: ['隐藏', '显示'],
      isShowDict: [
        {
          isshow: 0,
          label: '隐藏'
        },
        {
          isshow: 1,
          label: '显示'
        }
      ],
      queryParam: {
        'query.name||like': '',
        // 'query.permission||like': '',
        'page.size': 10,
        'page.pn': 1
      }
    }
  },
  methods: {
    afterEdit() {
      this.showDialog = false
      this.handleQuery()
    },
    handleQuery(pn = 1) {
      this.loading = true
      this.currentPage = pn
      this.queryParam['page.pn'] = pn
      let self = this
      menuService
        .queryTreePage(this.queryParam)
        .then(rspData => {
          self.treePageData = rspData.data
          self.loading = false
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleExpandChange(row, treeNode, resolve) {
      menuService.queryTreeList({}, row.id).then(rspData => {
        resolve(rspData.data.results)
      })
    },
    handleAdd() {
      this.mode = 'add'
      this.showDialog = true
      this.currentRecord = {}
      // this.currentRecord.isshow = 1
    },
    handleAddChild(record) {
      this.mode = 'add'
      this.showDialog = true
      this.currentRecord = { parentId: record.id }
    },
    handleEdit(record) {
      this.mode = 'edit'
      this.showDialog = true
      this.currentRecord = Object.assign({}, record, { parent: null })
    },
    handleDelete(record) {
      const self = this
      this.$confirm('确定删除吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          menuService.deleteDataById(record.id).then(rspData => {
            self.$message({
              showClose: true,
              type: 'success',
              message: '删除成功!'
            })
            self.handleQuery()
          })
        })
        .catch(e => { })
    },
    handleMenuPermission(record) {
      this.currentMenuId = record.id
      this.showMenuPermissionDialog = true
    },
    handleCurrentChange(val) {
      this.handleQuery(val)
    },
    handleDialogClose(done) {
      this.showDialog = false
      this.$refs.editForm.resetFields()
      done()
    }
  }
}
</script>

