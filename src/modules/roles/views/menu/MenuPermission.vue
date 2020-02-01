<template>
  <div>
    <el-card class="box-card dialog-scale"
      shadow="never">
      <!-- 查询表单 -->
      <el-form :inline="true"
        :rules="formRules"
        ref="editForm"
        :model="formData">
        <el-form-item prop="code">
          <el-input :placeholder="'功能编码...'"
            style="width: 120px"
            v-model="formData.code">
          </el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input :placeholder="'功能名称...'"
            style="width: 120px"
            v-model="formData.name">
          </el-input>
        </el-form-item>
        <el-form-item prop="permission">
          <el-input :placeholder="'功能权限...'"
            style="width: 120px"
            v-model="formData.permission">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            @click="handleSubmit"
            size="mini">
            <i class="fa fa-save"></i> 保存</el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <el-table row-key="id"
        fit
        border
        highlight-current-row
        :header-row-class-name="'table-head-th'"
        :data="pageData.results">
        <!-- 数据列 -->
        <el-table-column key="code"
          prop="code"
          label="编码">
        </el-table-column>
        <el-table-column key="name"
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column key="permission"
          prop="permission"
          label="权限">
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column width="120px"
          label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini"
                title="编辑"
                style="width:40px;"
                type="text"
                @click="handleEdit(scope.row)">
                <i class="fa fa-pencil fa-lg funcBtn"></i>
              </el-button>
              <el-button size="mini"
                title="删除"
                style="width:40px;"
                type="text"
                @click="handleDelete(scope.row)">
                <i class="fa fa-trash-o fa-lg funcBtn"></i>
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页信息 -->
      <div class="pagination-container">
        <el-pagination background
          layout="total, prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :total="pageData.total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import menuPermissionService from '../../service/menu-permission-service'
export default {
  name: 'MenuPermission',
  props: {
    menuId: {
      type: String
    }
  },
  data() {
    return {
      pageData: {},
      currentPage: 1,
      queryParam: {
        'query.menuId||eq': this.menuId,
        'page.size': 10,
        'page.pn': 1
      },
      formData: {
        menuId: this.menuId,
        code: '',
        name: '',
        permission: ''
      },
      formRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        permission: [{ required: true, message: '请输入权限', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.handleQuery()
  },
  watch: {
    menuId: function(newMenuId) {
      this.$refs['editForm'].resetFields()
      this.formData.menuId = newMenuId
      this.queryParam['query.menuId||eq'] = newMenuId
      this.handleQuery()
    }
  },
  methods: {
    afterSubmit() {
      this.formData = { menuId: this.menuId }
      this.handleQuery()
    },
    handleQuery(pn = 1) {
      this.currentPage = pn
      this.queryParam['page.pn'] = pn
      menuPermissionService.queryPageData(this.queryParam).then(rspData => {
        this.pageData = rspData.data
      })
    },
    handleEdit(record) {
      this.formData = record
    },
    handleSubmit() {
      this.$refs['editForm'].validate(valid => {
        if (valid) {
          if (!this.formData.id) {
            menuPermissionService.addData(this.formData).then(() => {
              this.afterSubmit()
            })
          } else {
            menuPermissionService.updateDataById(this.formData).then(() => {
              this.afterSubmit()
            })
          }
        } else {
          return false
        }
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
          menuPermissionService.deleteDataById(record.id).then(rspData => {
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
    handleCurrentChange(val) {
      this.handleQuery(val)
    },
    resetFields() {
      this.$refs['editForm'].resetFields()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dialog-scale {
  // .el-dialog .el-dialog__body {
  //   width: 90%;
  // }
}
</style>

