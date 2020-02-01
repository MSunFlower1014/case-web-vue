<template>
  <div class="app-container">
    <el-row class="query_label_mgr"
      :gutter="20">
      <el-col :span="4">
        <span>手机号码</span>
      </el-col>
      <el-col :span="8">
        <span>开始时间-结束时间</span>
      </el-col>
    </el-row>
    <el-row :gutter="20"
      class="query_input_style">
      <el-col :span="4">
        <el-input v-model="queryParam['tel']"
          clearable
          placeholder="请输入手机号"
          @keyup.enter.native="handleQueryData()"
          size="small"></el-input>
      </el-col>
      <el-col :span="8">
        <el-date-picker v-model="dateRange"
          @change="handleTimeChange"
          size="small"
          style="width:100%;"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button type="primary"
          @click="handleQueryData()"
          size="small"
          class="query-search-button">
          <i class="fa fa-search"></i> 搜索</el-button>
      </el-col>
    </el-row>
    <div class="line"></div>
    <el-row>
      <el-button type="primary"
        @click="handleDownload"
        size="medium"
        :loading="btnLoading"
        class="query_search-button mgrb_20">
        <i class="fa fa-cloud-download"></i> 导出</el-button>
    </el-row>
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
      <el-table-column v-for="item in tableColumn"
        show-overflow-tooltip
        :key="item.key"
        :prop="item.key"
        :label="item.name"
        :formatter="item.formatter">
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
  </div>
</template>
<script>
const PAGE_SIZE = 10
import couponAnalyService from '../../service/coupon-analysis-service.js'
import { downloadFile } from '@/utils/index'
export default {
  props: {
    tableColumn: {
      type: Array
    },
    searchType: {
      type: String
    },
    couponId: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      btnLoading: false,
      currentPage: 1,
      pageSize: PAGE_SIZE,
      pageData: {
        results: []
      },
      dateRange: [],
      queryParam: {
        couponId: '',
        endDate: '',
        pageNum: 1,
        pageSize: PAGE_SIZE,
        startDate: '',
        tel: ''
      }
    }
  },
  methods: {
    handleTimeChange(val) {
      this.queryParam.startDate = val[0]
      this.queryParam.endDate = val[1]
    },
    handleQueryData(pn = 1) {
      this.currentPage = pn
      this.queryParam['pageNum'] = pn
      this.searchType === 'dole'
        ? this.handleQueryDole()
        : this.handleQueryUse()
    },
    handleCurrentChange(val) {
      this.handleQueryData(val)
    },
    handleQueryDole() {
      this.loading = true
      let self = this
      couponAnalyService
        .queryDoleList(this.queryParam)
        .then(rsp => {
          self.pageData = rsp.data
          self.loading = false
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleQueryUse() {
      this.loading = true
      let self = this
      couponAnalyService
        .queryUseList(this.queryParam)
        .then(rsp => {
          self.pageData = rsp.data
          self.loading = false
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleDownload() {
      this.searchType === 'dole'
        ? this.handleDownloadDole()
        : this.handleDownloadUse()
    },
    handleDownloadDole() {
      if (!this.pageData.results.length) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '当前没有可导出的记录！'
        })
      } else {
        this.btnLoading = true
        let self = this
        couponAnalyService
          .exportDoleAnalysisData(this.queryParam)
          .then(rspData => {
            downloadFile(rspData, 'couponDole', 'xls')
            self.btnLoading = false
            self.$message({
              showClose: true,
              type: 'success',
              message: '下载成功!'
            })
          })
          .catch(e => {
            self.btnLoading = false
          })
      }
    },
    handleDownloadUse() {
      if (!this.pageData.results.length) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '当前没有可导出的记录！'
        })
      } else {
        this.btnLoading = true
        let self = this
        couponAnalyService
          .exportUseCouponRecord(this.queryParam)
          .then(rspData => {
            downloadFile(rspData, 'couponUse', 'xls')
            self.btnLoading = false
            self.$message({
              showClose: true,
              type: 'success',
              message: '下载成功!'
            })
          })
          .catch(e => {
            self.btnLoading = false
          })
      }
    }
  },
  mounted() {
    this.queryParam.couponId = this.couponId
    this.handleQueryData()
  }
}
</script>
<style lang="scss" scoped>
</style>
