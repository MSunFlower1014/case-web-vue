<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>商品名称</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input placeholder="请输入商品名称"
            clearable
            v-model="queryParam.goodsName"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="query-search-button"
            type="primary"
            size="small"
            @click="handleQueryGoods()">
            <i class="fa fa-search"></i>搜索</el-button>
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
        :data="goodsResults">
        <el-table-column show-overflow-tooltip
          label="商品名称"
          prop="goodsName">
        </el-table-column>
        <el-table-column show-overflow-tooltip
          label="品牌名称">
          <template slot-scope="scope">
            {{scope.row.brandName || '-'}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip
          label="品类名称">
          <template slot-scope="scope">
            {{scope.row.goodsCategoryName || '-'}}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip
          label="销量"
          prop="saleNum">
        </el-table-column>
        <el-table-column show-overflow-tooltip
          label="类型"
          prop="type"
          :formatter="formatType">
        </el-table-column>
        <el-table-column show-overflow-tooltip
          label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.createDate || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip
          label="商品状态"
          prop="status"
          :formatter="formatStatus">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text"
              title="编辑"
              @click="handleEditGoods(scope.row)">
              <i class="fa fa-file-text-o fa-lg funcBtn"></i>
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
import productsService from '../../service/products-service.js'

export default {
  name: 'goodsList',
  mounted() {
    this.handleQueryGoods()
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalPage: 0,
      goodsResults: [],
      queryParam: {
        goodsName: '',
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  methods: {
    formatStatus(row, columns, cellValue) {
      let statusDesc = ''
      switch (cellValue) {
        case 0:
          statusDesc = '下架'
          break
        case 1:
          statusDesc = '上架'
          break
        case 2:
          statusDesc = '上架待审核'
          break
        case 3:
          statusDesc = '上架审核不通过'
          break
        case 4:
          statusDesc = '市公司下架'
          break
        case 5:
          statusDesc = '分公司下架'
          break
        case 6:
          statusDesc = '强制下架'
          break
        case 9:
          statusDesc = '外部系统下架'
          break
      }
      return statusDesc
    },
    formatType(row, columns, cellValue) {
      let desc = ''
      switch (cellValue) {
        case '01':
          desc = '业务'
          break
        case '02':
          desc = '终端'
          break
        case '03':
          desc = '号卡'
          break
        case '04':
          desc = '3C配件'
          break
        case '05':
          desc = '到店服务'
          break
        case '99':
          desc = '其他'
          break
      }
      return desc
    },
    handleCurrentChange(val) {
      this.handleQueryGoods(val)
    },
    handleQueryGoods(pn = 1) {
      this.loading = true
      this.currentPage = pn
      this.queryParam.pageNum = pn
      let param = this.queryParam
      let self = this
      productsService
        .queryPageData(param)
        .then(rspData => {
          self.totalPage = rspData.data.total
          self.goodsResults = rspData.data.results
          self.loading = false
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleEditGoods(record) {
      // 添加新菜单逻辑
      this.$router.push({
        path: '/coupon/coupon_list',
        query: {
          goodsId: record.id // Object.assign({}, record)// record
        }
      })
    }
  }
}
</script>

<style>
</style>
