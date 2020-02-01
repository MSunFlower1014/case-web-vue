<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row :gutter="20"
        class="query_label_mgr">
        <el-col :span="4">
          <span>手机号码</span>
        </el-col>
        <el-col :span="4">
          <span>券码</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['tel']"
            clearable
            placeholder="请输入手机号码"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="queryParam['couponcode']"
            placeholder="请输入券码"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="query-search-button"
            size="small"
            type="primary"
            @click="handleQueryCoupon()">
            <i class="fa fa-search"></i>搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <el-table :header-cell-class-name="'table-head-th'"
        highlight-current-row
        stripe
        fit
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="couponResults">
        <el-table-column label="优惠券名称"
          show-overflow-tooltip
          prop="couponName"
          class-name="couponName">
          <template slot-scope="scope">
            <a @click="showCouponDetail(scope.row)"
              class="link">{{scope.row.couponName}}</a>
          </template>
        </el-table-column>
        <el-table-column label="优惠券类型"
          show-overflow-tooltip
          prop="categoryName">
        </el-table-column>
        <el-table-column label="发行方"
          show-overflow-tooltip
          prop="issue">
        </el-table-column>
        <el-table-column label="生效时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.effectiveTime || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="失效时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.expireTime || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="激活时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.activateTime || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户号码"
          show-overflow-tooltip
          prop="tel">
        </el-table-column>
        <el-table-column label="券码"
          show-overflow-tooltip
          prop="couponCode">
        </el-table-column>
        <el-table-column label="状态"
          show-overflow-tooltip
          prop="statusName">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="text"
                title="待激活"
                v-show="scope.row.status === '1'"
                @click="handleActiveCoupon(scope.row)">
                <i class="fa fa-magic fa-lg funcBtn"></i>
              </el-button>
              <el-button type="text"
                title="待核销"
                v-show="scope.row.status === '3'"
                @click="handleComfirmCoupon(scope.row)">
                <i class="fa fa-thumbs-o-up fa-lg funcBtn"></i>
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
  </div>
</template>

<script>
import authService from '../../service/auth-service.js'

export default {
  name: 'couponAuthList',
  mounted() {
    this.handleQueryCoupon()
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalPage: 0,
      couponResults: [],
      queryParam: {
        beginTime: null,
        categoryIds: '',
        couponName: '',
        couponcode: '',
        endTime: null,
        pageNum: 1,
        pageSize: 10,
        status: '',
        tel: ''
      }
    }
  },
  methods: {
    showCouponDetail(record) {
      this.$router.push({
        path: '/coupon/coupon_details',
        query: {
          couponID: record.id || record.couponId,
          categoryName: record.categoryName,
          issuerCode: parseInt(record.issue),
          on: 'auth'
        }
      })
    },
    handleCurrentChange(val) {
      this.handleQueryCoupon(val)
    },
    handleQueryCoupon(pn = 1) {
      this.loading = true
      this.currentPage = pn
      this.queryParam['pageNum'] = pn
      let param = this.queryParam
      let self = this
      authService
        .getActivationCoupons(param)
        .then(rspData => {
          self.totalPage = rspData.data.total
          self.couponResults = rspData.data.results
          self.loading = false
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleActiveCoupon(record) {
      this.$router.push({
        path: '/coupon/coupon_auth/coupon_detail',
        query: {
          couponCode: record.couponCode // record
        }
      })
    },
    handleComfirmCoupon(record) {
      this.$router.push({
        path: '/coupon/coupon_auth/coupon_detail',
        query: {
          couponCode: record.couponCode // record
        }
      })
    }
  }
}
</script>

