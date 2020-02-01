<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>缓存Key</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['query.cacheKey||like']"
            clearable
            placeholder="请输入缓存key"
            @keyup.enter.native="handleQueryData()"
            size="small"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
            @click="handleQueryData()"
            size="small"
            class="query-search-button">
            <i class="fa fa-search"></i> 搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 数据表格 -->
    <el-card class="box-card">
      <el-button type="primary"
        class="mgrb_20"
        size="medium"
        @click="handleAddDict">
        <i class="fa el-icon-plus"></i> 新增参数</el-button>
      <!-- 数据表格 -->
      <el-table row-key="id"
        fit
        stripe
        highlight-current-row
        :data="pageData.results"
        :header-cell-class-name="'table-head-th'">
        <!-- 数据列 -->
        <el-table-column prop="cacheKey"
          show-overflow-tooltip
          label="缓存Key">
        </el-table-column>
        <el-table-column prop="cacheFormat"
          show-overflow-tooltip
          label="数据结构">
        </el-table-column>
        <el-table-column prop="cacheStatus"
          show-overflow-tooltip
          label="状态"
          :formatter="statusFormatter">
        </el-table-column>
        <el-table-column prop="createDate"
          show-overflow-tooltip
          label="创建时间">
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button title="编辑"
                type="text"
                @click="handleEditDict(scope.row)">
                <i class="fa fa-edit fa-lg funcBtn"></i>
              </el-button>
              <el-button title="删除"
                type="text"
                @click="handleDeleteDict(scope.row)">
                <i class="fa fa-trash-o fa-lg funcBtn"></i>
              </el-button>
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
          :total="pageData.total"
          :page-size="pageSize">
        </el-pagination>
      </div>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog :title="dialogTitle"
      :visible.sync="showDialog"
      :before-close="handleDialogClose"
      width="880px">
      <!-- 新增/编辑Form -->
      <cache-edit :mode="mode"
        ref="editForm"
        :record="currentRecord"
        @after-edit="afterEditDict">
      </cache-edit>
      <template slot="footer">
        <el-button size="mini"
          @click="handleReturn">取消</el-button>
        <el-button size="mini"
          type="primary"
          @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import cacheManageService from '../../service/cache-manage-service.js'
import CacheEdit from './CacheEdit.vue'
const PAGE_SIZE = 10
export default {
  components: {
    CacheEdit
  },
  mounted() {
    this.handleQueryData()
  },
  data() {
    return {
      currentPage: 1,
      pageSize: PAGE_SIZE,
      pageData: {
        results: []
      },
      mode: 'edit', // or add
      dialogTitle: '',
      currentRecord: {},
      showDialog: false,
      queryParam: {
        'query.cacheKey||like': '',
        'page.size': PAGE_SIZE,
        'page.pn': 1
      }
    }
  },
  methods: {
    // 1 === 已启用？
    statusFormatter(row, columns, cellValue) {
      return cellValue === 1 ? '已启用' : '已停用'
    },
    afterEditDict(params) {
      this.showDialog = false
      this.handleQueryData()
    },
    handleQueryData(pn = 1) {
      this.currentPage = pn
      this.queryParam['page.pn'] = pn
      cacheManageService.queryPageData(this.queryParam).then(rspData => {
        this.pageData = rspData.data
      })
    },
    handleAddDict() {
      this.mode = 'add'
      this.dialogTitle = '新增参数信息'
      this.showDialog = true
      this.currentRecord = {}
    },
    handleEditDict(record) {
      this.mode = 'edit'
      this.dialogTitle = '编辑参数信息'
      this.showDialog = true
      this.currentRecord = Object.assign({}, record)
    },
    handleDeleteDict(record) {
      let self = this
      this.$confirm('确定删除吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          cacheManageService.deleteDataById(record.id).then(rspData => {
            self.$message({
              showClose: true,
              type: 'success',
              message: '删除成功!'
            })
            self.handleQueryData()
          })
        })
        .catch(e => {})
    },
    handleCurrentChange(val) {
      this.handleQueryData(val)
    },
    handleDialogClose(done) {
      done()
    },
    handleReturn() {
      this.$refs['editForm'].handleReturn()
    },
    handleSubmit() {
      this.$refs['editForm'].handleSubmit()
    }
  }
}
</script>

