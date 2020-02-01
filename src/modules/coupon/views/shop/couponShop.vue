<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row :gutter="20"
        class="query_label_mgr">
        <el-col :span="4">
          <span>优惠券名称</span>
        </el-col>
        <el-col :span="4">
          <span>优惠券类型</span>
        </el-col>
        <el-col :span="4">
          <span>优惠券状态</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['couponName']"
            placeholder="请输入优惠券名称"
            clearable></el-input>
        </el-col>
        <el-col :span="4">
          <el-select size="small"
            v-model="queryParam['categoryIds']"
            multiple
            style="width:100%;"
            placeholder="请选择">
            <el-option v-for="item in categoryList"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select size="small"
            v-model="queryParam['statuss']"
            multiple
            style="width:100%;"
            placeholder="请选择">
            <el-option v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button class="query-search-button"
            type="primary"
            size="small"
            @click="handleQueryCoupon()">
            <i class="fa fa-search"></i> 搜索</el-button>
        </el-col>
      </el-row>

    </el-card>
    <!-- 列表 -->
    <el-card class="box-card">
      <el-table :header-cell-class-name="'table-head-th'"
        highlight-current-row
        fit
        stripe
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
          :formatter="formatIssueCode">
        </el-table-column>
        <el-table-column label="生效时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.effectTime || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="失效时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.expiryTime || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态"
                         show-overflow-tooltip
                         prop="statusName">
        </el-table-column>
        <el-table-column label="总量"
          show-overflow-tooltip
          prop="couponNum">
        </el-table-column>
        <el-table-column label="可铺货量"
          show-overflow-tooltip
          prop="oddNum">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text"
              title="铺货"
              @click="handleEditPush(scope.row)">
              <i class="fa fa-truck fa-lg funcBtn"></i>
            </el-button>
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
import couponDistributionService from '../../service/coupon-distribution-service.js'
import couponCategoryService from '../../service/coupon-category-service.js'

export default {
  name: 'shopList',
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalPage: 0,

      couponResults: [],

      queryParam: {
        categoryIds: [],
        couponName: '',
        statuss: [],
        pageNum: 1,
        pageSize: 10
      },
      statusList: [
        {
          value: -1,
          label: '草稿'
        },
        {
          value: 0,
          label: '停用'
        },
        {
          value: 1,
          label: '启用'
        }
      ],
      categoryList: []
    }
  },
  mounted() {
    this.couponCategories()
    this.handleQueryCoupon()
  },
  methods: {
    formatIssueCode(result) {
      if (result.issuerCode === 1) {
        return '平台'
      } else {
        return '店铺'
      }
    },
    showCouponDetail(record) {
      this.$router.push({
        path: '/coupon/coupon_details',
        query: {
          couponID: record.id || record.couponId,
          issuerCode: record.issuerCode,
          categoryName: record.categoryName,
          on: 'shop'
        }
      })
    },
    // 优惠券类型
    couponCategories() {
      let self = this
      couponCategoryService.queryAllCategory().then(rspData => {
        self.categoryList = rspData.data
      })
    },
    handleQueryCoupon(pn = 1) {
      this.currentPage = pn
      this.queryParam['pageNum'] = pn
      let param = this.queryParam
      let self = this
      this.loading = true
      couponDistributionService
        .getAllOddCoupon(param)
        .then(rspData => {
          self.loading = false
          self.totalPage = rspData.data.total
          self.couponResults = rspData.data.results
          // self.handleReset()
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleReset() {
      this.queryParam.couponName = ''
      this.queryParam.categoryIds = []
      this.queryParam.statuss = []
    },
    handleCurrentChange(val) {
      this.handleQueryCoupon(val)
    },
    handleEditPush(record) {
      if (record.sendRuleStatus === 0) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '优惠券未编辑发放规则，不能铺货！'
        })
      } else {
        // 添加新菜单逻辑
        this.$router.push({
          path: '/coupon/coupon_shop/shop_history',
          query: {
            couponId: record.id,
            oddNum: record.oddNum,
            status: record.status
          }
        })
      }
    }
  }
}
</script>
