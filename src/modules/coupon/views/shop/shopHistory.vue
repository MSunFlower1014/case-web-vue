
<template>
  <div class="app-container">
    <!-- <router-view></router-view> -->
    <!-- 查询表单 -->
    <div>
      <el-card class="box-card">
        <el-row :gutter="20"
          class="query_label_mgr">
          <el-col :span="4">
            <span>铺货开始时间</span>
          </el-col>
        </el-row>
        <el-row :gutter="20"
          class="query_input_style">
          <el-col :span="4">
            <el-date-picker type="datetime"
              style="width:100%; height:100%;"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="queryParam['startTime']"
              placeholder="选择开始日期时间">
            </el-date-picker>
          </el-col>
          <el-col :span="4">
            <el-button class="query-search-button"
              type="primary"
              size="small"
              @click="handleQueryCoupon()">
              <i class="fa fa-search"></i>搜索</el-button>
          </el-col>
        </el-row>

      </el-card>
      <el-card class="box-card">
        <div v-if="parseInt(status) > 0">
          <el-button type="primary"
            class="mgrb_20"
            size="medium"
            @click="handleAddCoupon">
            <i class="fa fa-plus"></i>新增优惠券铺货</el-button>
        </div>
        <el-table :header-cell-class-name="'table-head-th'"
          highlight-current-row
          fit
          stripe
          v-loading="loading"
          element-loading-text="拼命加载中"
          :data="couponResults">
          <el-table-column label="分公司/渠道商/店铺"
            show-overflow-tooltip
            prop="orgName">
          </el-table-column>
          <el-table-column label="铺货时间"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.createTime || '-'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="铺货量"
            show-overflow-tooltip
            prop="num">
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
    </div>
  </div>
</template>

<script>
import couponDistributionService from '../../service/coupon-distribution-service.js'

export default {
  name: 'shopHistory',
  props: {
    msg: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalPage: 0,
      status: '',
      oddNum: '',

      queryParam: {
        couponId: '',
        startTime: null,
        pageNum: 1,
        pageSize: 10
      },
      couponResults: []
    }
  },
  mounted() {
    this.queryParam.couponId = this.$route.query.couponId
    this.status = this.$route.query.status
    this.oddNum = this.$route.query.oddNum
    this.handleQueryCoupon()
  },
  methods: {
    handleQueryCoupon(pn = 1) {
      this.currentPage = pn
      this.queryParam['pageNum'] = pn
      let param = this.queryParam
      let self = this
      this.loading = true
      couponDistributionService
        .getCouponHistory(param)
        .then(rspData => {
          self.loading = false
          self.totalPage = rspData.data.total
          self.couponResults = rspData.data.results
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleCurrentChange(val) {
      this.handleQueryCoupon(val)
    },
    handleAddCoupon() {
      // 添加新菜单逻辑
      this.$router.push({
        path: '/coupon/coupon_shop/shop_history/shop_add',
        query: {
          oddNum: this.$route.query.oddNum,
          status: this.$route.query.status,
          couponId: this.$route.query.couponId
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

