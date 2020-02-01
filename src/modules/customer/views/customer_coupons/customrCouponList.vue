<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row :gutter="20"
        class="query_label_mgr">
        <el-col :span="4">
          <span>用户号码</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input placeholder="请输入用户号码"
            clearable
            v-model="queryParam['tel']"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button class="query-search-button"
            type="primary"
            size="small"
            @click="handleQueryReceivedCoupons()">
            <i class="fa fa-search"></i>搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 列表数据 -->
    <el-card class="box-card">
      <el-table :header-cell-class-name="'table-head-th'"
        highlight-current-row
        stripe
        fit
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="couponResults">
        <el-table-column label="用户号码"
          show-overflow-tooltip
          prop="tel">
        </el-table-column>
        <el-table-column label="总数量"
          show-overflow-tooltip
          prop="telCount">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="text"
                title="详情"
                @click="handleShowDetail(scope.row)">
                <i class="fa fa-file-text-o fa-lg funcBtn"></i>
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background
          layout="total, prev, pager, next, jumper"
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
          :total="totalPage">
        </el-pagination>
      </div>
    </el-card>
    <!-- </div> -->
  </div>
</template>

<script>
import historyService from '../../service/history-service.js'

export default {
  name: 'customrCouponList',

  mounted() {
    this.handleQueryReceivedCoupons()
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalPage: 0,
      couponResults: [],
      queryParam: {
        pageNum: 1,
        pageSize: 10,
        tel: ''
      }
    }
  },
  methods: {
    handleQueryReceivedCoupons(pn = 1) {
      this.loading = true
      this.currentPage = pn
      this.queryParam['pageNum'] = pn
      let param = this.queryParam
      let self = this
      historyService
        .getUserReceivedCoupons(param)
        .then(rspData => {
          self.totalPage = rspData.data.total
          self.couponResults = rspData.data.results
          self.loading = false
          // self.handleReset()
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleReset() {
      this.queryParam.tel = ''
    },
    handleShowDetail(record) {
      // 添加新菜单逻辑
      this.$router.push({
        path: '/customer/customer_coupons/costomer_coupon_detail',
        query: {
          tel: record.tel
        }
      })
    },
    handleCurrentChange(val) {
      this.handleQueryReceivedCoupons(val)
    }
  }
}
</script>

<style>
</style>
