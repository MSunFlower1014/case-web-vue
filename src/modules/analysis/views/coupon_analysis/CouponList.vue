<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>优惠券名称</span>
        </el-col>
        <el-col :span="4">
          <span>优惠券类型</span>
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
            style="width:100%;">
            <el-option v-for="item in couponCategories"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
            @click="handleQueryData()"
            size="small"
            class="query-search-button">
            <i class="fa fa-search"></i>搜索</el-button>
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
        <el-table-column prop="couponName"
          show-overflow-tooltip
          label="优惠券名称">
        </el-table-column>
        <el-table-column prop="categoryName"
          show-overflow-tooltip
          label="优惠券类型">
        </el-table-column>
        <el-table-column prop="issuerName"
          show-overflow-tooltip
          label="发行方">
        </el-table-column>
        <el-table-column prop="denomination"
          show-overflow-tooltip
          label="面额">
        </el-table-column>
        <el-table-column show-overflow-tooltip
          label="生效时间">
          <template slot-scope="scope">
            {{scope.row.effectTime || '-'}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip
          label="失效时间">
          <template slot-scope="scope">
            {{scope.row.expiryTime || '-'}}
          </template>
        </el-table-column>
        <el-table-column prop="couponNum"
          show-overflow-tooltip
          label="制作数">
        </el-table-column>
        <el-table-column prop="doleNum"
          show-overflow-tooltip
          label="领取数量">
        </el-table-column>
        <el-table-column prop="useNum"
          show-overflow-tooltip
          label="使用数量">
        </el-table-column>
        <el-table-column prop="statusName"
          show-overflow-tooltip
          label="状态">
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button title="查看详情"
              type="text"
              @click="handleShowDetail(scope.row)">
              <i class="fa fa-file-text-o fa-lg funcBtn"></i>
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
import couponAnalyService from '../../service/coupon-analysis-service.js'
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
        couponName: '',
        pageNum: 1,
        pageSize: PAGE_SIZE
      }
    }
  },
  computed: {
    // 优惠券类型
    couponCategories() {
      return this.$store.getters.couponCategories
    }
  },
  methods: {
    // 查询优惠券种类
    handleQueryCategory() {
      this.$store.dispatch('coupon/getCategory').then(rspData => {})
    },
    handleCurrentChange(val) {
      this.handleQueryData(val)
    },
    handleQueryData(pn = 1) {
      this.loading = true
      this.currentPage = pn
      this.queryParam['pageNum'] = pn
      couponAnalyService
        .queryPageData(this.queryParam)
        .then(rspData => {
          this.pageData = rspData.data
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleShowDetail(record) {
      this.$router.push({
        name: 'analysis_detail',
        query: { couponId: record.id, doleNum: record.doleNum, useNum: record.useNum }
      })
    }
  },
  mounted() {
    this.handleQueryData()
    this.handleQueryCategory()
  }
}
</script>

