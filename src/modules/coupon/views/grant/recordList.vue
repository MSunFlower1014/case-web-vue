<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4"
          v-if="active==='0'">
          <span>发放时间</span>
        </el-col>
        <el-col :span="4"
          v-if="active==='1'">
          <span>手机号码</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-date-picker v-model="queryParam_b['sendDate']"
            v-if="active==='0'"
            style="width:100%;"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime">
          </el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-input v-model="queryParam_p['tel']"
            v-if="active==='1'"
            placeholder="请输入手机号码"
            clearable
            @keyup.enter.native="handleQueryData"
            size="small">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
            @click="handleQueryData"
            size="small"
            class="query-search-button">
            <i class="fa fa-search"></i> 搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 数据tab -->
    <el-tabs type="card"
      class="selfTabs"
      @tab-click="handleTabClick">
      <el-tab-pane label="批量发放">
        <!-- 数据表格 -->
        <el-table row-key="id"
          stripe
          fit
          border
          highlight-current-row
          :data="pageData_b.results"
          v-loading="batchLoading"
          element-loading-text="拼命加载中"
          :header-cell-class-name="'table-head-th'">
          <!-- 数据列 -->
          <el-table-column prop="createDate"
            show-overflow-tooltip
            label="发放时间">
          </el-table-column>
          <el-table-column prop="sendNum"
            show-overflow-tooltip
            label="发放量">
          </el-table-column>
          <el-table-column prop="doleNum"
            show-overflow-tooltip
            label="领取量">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button title="终止发放"
                type="text"
                v-if="couponStatus!==0 && scope.row.status === 1"
                @click="handleChangeBatchStatus(scope.row)">
                <i class="fa fa-stop-circle-o fa-lg funcBtn"></i>
              </el-button>
              <el-button title="刷新缓存"
                type="text"
                v-if="couponStatus!==0 && scope.row.status === 1"
                @click="handleRefreshCache(scope.row)">
                <i class="fa fa-refresh fa-lg funcBtn"></i>
              </el-button>
              <el-button title="开始发放"
                type="text"
                v-if="couponStatus!==0 && scope.row.status === 0"
                @click="handleChangeBatchStatus(scope.row)">
                <i class="fa fa-play-circle-o fa-lg funcBtn"></i>
              </el-button>
            </template>
          </el-table-column>
          <!-- 操作列 -->
        </el-table>
        <!-- 分页信息 -->
        <div class="pagination-container">
          <el-pagination background
            layout="total, prev, pager, next, jumper"
            :total="pageData_b.total"
            :current-page.sync="currentPage_B"
            @current-change="handleCurrentChange_B"
            :page-size="pageSize">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="个人发放"
        lazy>
        <!-- 数据表格 -->
        <el-table row-key="id"
          stripe
          fit
          border
          highlight-current-row
          :data="pageData_p.results"
          v-loading="singleLoading"
          element-loading-text="拼命加载中"
          :header-cell-class-name="'table-head-th'">
          <!-- 数据列 -->
          <el-table-column prop="tel"
            show-overflow-tooltip
            label="用户手机号">
          </el-table-column>
          <el-table-column prop="createDate"
            show-overflow-tooltip
            label="发放时间">
          </el-table-column>
          <el-table-column prop="couponCode"
            show-overflow-tooltip
            label="券码">
          </el-table-column>
          <el-table-column prop="status"
            show-overflow-tooltip
            :formatter="statusFormatter"
            label="优惠券状态">
          </el-table-column>
          <!-- 操作列 -->
        </el-table>
        <!-- 分页信息 -->
        <div class="pagination-container">
          <el-pagination background
            layout="total, prev, pager, next, jumper"
            :total="pageData_p.total"
            :current-page.sync="currentPage_P"
            @current-change="handleCurrentChange_P"
            :page-size="pageSize">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
