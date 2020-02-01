<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>操作名称</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['query.operName||like']"
            clearable
            placeholder="请输入操作名称"
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
        v-loading="loading"
        element-loading-text="拼命加载中"
        :header-cell-class-name="'table-head-th'">
        <!-- 数据列 -->
        <el-table-column prop="operName"
          show-overflow-tooltip
          label="操作名称">
        </el-table-column>
        <el-table-column prop="operUrl"
          show-overflow-tooltip
          label="操作URL">
        </el-table-column>
        <el-table-column prop="ip"
          show-overflow-tooltip
          label="IP">
        </el-table-column>
        <el-table-column show-overflow-tooltip
          label="操作者">
          <template slot-scope="scope">
            {{scope.row.createBy || '-'}}
          </template>
        </el-table-column>
        <el-table-column prop="operParam"
          show-overflow-tooltip
          label="操作参数">
        </el-table-column>
        <el-table-column prop="operResult"
          show-overflow-tooltip
          label="操作结果">
        </el-table-column>
        <el-table-column prop="createDate"
          show-overflow-tooltip
          label="创建时间">
        </el-table-column>
        <el-table-column prop="elapseTime"
          show-overflow-tooltip
          label="操作时长">
          <template slot-scope="scope">
            {{scope.row.elapseTime}} ms
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页信息 -->
      <div class="pagination-container">
        <el-pagination background
          layout="total, prev, pager, next, jumper"
          :total="pageData.total"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import operLogService from '../../service/logs-service.js'
const PAGE_SIZE = 10
export default {
  mounted() {
    this.handleQueryData()
  },
  data() {
    return {
      loading: false,
      pageSize: PAGE_SIZE,
      currentPage: 1,
      pageData: {
        results: []
      },
      queryParam: {
        'query.operName||like': '',
        'page.size': PAGE_SIZE,
        'page.pn': 1,
        'orderBy': 'createDate'
      }
    }
  },
  methods: {
    handleQueryData(pn = 1) {
      this.loading = true
      this.currentPage = pn
      this.queryParam['page.pn'] = pn
      operLogService
        .queryPageData(this.queryParam)
        .then(rspData => {
          this.pageData = rspData.data
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleCurrentChange(val) {
      this.handleQueryData(val)
    }
  }
}
</script>

