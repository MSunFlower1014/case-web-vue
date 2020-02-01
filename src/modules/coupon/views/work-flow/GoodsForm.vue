<template>
  <div class="app-container">
    <el-row class="mgrb_20">
      <el-row class="query_label_mgr mgrb_10">
        <el-col :span="5">
          <span>商品名称</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input v-model="queryParam.goodsName"
            clearable
            @keyup.enter.native="handleQueryData()"
            size="small"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
            @click="handleQueryData()"
            size="small"
            class="query-search-button">
            <i class="fa fa-search"></i> 搜索</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-table :data="pageData.results"
      fit
      stripe
      :header-cell-class-name="'table-head-th'"
      v-loading="loading"
      element-loading-text="拼命加载中"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection"
        width="55">
      </el-table-column>
      <el-table-column prop="goodsName"
        show-overflow-tooltip
        label="商品名称"></el-table-column>
      <el-table-column prop="saleNum"
        show-overflow-tooltip
        label="销量"></el-table-column>
      <el-table-column prop="type"
        show-overflow-tooltip
        label="类型"
        :formatter="typeFormatter"></el-table-column>
      <el-table-column prop="createDate"
        show-overflow-tooltip
        label="创建时间"></el-table-column>
      <el-table-column prop="status"
        show-overflow-tooltip
        label="商品状态"
        :formatter="statusFormatter"></el-table-column>
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
  </div>
</template>
<script>
const PAGE_SIZE = 5
import goodsService from '@/modules/products/service/products-service.js'
export default {
  data() {
    return {
      loading: false,
      statusArr: [],
      pageSize: PAGE_SIZE,
      pageData: {
        results: []
      },
      currentPage: 1,
      queryParam: {
        goodsName: '',
        pageSize: PAGE_SIZE,
        pageNum: 1
      },
      multipleSelection: []
    }
  },
  methods: {
    // typeFormatter(row, columns, cellValue) {
    //   return cellValue === '01' ? '受理业务' : cellValue === '02' ? '手机' : ''
    // },
    typeFormatter(row, columns, cellValue) {
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
    // 1 === 已启用？
    statusFormatter(row, columns, cellValue) {
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
    handleCurrentChange(val) {
      this.handleQueryData(val)
    },
    handleQueryData(pn = 1) {
      this.loading = true
      this.currentPage = pn
      this.queryParam.pageNum = pn
      goodsService
        .queryPageData(this.queryParam)
        .then(rspData => {
          this.pageData = rspData.data
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleReturn() {
      this.multipleSelection = []
      this.$emit('after-edit', this.multipleSelection)
    },
    handleSubmit() {
      this.$emit('after-edit', this.multipleSelection)
    }
  },
  mounted() {
    this.handleQueryData()
  }
}
</script>
<style lang="scss" scoped>
</style>
