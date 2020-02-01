<template>
  <div class="app-container">
    <router-view></router-view>
    <!-- 查询表单 -->
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>品牌名称</span>
        </el-col>
        <el-col :span="4">
          <span>品牌状态</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['query.brandName||like']"
            clearable
            placeholder="请输入品牌名称"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select size="small"
            v-model="statusArr"
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
            @click="handleQueryBrand()">
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
        :data="brandResults">
        <el-table-column label="品牌名称"
          show-overflow-tooltip
          prop="brandName">
        </el-table-column>
        <el-table-column label="品牌英文名称"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.brandNameEn || '-'}}
          </template>
        </el-table-column>
        <el-table-column label="品牌状态"
          show-overflow-tooltip
          prop="brandState"
          :formatter="formatStatus">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text"
              title="编辑"
              @click="handleEditBrand(scope.row)">
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
import productBrandService from '../../service/product-brand-service.js'

export default {
  name: 'brandList',
  mounted() {
    this.handleQueryBrand()
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalPage: 0,

      brandResults: [],
      statusArr: [],
      statusList: [
        {
          value: 1,
          label: '上架'
        },
        {
          value: 0,
          label: '下架'
        }
      ],
      queryParam: {
        'query.brandName||like': '',
        'query.brandState||in': '',
        'page.size': 10,
        'page.pn': 1
      }
    }
  },
  methods: {
    formatStatus(row, columns, cellValue) {
      return cellValue === '1' ? '上架' : '下架'
    },
    handleCurrentChange(val) {
      this.handleQueryBrand(val)
    },
    handleQueryBrand(pn = 1) {
      this.loading = true
      this.currentPage = pn
      this.queryParam['page.pn'] = pn
      let param = this.queryParam
      param['query.brandState||in'] = this.statusArr.join(',')
      let self = this
      productBrandService
        .queryPageData(param)
        .then(rspData => {
          self.totalPage = rspData.data.total
          self.brandResults = rspData.data.results
          self.loading = false
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleEditBrand(record) {
      // 添加新菜单逻辑
      this.$router.push({
        path: '/coupon/coupon_list',
        query: {
          goodsBrandId: record.id // Object.assign({}, record)
        }
      })
    }
  }
}
</script>

<style>
</style>
