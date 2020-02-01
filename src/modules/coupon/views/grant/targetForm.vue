<template>
  <div class="app-container">
    <el-row class="mgrb_20">
      <el-row class="query_label_mgr mgrb_10"
        :gutter="20">
        <el-col :span="5">
          <span>规则类型</span>
        </el-col>
        <el-col :span="5">
          <span>规则名称</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-select v-model="queryParam['query.targetType||eq']"
            size="small"
            clearable
            style="width:100%;">
            <el-option v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-input v-model="queryParam['query.ruleName||like']"
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
      stripe
      fit
      :header-cell-class-name="'table-head-th'"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection"
        width="55">
      </el-table-column>
      <el-table-column prop="targetType"
        show-overflow-tooltip
        label="规则类型"
        :formatter="typeFormatter"></el-table-column>
      <el-table-column prop="ruleName"
        label="规则名称"
        show-overflow-tooltip></el-table-column>
      <el-table-column prop="ruleVal"
        label="规则内容"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <el-button type="text"
            @click="downloadAttach(scope.row)">
            下载查看
            <!-- <a :href="attachUrl" download="ruleText">下载查看</a> -->
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="创建人"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.createBy || '-'}}
        </template>
      </el-table-column>
      <el-table-column label="编辑时间"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.updateDate||scope.row.createDate}}
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页信息 -->
    <div class="pagination-container">
      <el-pagination background
        layout="total, prev, pager, next, jumper"
        :total="pageData.total"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import targetUserService from '../../service/target-user-service.js'
import { downloadFile } from '@/utils/index'
const PAGE_SIZE = 10
export default {
  data() {
    return {
      statusArr: [],
      pageSize: PAGE_SIZE,
      pageData: {
        results: []
      },
      currentPage: 1,
      queryParam: {
        'query.ruleName||like': '',
        'query.targetType||eq': '',
        'query.status||eq': 1,
        'page.size': 10,
        'page.pn': 1
      },
      types: [
        {
          value: 1,
          label: '黑名单用户'
        },
        {
          value: 2,
          label: '白名单用户'
        },
        {
          value: 3,
          label: '目标用户'
        }
      ],
      attachUrl: '',
      multipleSelection: []
    }
  },
  methods: {
    typeFormatter(row, columns, cellValue) {
      return cellValue === 1 ? '黑名单用户' : cellValue === 2 ? '白名单用户' : '目标用户'
    },
    handleCurrentChange(val) {
      this.handleQueryData(val)
    },
    handleQueryData(pn = 1) {
      this.currentPage = pn
      this.queryParam['page.pn'] = pn
      targetUserService.queryPageData(this.queryParam).then(rspData => {
        this.pageData = rspData.data
      })
    },
    downloadAttach(record) {
      let arr = record.ruleVal.split('/')
      let fileSuffixArr = arr[arr.length - 1].split('.')

      let fileName = fileSuffixArr[0]
      let suffix = fileSuffixArr[1]

      const self = this
      this.$confirm('您是否确定下载规则？', '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          targetUserService.viewFile(record.ruleVal).then(rspData => {
            downloadFile(rspData, fileName, suffix)
            self.$message({
              showClose: true,
              type: 'success',
              message: '下载成功!'
            })
          })
        })
        .catch(() => {})
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
