<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-card class="box-card">
      <el-row class="query_label_mgr"
        :gutter="20">
        <el-col :span="4">
          <span>优惠券名称</span>
        </el-col>
        <el-col :span="4">
          <span>优惠券类型</span>
        </el-col>
        <el-col :span="4">
          <span>优惠券状态</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['couponName']"
            @keyup.enter.native="handleQueryData()"
            clearable
            placeholder="请输入优惠券名称"
            size="small"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="queryParam['categoryIds']"
            multiple
            style="width:100%;"
            size="small">
            <el-option v-for="item in couponCategories"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="statusArr"
            multiple
            style="width:100%;"
            size="small">
            <el-option v-for="item in couponStatuses"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
            class="query-search-button"
            @click="handleQueryData()"
            size="small">
            <i class="fa fa-search"></i> 搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 数据表格 -->
    <el-card class="box-card">
      <el-dropdown>
        <el-button type="primary"
          size="medium"
          class="mgrb_20">
          <i class="fa fa-plus"></i> 新增优惠券</el-button>
        <el-dropdown-menu slot="dropdown"
          class="addCouponPop">
            <dt>
              <span>平台</span>
            </dt>
            <dd>
              <!-- categoryCode：优惠券code issuerCode: 区分平台/店铺 -->
              <a v-for="item in platformCategories"
                :key="item.id"
                @click="handleAddCoupon(item.categoryCode, item.issuerCode)">{{item.categoryName}}</a>
            </dd>
        </el-dropdown-menu>
      </el-dropdown>
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
        <el-table-column prop="couponName"
          show-overflow-tooltip
          label="优惠券名称"
          class-name="couponName">
          <template slot-scope="scope">
            <a @click="showCouponDetail(scope.row)"
              class="link">{{scope.row.couponName}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="categoryName"
          show-overflow-tooltip
          label="优惠券类型">
        </el-table-column>
        <el-table-column prop="issuerCode"
          show-overflow-tooltip
          label="发行方"
          :formatter="issuerFormatter">
        </el-table-column>
        <el-table-column prop="id"
                         label="卡券id">
          <template slot-scope="scope">
            {{scope.row.id || '-'}}
          </template>
        </el-table-column>
        <el-table-column prop="effectTime"
          show-overflow-tooltip
          label="生效时间">
          <template slot-scope="scope">
            {{scope.row.effectTime || '-'}}
          </template>
        </el-table-column>
        <el-table-column prop="expiryTime"
          show-overflow-tooltip
          label="失效时间">
          <template slot-scope="scope">
            {{scope.row.expiryTime || '-'}}
          </template>
        </el-table-column>
        <el-table-column prop="couponNum"
          show-overflow-tooltip
          label="总量">
        </el-table-column>
        <el-table-column prop="oddNum"
          show-overflow-tooltip
          label="剩余量">
        </el-table-column>
        <el-table-column prop="status"
          show-overflow-tooltip
          label="状态"
          :formatter="statusFormatter">
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作"
          width="160px">
          <template slot-scope="scope">
            <el-button-group>
              <!-- -1草稿 2待完善  && editButtonStatus = 1 显示编辑 -->
              <el-button title="编辑"
                type="text"
                v-if="(scope.row.status === -1 || scope.row.status === 2) && scope.row.editButtonStatus === 1"
                @click="handleEditCoupon(scope.row)">
                <i class="fa fa-edit fa-lg funcBtn"></i>
              </el-button>
              <!-- 1启用 && draftStatus = 1 显示置为草稿 -->
              <el-button title="置为草稿"
                type="text"
                v-if="scope.row.status === 1 && scope.row.draftStatus === 1 && scope.row.stopStatus === 1"
                @click="handleChangeStatus(scope.row, -1, scope.$index)">
                <i class="fa fa-undo fa-lg funcBtn"></i>
              </el-button>
              <!-- -1草稿 显示启用 -->
              <el-button title="启用"
                type="text"
                v-if="scope.row.status === -1 && scope.row.stopStatus === 1"
                @click="handleChangeStatus(scope.row, 1, scope.$index)">
                <i class="fa fa-play-circle-o fa-lg funcBtn"></i>
              </el-button>
              <!-- stopStatus 0不展示停用 1展示停用 -->
              <el-button title="停用"
                v-if="scope.row.stopStatus === 1 && scope.row.status !== 0"
                type="text"
                @click="handleChangeStatus(scope.row, 0, scope.$index)">
                <i class="fa fa-stop-circle-o fa-lg funcBtn"></i>
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页信息 -->
      <div class="pagination-container">
        <el-pagination background
          layout="total, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :total="pageData.total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import couponService from '../../service/coupon-service.js'
import Cookies from 'js-cookie'

export default {
  components: {},
  data() {
    return {
      loading: false,
      currentPage: 1,
      editType: '', // 动作类型 add modify
      pageData: {},
      platformCategory: [], // 平台优惠券类型
      shopCategory: [], // 店铺优惠券类型
      useWaysArr: [], // 使用方式数组
      statusArr: [], // 优惠券状态数组
      queryParam: {
        categoryIds: [],
        couponName: '',
        pageNum: 1,
        pageSize: 10,
        status: '',
        useWays: ''
      },
      useTypes: [
        {
          value: '1',
          label: '线上'
        },
        {
          value: '2',
          label: '线下'
        }
      ], // 使用方式
      couponStatuses: [
        {
          value: -1,
          label: '草稿'
        },
        {
          value: 0,
          label: '停用'
        },
        {
          value: 1,
          label: '启用'
        }
      ] // 优惠券状态
    }
  },
  computed: {
    // 平台优惠券
    platformCategories() {
      return this.$store.state.coupon.platCategoryCodes
    },
    // 店铺优惠券
    shopCategories() {
      return this.$store.state.coupon.shopCategoryCodes
    },
    // 优惠券类型
    couponCategories() {
      return this.$store.getters.couponCategories
    },
    issuerCode() {
      return Cookies.get('issuerCode')
    }
  },
  methods: {
    // 发行方formatter
    issuerFormatter(row, column, cellValue) {
      return cellValue === 1 ? '平台' : '店铺'
    },
    // 优惠券状态 formatter
    statusFormatter(row, column, cellValue) {
      let statusDesc = ''
      switch (cellValue) {
        case -1:
          statusDesc = '草稿'
          break
        case 0:
          statusDesc = '停用'
          break
        case 1:
          statusDesc = '启用'
          break
        case 2:
          statusDesc = '待完善'
          break
      }
      return statusDesc
    },
    // 查询优惠券种类
    handleQueryCategory() {
      this.$store.dispatch('coupon/getCategory').then(rspData => {})
    },
    showCouponDetail(record) {
      this.$router.push({
        path: '/coupon/coupon_details',
        query: {
          couponID: record.id || record.couponId,
          issuerCode: record.issuerCode,
          categoryName: record.categoryName,
          on: 'setup'
        }
      })
    },
    handleAddCoupon(categoryCode, issuerCode) {
      this.editType = 'add'
      this.$router.push({
        name: 'coupon_add',
        query: {
          categoryCode: categoryCode,
          issuerCode: issuerCode,
          editType: this.editType
        }
      })
    },
    handleQueryData(pn = 1) {
      let self = this
      this.loading = true
      this.currentPage = pn
      this.queryParam['pageNum'] = pn
      this.queryParam.useWays = this.useWaysArr.join(',')
      this.queryParam.status = this.statusArr.join(',')
      couponService
        .queryPageData(this.queryParam)
        .then(rspData => {
          self.loading = false
          self.pageData = rspData.data
          // this.handleReset()
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleReset() {
      this.queryParam.couponName = ''
      this.queryParam.categoryIds = []
      this.useWaysArr = []
      this.statusArr = []
    },
    handleEditCoupon(record) {
      this.editType = 'modify'
      this.$router.push({
        name: 'coupon_add',
        query: {
          couponID: record.id,
          editType: this.editType,
          status: record.status,
          couponNum: record.couponNum,
          sendType: record.sendType
        }
      })
      let codes = {
        categoryCode: record.categoryCode,
        issuerCode: record.issuerCode
      }
      localStorage.setItem('codesFlag', JSON.stringify(codes))
    },
    handleChangeStatus(record, status, index) {
      let self = this
      let params = {
        id: record.id,
        status: status
      }
      let confirmMsg =
        status === -1
          ? '确定要编辑该券吗？'
          : status === 0
            ? '确定要停用该券吗？'
            : '确定要启用该券吗？'
      let successMsg =
        status === -1
          ? '该券已置为草稿！'
          : status === 0
            ? '该券已被停用！'
            : '该券已被启用！'
      this.$confirm(confirmMsg, '提示信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        couponService
          .updateStatusById(params)
          .then(rspData => {
            if (rspData.respCode === '2005') {
              self.$message({
                showClose: true,
                message: '券在发放中，请暂停此券的发放!',
                type: 'error'
              })
            } else {
              self.$message({
                showClose: true,
                message: successMsg,
                type: 'success'
              })
              self.handleQueryData()
            }
          })
          .catch(e => {
          })
      })
    },
    handleCurrentChange(val) {
      this.handleQueryData(val)
    }
  },
  mounted() {
    this.handleQueryData()
    this.handleQueryCategory()
  },
  watch: {
    $route: 'handleQueryData()'
  }
}
</script>

<style lang="scss" scoped>
.addCouponPop {
  width: 510px;
  padding: 0 15px;
  background-color: #fff;
  border: #e8e8e8 1px solid;
  box-shadow: 0 1px 4px 0 rgba(153, 153, 153, 0.25);
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  overflow: hidden;
  position: absolute;
  left: 5px;
  top: 38px;
  margin-left: 20px;
  margin-top: 0px;
  display: block;
  dl {
    overflow: hidden;
  }
  dt {
    display: block;
    border-bottom: #e8e8e8 1px solid;
    margin-top: 5px;
    span {
      padding: 0 5px;
      display: inline-block;
      border-bottom: #2D8CF0 4px solid;
      color: #333;
      font-size: 16px;
      font-weight: 600;
      line-height: 2.2;
    }
  }
  dd {
    margin: 10px 0;
    display: block;
    overflow: hidden;
    a {
      margin: 5px;
      padding: 0 20px;
      display: inline-block;
      text-align: center;
      color: #666;
      font-size: 14px;
      line-height: 2.6;
    }
    a:hover {
      color: #2D8CF0;
      background-color: #f1f1f1;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }
  }
}
</style>
