<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>缓存key</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['query.logKey||like']"
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
      <!-- 数据表格 -->
      <el-table row-key="id"
        fit
        stripe
        highlight-current-row
        :data="pageData.results"
        :header-cell-class-name="'table-head-th'">
        <!-- 数据列 -->
        <el-table-column prop="logKey"
          show-overflow-tooltip
          label="缓存Key">
        </el-table-column>
        <el-table-column prop="logValue"
          show-overflow-tooltip
          label="缓存Value">
        </el-table-column>
        <el-table-column prop="status"
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
            <el-button title="删除"
              type="text"
              @click="handleDeleteCache(scope.row)">
              <i class="fa fa-trash-o fa-lg funcBtn"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页信息 -->
      <div class="pagination-container">
        <el-pagination background
          layout="total, prev, pager, next, jumper"
          :total="pageData.total"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
          :page-size="pageSize">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import cacheLogService from '../../service/cache-log-service.js'
const PAGE_SIZE = 10
export default {
  mounted() {
    this.handleQueryData()
  },
  data() {
    return {
      pageSize: PAGE_SIZE,
      pageData: {
        results: []
      },
      currentPage: 1,
      queryParam: {
        'query.logKey||like': '',
        'page.size': 10,
        'page.pn': 1
      }
    }
  },
  methods: {
    // 1 === 已启用？
    statusFormatter(row, columns, cellValue) {
      return cellValue === 1 ? '已启用' : '已停用'
    },
    handleQueryData(pn = 1) {
      this.currentPage = pn
      this.queryParam['page.pn'] = pn
      cacheLogService.queryPageData(this.queryParam).then(rspData => {
        this.pageData = rspData.data
      })
    },
    handleCurrentChange(val) {
      this.handleQueryData(val)
    },
    handleDeleteCache(record) {
      let self = this
      this.$confirm('确定删除吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          cacheLogService.deleteDataById(record.id).then(rspData => {
            self.$message({
              showClose: true,
              type: 'success',
              message: '删除成功!'
            })
            self.handleQueryData()
          })
        })
        .catch(e => {})
    }
  }
}
</script>

