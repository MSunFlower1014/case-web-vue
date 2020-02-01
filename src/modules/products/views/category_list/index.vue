<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>品类名称</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input placeholder="请输入品类名称"
            clearable
            v-model="queryParam['categoryName']"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="query-search-button"
            type="primary"
            size="small"
            @click="handleQueryCategory()">
            <i class="fa fa-search"></i>搜索</el-button>
        </el-col>
      </el-row>

    </el-card>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="3">
          <ef-dynamic-tree prefix-url="/api/platform/goodsCategory"
            ref="cateTree"
            @get-tree-data="getTreeData"
            :node-click="handleOrganizationClick"></ef-dynamic-tree>
        </el-col>
        <el-col :span="21">
          <el-table :header-cell-class-name="'table-head-th'"
            highlight-current-row
            fit
            stripe
            v-loading="loading"
            element-loading-text="拼命加载中"
            :data="categoryResults">
            <el-table-column show-overflow-tooltip
              label="优惠券名称"
              prop="couponName"
              class-name="couponName">
              <template slot-scope="scope">
                <a @click="showCouponDetail(scope.row)"
                  class="link">{{scope.row.couponName}}</a>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
              label="状态"
              prop="status"
              :formatter="statusFormatter">
            </el-table-column>
            <el-table-column show-overflow-tooltip
              label="生效时间">
              <template slot-scope="scope">
                <span>{{scope.row.effectTime || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
              label="失效时间">
              <template slot-scope="scope">
                <span>{{scope.row.expiryTime || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
              label="总量"
              prop="couponNum">
            </el-table-column>
            <el-table-column show-overflow-tooltip
              label="领取量"
              prop="doleNum">
            </el-table-column>
            <el-table-column show-overflow-tooltip
              label="使用量"
              prop="useNum">
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
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import EfDynamicTree from '@/components/EfDynamicTree'
import productCategoryService from '../../service/product-category-service.js'

export default {
  name: 'catetoryList',
  components: {
    EfDynamicTree
  },
  mounted() {
    // this.handleQueryCategory()
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalPage: 0,
      goodsCategoryId: '',
      queryParam: {
        goodsCategoryId: '',
        couponName: '',
        pageNum: 1,
        pageSize: 10,
        statuss: []
      },
      categoryResults: []
    }
  },
  methods: {
    statusFormatter(row, columns, cellValue) {
      return cellValue === 0 ? '停用' : '启用'
    },
    handleCurrentChange(val) {
      this.handleQueryCategory(val)
    },
    showCouponDetail(record) {
      this.$router.push({
        path: '/coupon/coupon_details',
        query: {
          couponID: record.couponId,
          issuerCode: record.issuerCode,
          categoryName: record.categoryName,
          on: 'cate'
        }
      })
    },
    handleQueryCategory(pn = 1) {
      this.loading = true
      this.currentPage = pn
      this.queryParam['pageNum'] = pn
      let self = this
      let param = this.queryParam
      productCategoryService
        .getGoodsCategoryCoupon(param)
        .then(rspData => {
          self.totalPage = rspData.data.total
          self.categoryResults = rspData.data.results
          self.loading = false
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleOrganizationClick(organization) {
      this.queryParam.goodsCategoryId = organization.id
      this.handleQueryCategory()
    },
    getTreeData(treeData) {
      // if (treeData.length) {
      //   this.queryParam.goodsCategoryId = treeData[0].children
      //     ? treeData[0].children[0].id
      //     : treeData[0].id
      //   this.handleQueryCategory()
      // }
    }
  }
}
</script>
