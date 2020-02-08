<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>病例id</span>
        </el-col>
    
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="caseId"
            clearable
            placeholder="请输入病例id"></el-input>
        </el-col>
       
        <el-col :span="2">
          <el-button class="query-search-button"
            type="primary"
            size="small"
            @click="getNoticePageByCaseId()">
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
        <el-table-column label="转诊单id"
          show-overflow-tooltip
          prop="id"
          class-name="name">
          <template slot-scope="scope">
            <span
              class="link">{{scope.row.referralEntity.id}}</span>
          </template>
        </el-table-column>
            <el-table-column label="病例id"
          show-overflow-tooltip
          prop="caseId"
          class-name="id">
          <template slot-scope="scope">
            <el-link @click="showCouponDetail(scope.row)"
              class="link" type="primary">{{scope.row.referralEntity.caseId}}</el-link>
      
          </template>
        </el-table-column>
        <el-table-column label="申请转诊医院"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.referralEntity.oldOwnName || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="接受转诊医院"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.referralEntity.newOwnName || '-'}}</span>
          </template>
        </el-table-column>
         <el-table-column label="转诊类型"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.referralEntity.type | typeFilter}}</span>
          </template>
        </el-table-column>
         <el-table-column label="处理时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.createDate }}</span>
          </template>
        </el-table-column>
           <el-table-column label="转诊单状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.referralEntity.status | statusFilter}}</span>
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
        records: []
      },
      queryParam: {
        pageNum: 1,
        pageSize: PAGE_SIZE
      },
      checkParam: {
        id: '',
        flag: null
      },
      caseId: ''
    }
  },
  filters: {
    typeFilter(value) {
      let statusDesc = ''
      switch (value) {
        case '1':
          statusDesc = '上转转诊'
          break
        case '2':
          statusDesc = '下转转诊'
          break
      }
      return statusDesc
    },
    statusFilter(value) {
      let statusDesc = ''
      switch (value) {
        case 1:
          statusDesc = '接受中'
          break
        case 2:
          statusDesc = '已接受'
          break
        case 3:
          statusDesc = '已拒绝'
          break
      }
      return statusDesc
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.handleQueryData(val)
    },
    showCouponDetail(record) {
      let couponId = record.referralEntity.caseId
      this.$router.push({
        path: '/case/case_details',
        query: {
          couponID: couponId,
          on: 'list'
        }
      })
    },
    checkReferral(record, flag) {
      let showMessage = '此操作将接受此档案转诊, 是否继续?'
      if (flag === 2) {
        showMessage = '此操作将拒绝此档案转诊, 是否继续?'
      }
      this.$confirm(showMessage, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.checkParam.id = record.id
          this.checkParam.flag = flag
          let param = this.checkParam
          productsService
            .checkReferral(param)
            .then(rspData => {
              this.$message({
                    type: 'success',
                    message: '操作成功！'
                  })
              self.pageData = rspData
              console.log(self.pageData)
              self.loading = false
              this.handleQueryData()
        })
        .catch(e => {
          this.$message({
                type: 'error',
                message: e
              })
          self.loading = false
        })
      })
    },
    getNoticePageByCaseId(){
      this.currentPage = 1
      this.queryParam['pageNum'] = 1
      let param = this.queryParam
      productsService
      .getNoticePageByCaseId(param,this.caseId)
      .then(rspData => {
          this.pageData = rspData
          console.log(this.pageData)
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },
    handleQueryData(pn = 1) {
      this.currentPage = pn
      this.queryParam['pageNum'] = pn
      this.handleQueryNotice()
    },
    handleQueryNotice() {
      this.loading = true
      let self = this
      let param = this.queryParam
      productsService
        .getNoticePage(param)
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

<style lang="scss" scoped>
.width-50 {
  width: 40%;
}
</style>