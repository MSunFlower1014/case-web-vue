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
            clearable
            placeholder="请输入优惠券名称"
            @keyup.enter.native="handleQueryData"
            size="small"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="queryParam['categoryIds']"
            size="small"
            multiple
            clearable
            style="width:100%;">
            <el-option v-for="item in couponCategories"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="queryParam['statuss']"
            size="small"
            multiple
            clearable
            style="width:100%;">
            <el-option v-for="item in statuses"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        stripe
        fit
        highlight-current-row
        :data="pageData.results"
        v-loading="loading"
        element-loading-text="拼命加载中"
        :header-cell-class-name="'table-head-th'">
        <!-- 数据列 -->
        <el-table-column prop="couponName"
          show-overflow-tooltip
          label="优惠券名称"
          class-name="couponName">
          <template slot-scope="scope">
            <a @click="showCouponDetail(scope.row)"
              class="link">{{scope.row.couponName}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="categoryName"
          show-overflow-tooltip
          label="优惠券类型">
        </el-table-column>
        <el-table-column prop="issuerCode"
          show-overflow-tooltip
          label="发行方"
          :formatter="issuerFormatter">
        </el-table-column>
        <el-table-column prop="id"
                         label="卡券id">
          <template slot-scope="scope">
            {{scope.row.id || '-'}}
          </template>
        </el-table-column>
        <el-table-column prop="effectTime"
          show-overflow-tooltip
          label="生效时间">
          <template slot-scope="scope">
            {{scope.row.effectTime || '-'}}
          </template>
        </el-table-column>
        <el-table-column prop="expiryTime"
          show-overflow-tooltip
          label="失效时间">
          <template slot-scope="scope">
            {{scope.row.expiryTime || '-'}}
          </template>
        </el-table-column>
        <el-table-column prop="couponNum"
          show-overflow-tooltip
          label="总量">
        </el-table-column>
        <el-table-column prop="oddNum"
          show-overflow-tooltip
          label="剩余量">
        </el-table-column>
        <el-table-column prop="status"
          show-overflow-tooltip
          label="状态"
          :formatter="statusFormatter">
        </el-table-column>
        <el-table-column label="操作"
          width="160px">
          <template slot-scope="scope">
            <el-button-group>
              <el-button title="批量发放"
                type="text"
                @click="handleBatchGrant(scope.row)">
                <i class="fa fa-sitemap fa-lg funcBtn"></i>
              </el-button>
              <el-button title="个人发放"
                type="text" v-if="scope.row.sendType === '1'"
                @click="handlePersonGrant(scope.row)">
                <i class="fa fa-street-view fa-lg funcBtn"></i>
              </el-button>
              <el-button title="发放记录"
                type="text" v-if="scope.row.sendType === '1'"
                @click="handleShowRecords(scope.row)">
                <i class="fa fa-tasks fa-lg funcBtn"></i>
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
        <!-- 操作列 -->
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
import sendRuleService from '../../service/send-rule-service.js'
const PAGE_SIZE = 10
export default {
  data() {
    return {
      loading: false,
      currentPage: 1,
      pageSize: PAGE_SIZE,
      pageData: {
        results: []
      },
      queryParam: {
        categoryIds: [],
        statuss: [],
        pageNum: 0,
        pageSize: PAGE_SIZE,
        couponName: ''
      },
      statuses: [
        {
          value: 0,
          label: '停用'
        },
        {
          value: 1,
          label: '启用'
        }
      ]
    }
  },
  computed: {
    // 优惠券类型
    couponCategories() {
      return this.$store.getters.couponCategories
    }
  },
  methods: {
    statusFormatter(row, columns, cellValue) {
      return cellValue === 0 ? '停用' : '启用'
    },
    issuerFormatter(row, columns, cellValue) {
      return cellValue === 1 ? '平台' : cellValue === 2 ? '店铺' : '第三方'
    },
    showCouponDetail(record) {
      this.$router.push({
        path: '/coupon/coupon_details',
        query: {
          couponID: record.id || record.couponId,
          issuerCode: record.issuerCode,
          categoryName: record.categoryName,
          on: 'grant'
        }
      })
    },
    handleCurrentChange(val) {
      this.handleQueryData(val)
    },
    handleQueryData(pn = 1) {
      this.loading = true
      this.currentPage = pn
      this.queryParam['pageNum'] = pn
      sendRuleService
        .queryPageData(this.queryParam)
        .then(rspData => {
          this.pageData = rspData.data
          this.loading = false
          // this.handleReset()
        })
        .catch(e => {
          this.loading = false
        })
    },
    // 查询优惠券种类
    handleQueryCategory() {
      this.$store.dispatch('coupon/getCategory').then(rspData => {})
    },
    handleReset() {
      this.queryParam.categoryIds = []
      this.queryParam.couponName = ''
      this.queryParam.statuss = []
    },
    // 批量发放
    handleBatchGrant(record) {
      if (!record.status) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '优惠券未启用，不能发放！'
        })
      } else if (record.sendStatus === 1) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '券在发放中，请暂停此券的发放！'
        })
      } else {
        this.$router.push({
          path: '/coupon/coupon_grant/coupon_grant_batch',
          query: {
            id: record.id,
            oddNum: record.oddNum,
            status: record.status
          }
        })
      }
    },
    // 个人发放
    handlePersonGrant(record) {
      if (!record.status) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '优惠券未启用，不能发放！'
        })
      } else if (record.oddNum <= 0) {
        this.$message({
          showClose: true,
          type: 'error',
          message: '该券无库存，无法进行个人发放！'
        })
      } else {
        this.$router.push({
          path: '/coupon/coupon_grant/coupon_grant_personal',
          query: {
            id: record.id,
            status: record.status,
            oddNum: record.oddNum
          }
        })
      }
    },
    // 发放记录
    handleShowRecords(record) {
      this.$router.push({
        path: '/coupon/coupon_grant/record_list',
        query: {
          id: record.id,
          status: record.status
        }
      })
    }
  },
  mounted() {
    this.handleQueryData()
    this.handleQueryCategory()
  }
}
</script>

