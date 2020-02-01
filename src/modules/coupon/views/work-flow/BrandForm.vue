<template>
  <div class="app-container">
    <el-row class=" mgrb_20">
      <el-row :gutter="20"
        class="query_label_mgr mgrb_10">
        <el-col :span="5">
          <span>品牌名称</span>
        </el-col>
        <el-col :span="5">
          <span>品牌状态</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input v-model="queryParam['query.brandName||like']"
            clearable
            @keyup.enter.native="handleQueryData()"
            size="small"></el-input>
        </el-col>
        <el-col :span="5">
          <el-select v-model="statusArr"
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
      <el-table-column prop="brandName"
        show-overflow-tooltip
        label="品牌名称"></el-table-column>
      <el-table-column prop="brandNameEn"
        show-overflow-tooltip
        label="品牌英文名称"></el-table-column>
      <el-table-column prop="brandState"
        label="品牌状态"
        show-overflow-tooltip
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
import brandService from '@/modules/products/service/product-brand-service.js'
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
        'query.brandName||like': '',
        'query.brandState||in': '',
        'page.size': PAGE_SIZE,
        'page.pn': '1'
      },
      statuses: [
        {
          value: 1,
          label: '上架'
        },
        {
          value: 0,
          label: '下架'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    statusFormatter(row, columns, cellValue) {
      return cellValue === '1' ? '上架' : '下架'
    },
    handleCurrentChange(val) {
      this.handleQueryData(val)
    },
    handleQueryData(pn = 1) {
      this.currentPage = pn
      this.queryParam['page.pn'] = pn
      this.queryParam['query.brandState||in'] = this.statusArr.join(',')
      this.loading = true
      brandService.queryPageData(this.queryParam).then(rspData => {
        this.pageData = rspData.data
        this.loading = false
      }).catch(e => {
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
