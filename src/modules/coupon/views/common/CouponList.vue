<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>优惠券名称</span>
        </el-col>
    
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['caseName']"
            clearable
            placeholder="请输入优惠券名称"></el-input>
        </el-col>
       
        <el-col :span="2">
          <el-button class="query-search-button"
            type="primary"
            size="small"
            @click="handleQueryData()">
            <i class="fa fa-search"></i>搜索</el-button>
        </el-col>
      </el-row>

    </el-card>
    <!-- 列表 -->
    <el-card class="box-card">
      <el-table :header-cell-class-name="'table-head-th'"
        highlight-current-row
        stripe
        fit
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="pageData.records">
        <el-table-column label="病例名称"
          show-overflow-tooltip
          prop="name"
          class-name="name">
          <template slot-scope="scope">
            <a @click="showCouponDetail(scope.row)"
              class="link">{{scope.row.name}}</a>
          </template>
        </el-table-column>
            <el-table-column label="病例id"
          show-overflow-tooltip
          prop="id"
          class-name="id">
          <template slot-scope="scope">
            <span>{{scope.row.id || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属医院"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.hospital || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注信息"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.message || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.type || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.createDate || '-'}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background
          layout="total, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :total="pageData.total"
          :page-size="pageSize">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
const PAGE_SIZE = 10
import productsService from '@/modules/products/service/products-service.js'

export default {
  name: 'couponList',
  data() {
    return {
      loading: false,
      pageSize: PAGE_SIZE,
      currentPage: 1,
      totalPage: 30,
      pageData: {
        records : []
      },
      statusArr: [],
      shopId: '',

      goodsId: '',
      goodsBrandId: '',
      queryParam: {
        caseName: '',
        pageNum: 1,
        pageSize: PAGE_SIZE
      }
    }
  },
  methods: {  
    handleCurrentChange(val) {
      this.handleQueryData(val)
    },
    showCouponDetail(record) {
      let couponId = record.id || record.couponId
      this.$router.push({
        path: '/case/case_details',
        query: {
          couponID: couponId,
          on: 'list'
        }
      })
    },
    handleQueryData(pn = 1) {
      this.currentPage = pn
      this.queryParam['pageNum'] = pn   
      this.goodsId = this.$route.query.goodsId
      this.handleQueryGoodsCoupon()
    },
    handleQueryGoodsCoupon() {
      this.loading = true
      let self = this
      this.queryParam.goodsId = this.goodsId
      let param = this.queryParam
      productsService
        .getGoodsCoupon(param)
        .then(rspData => {
          self.pageData = rspData
          console.log(self.pageData)
          self.loading = false
        })
        .catch(e => {
          self.loading = false
        })
    }
  },
  mounted() {
    this.handleQueryData()
  }
}
</script>

