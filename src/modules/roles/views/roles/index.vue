<template>
  <div class="app-container calendar-list-container">

    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>角色名称</span>
        </el-col>
        <el-col :span="4">
          <span>角色编码</span>
        </el-col>

      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['query.name||like']"
            clearable
            placeholder="请输入角色名称"
            @keyup.enter.native="handleQuery()"
            size="small"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="queryParam['query.code||like']"
            clearable
            placeholder="请输入角色编码"
            @keyup.enter.native="handleQuery()"
            size="small"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
            @click="handleQuery()"
            size="small"
            class="query-search-button">
            <i class="fa fa-search"></i> 搜索</el-button>
        </el-col>
        <!-- <el-col :span="2">
          <el-button type="primary"
            @click="handleAdd"
            size="small"
            class="query-search-button">
            <i class="fa fa-plus"></i> 添加</el-button>
        </el-col> -->
      </el-row>
    </el-card>

    <!-- 数据表格 -->
    <el-card class="box-card"
      shadow="never">
      <el-table row-key="id"
        fit
        stripe
        highlight-current-row
        :header-row-class-name="'table-head-th'"
        :data="pageData.results"
        v-loading="loading"
        element-loading-text="拼命加载中">
        <!-- 数据列 -->
        <el-table-column key="name"
          prop="name"
          show-overflow-tooltip
          label="名称">
        </el-table-column>
        <el-table-column key="code"
          prop="code"
          show-overflow-tooltip
          label="编码">
        </el-table-column>
        <el-table-column key="isSys"
          width="120"
          prop="isSys"
          show-overflow-tooltip
          label="是否系统数据">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isSys == 1 ? 'success':'danger'">{{scope.row.isSys == 1 ? '是':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column key="usable"
          width="100"
          prop="usable"
          show-overflow-tooltip
          label="是否可用">
          <template slot-scope="scope">
            <el-tag :type="scope.row.usable == 1 ? 'success':'danger'">{{scope.row.usable == 1 ? '是':'否'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column key="remarks"
          prop="remarks"
          show-overflow-tooltip
          label="备注">
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <!--<el-button title="功能权限授权"-->
                <!--type="text"-->
                <!--@click="handleRolePermission(scope.row)">-->
                <!--<i class="fa fa-key fa-lg funcBtn"></i>-->
              <!--</el-button>-->
              <el-button title="编辑"
                type="text"
                @click="handleEdit(scope.row)">
                <i class="fa fa-pencil fa-lg funcBtn"></i>
              </el-button>
              <!-- <el-button title="删除"
                type="text"
                @click="handleDelete(scope.row)">
                <i class="fa fa-trash-o fa-lg funcBtn"></i>
              </el-button> -->
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页信息 -->
      <div class="pagination-container">
        <el-pagination background
          layout="total, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :total="pageData.total">
        </el-pagination>
      </div>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog :title="mode==='add'?'添加角色':'编辑角色'"
      width="60%"
      :visible.sync="showDialog"
      :before-close="handleDialogClose">
      <role-edit :mode="mode"
        ref="editForm"
        :record="currentRecord"
        :auth-menus="authMenus"
        @after-edit="afterEdit">
      </role-edit>
    </el-dialog>

    <!-- 角色授权Dialog -->
    <el-dialog :title="'角色授权'"
      width="70%"
      :visible.sync="showRolePermissionDialog">
      <role-permission :role-id="currentRoldId"
        append-to-body>
      </role-permission>
    </el-dialog>
  </div>
</template>

<script>
import roleService from '../../service/role-service.js'
import RoleEdit from './RoleEdit'
import RolePermission from './RolePermission'
export default {
  components: {
    RoleEdit,
    RolePermission
  },
  mounted() {
    this.handleQuery()
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      pageData: {},
      mode: 'edit',
      currentRecord: {},
      currentRoldId: '',
      showDialog: false,
      showRolePermissionDialog: false,
      authMenus: [],
      queryParam: {
        'query.name||like': '',
        'query.code||eq': '',
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
      let self = this
      this.currentPage = pn
      this.queryParam['page.pn'] = pn
      roleService
        .queryPageData(this.queryParam)
        .then(rspData => {
          self.pageData = rspData.data
          self.loading = false
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleAdd() {
      this.mode = 'add'
      this.showDialog = true
      this.currentRecord = {}
      roleService.getAuthMenu(null).then(rspData => {
        this.authMenus = rspData.data.results
      })
    },
    handleEdit(record) {
      roleService.getAuthMenu(record.id).then(rspData => {
        this.authMenus = rspData.data.results
        this.mode = 'edit'
        this.currentRecord = Object.assign({}, record)
        this.showDialog = true
      })
    },
    handleDelete(record) {
      const self = this
      this.$confirm('确定删除吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          roleService.deleteDataById(record.id).then(rspData => {
            self.$message({
              showClose: true,
              type: 'success',
              message: '删除成功!'
            })
            self.handleQuery()
          })
        })
        .catch(e => {})
    },
    handleRolePermission(record) {
      this.currentRoldId = record.id
      this.showRolePermissionDialog = true
    },
    handleCurrentChange(val) {
      this.handleQuery(val)
    },
    handleDialogClose(done) {
      this.$refs.editForm.resetFields()
      done()
    }
  }
}
</script>

