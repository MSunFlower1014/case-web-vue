<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>店铺名称</span>
        </el-col>
        <el-col :span="4">
          <span>店铺状态</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['shopName']"
            clearable
            placeholder="请输入店铺名称"
            @keyup.enter.native="handleQueryData"
            size="small"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="statuss"
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
        fit
        stripe
        highlight-current-row
        :data="pageData.results"
        v-loading="loading"
        element-loading-text="拼命加载中"
        :header-cell-class-name="'table-head-th'">
        <!-- 数据列 -->
        <el-table-column prop="shopName"
          show-overflow-tooltip
          label="店铺名称">
        </el-table-column>
        <el-table-column prop="id"
          show-overflow-tooltip
          label="店铺ID">
        </el-table-column>
        <el-table-column prop="userName"
          show-overflow-tooltip
          label="店主账号">
          <template slot-scope="scope">
            <span>
              {{scope.row.userName || '-'}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="shopState"
          show-overflow-tooltip
          label="店铺状态"
          :formatter="statusFormatter">
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button title="查看优惠券"
              type="text"
              @click="handleShowCoupon(scope.row)">
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
import shopService from '../service/shop-service.js'
const PAGE_SIZE = 10
export default {
  mounted() {
    this.handleQueryData()
  },
  data() {
    return {
      loading: false,
      pageSize: PAGE_SIZE,
      pageData: {
        results: []
      },
      currentPage: 1,
      queryParam: {
        shopName: '',
        status: '',
        pageSize: 10,
        pageNum: 1
      },
      statuss: [],
      statuses: [
        {
          value: '0',
          label: '禁用'
        },
        {
          value: '1',
          label: '启用'
        },
        {
          value: '2',
          label: '未激活'
        }
      ]
    }
  },
  methods: {
    statusFormatter(row, columns, cellValue) {
      if (cellValue === '0') return '禁用'
      if (cellValue === '1') return '启用'
      if (cellValue === '2') return '未激活'
    },
    handleCurrentChange(val) {
      this.handleQueryData(val)
    },
    handleQueryData(pn = 1) {
      this.currentPage = pn
      this.queryParam['pageNum'] = pn
      this.queryParam['status'] = this.statuss.join(',')
      this.loading = true
      shopService
        .queryShopList(this.queryParam)
        .then(rspData => {
          this.pageData = rspData.data
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleShowCoupon(record) {
      // let self = this
      this.$router.push({
        path: '/coupon/coupon_list',
        query: {
          shopId: record.id
        }
      })
    }
  }
}
</script>