const PAGE_SIZE = 10
import sendRuleService from '../../service/send-rule-service.js'
export default {
  data() {
    return {
      batchLoading: false,
      singleLoading: false,
      currentPage_B: 1,
      currentPage_P: 1,
      couponId: '', // 优惠券id
      active: '0', // 当前tab页
      couponStatus: null,
      pageSize: PAGE_SIZE,
      pageData_b: {
        results: []
      },
      pageData_p: {
        results: []
      },
      statuses: [
        {
          value: 1,
          label: '启用'
        },
        {
          value: 0,
          label: '停用'
        }
      ],
      queryParam_b: {
        couponId: '',
        sendDate: null,
        pageNum: 1,
        pageSize: PAGE_SIZE
      },
      queryParam_p: {
        couponId: '',
        tel: '',
        pageNum: 1,
        pageSize: PAGE_SIZE
      }
    }
  },
  methods: {
    // 1 === 未使用？
    statusFormatter(row, columns, cellValue) {
      let statusDesc = ''
      switch (cellValue) {
        case 0:
          statusDesc = '未发放'
          break
        case 1:
          statusDesc = '待激活'
          break
        case 2:
          statusDesc = '待使用'
          break
        case 3:
          statusDesc = '待核销'
          break
        case 4:
          statusDesc = '已使用'
          break
        case 5:
          statusDesc = '已过期'
          break
      }
      return statusDesc
    },
    handleTabClick(tab, event) {
      this.active = tab.index
    },
    handleCurrentChange_B(val) {
      this.handleQueryData_B(val)
    },
    handleCurrentChange_P(val) {
      this.handleQueryData_P(val)
    },
    handleQueryData() {
      this.active === '0' ? this.handleQueryData_B() : this.handleQueryData_P()
    },
    handleQueryData_B(pn = 1) {
      this.batchLoading = true
      this.currentPage_B = pn
      this.queryParam_b['pageNum'] = pn
      sendRuleService
        .queryBatchRecord(this.queryParam_b)
        .then(rsp => {
          this.batchLoading = false
          this.pageData_b = rsp.data
        })
        .catch(e => {
          this.batchLoading = false
        })
    },
    handleQueryData_P(pn = 1) {
      this.singleLoading = true
      this.currentPage_P = pn
      this.queryParam_p['pageNum'] = pn
      sendRuleService
        .querySingleRecord(this.queryParam_p)
        .then(rsp => {
          this.singleLoading = false
          this.pageData_p = rsp.data
        })
        .catch(e => {
          this.singleLoading = false
        })
    },
    handleChangeBatchStatus(record) {
      let self = this
      let confirmText =
        record.status === 1 ? '确定要停止发放吗？' : '确定要开始发放吗？'
      let message = record.status === 1 ? '已经停止发放' : '已经开始发放'
      let params = {
        couponId: record.couponId,
        id: record.id,
        status: record.status,
        sendId: record.sendId,
        createDate: record.createDate
      }
      this.$confirm(confirmText, '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          sendRuleService
            .changeBatchStatus(JSON.stringify(params))
            .then(rspData => {
              self.$message({
                showClose: true,
                type: 'success',
                message: message
              })
              self.handleQueryData_B()
            })
        })
        .catch(e => {})
    },
    handleRefreshCache(record) {
      let self = this
      this.$confirm('确定要刷新缓存吗？', '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          sendRuleService.refreshCacheById(record.id).then(rspData => {
            self.$message({
              showClose: true,
              type: 'success',
              message: '刷新缓存成功!'
            })
            self.handleQueryData_P()
          })
        })
        .catch(e => {})
    }
  },
  created() {},
  mounted() {
    this.couponId = this.$route.query.id
    this.couponStatus = this.$route.query.status
    this.queryParam_b.couponId = this.couponId
    this.queryParam_p.couponId = this.couponId
    this.handleQueryData_B()
    this.handleQueryData_P()
  }
}
</script>
<style lang="scss" scoped>
</style>
