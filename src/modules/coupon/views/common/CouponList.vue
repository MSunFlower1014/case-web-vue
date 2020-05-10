<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>病例名称</span>
        </el-col>

      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['caseName']"
            clearable
            placeholder="请输入病例名称"></el-input>
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
            <el-link @click="showCouponDetail(scope.row)"
              class="link" type="primary">{{scope.row.name}}</el-link>
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
         <el-table-column label="所属科室"
                  show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{scope.row.depart || '-'}}</span>
                  </template>
                </el-table-column>
        <el-table-column label="备注信息"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.message || '-'}}</span>
          </template>
        </el-table-column>
         <el-table-column label="状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.status | statusFilter}}</span>
          </template>
        </el-table-column>
         <el-table-column label="创建时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.createDate }}</span>
          </template>
        </el-table-column>
         <!-- 操作列 -->
        <el-table-column label="操作" >
          <template slot-scope="scope">
             <el-button v-if="scope.row.status=='1'" title="编辑" circle type="primary" icon="el-icon-edit" @click="showCouponWorkFlow(scope.row)"> </el-button>
              <el-button v-if="scope.row.status=='1'" title="出院" type="success" icon="el-icon-check" circle @click="changeCaseStatus(scope.row)"></el-button>
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
  filters: {
    statusFilter(value) {
      let statusDesc = ''
      switch (value) {
        case '1':
          statusDesc = '正常'
          break
        case '2':
          statusDesc = '转派中'
          break
        case '3':
          statusDesc = '出院结档'
          break
      }
      return statusDesc
    }
  },
  methods: {
    changeCaseStatus(record) {
      if (record.status === '2') {
          this.$message({
              type: 'error',
              message: '正在转院的档案无法进行结档操作'
          })
          return
      }
      this.$confirm('此操作将发起出院结档, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          productsService
            .changeCaseStatus(record.id)
            .then(rspData => {
              console.log(rspData)
              if (rspData) {
                 this.$message({
                  type: 'success',
                  message: '出院结档成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '出院结档失败，请稍后再试'
                })
              }
            })
        }).catch((e) => {
          console.log(e)
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    handleCurrentChange(val) {
      this.handleQueryData(val)
    },
    showCouponDetail(record) {
      let couponId = record.id
      this.$router.push({
        path: '/case/case_details',
        query: {
          couponID: couponId,
          on: 'list'
        }
      })
    },
    showCouponWorkFlow(record) {
      let couponId = record.id
      this.$router.push({
        path: '/case/case_add',
        query: {
          couponID: couponId
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

