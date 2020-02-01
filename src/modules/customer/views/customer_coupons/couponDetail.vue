<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-card class="box-card">
      <el-row :gutter="20"
        class="query_label_mgr">
        <el-col :span="4">
          <span>优惠券名称</span>
        </el-col>
        <el-col :span="4">
          <span>优惠券类型</span>
        </el-col>
        <el-col :span="4">
          <span>优惠券状态</span>
        </el-col>
        <el-col :span="4">
          <span>开始时间</span>
        </el-col>
        <el-col :span="4">
          <span>结束时间</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input placeholder="请输入优惠券名称"
            clearable
            v-model="queryParam['couponName']"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select size="small"
            v-model="categoryArr"
            multiple
            style="width:100%;"
            placeholder="请选择">
            <el-option v-for="item in categoryList"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id">
            </el-option>
          </el-select>
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
        <el-col :span="4">
          <el-date-picker type="datetime"
            style="width:100%;"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="queryParam['beginTime']"
            placeholder="选择开始日期时间">
          </el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-date-picker type="datetime"
            style="width:100%;"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="queryParam['endTime']"
            placeholder="选择结束日期时间">
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button class="query-search-button"
            type="primary"
            size="small"
            @click="handleQueryReceivedCoupon()">
            <i class="fa fa-search"></i>搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 列表数据 -->
    <el-card>
      <el-table :header-cell-class-name="'table-head-th'"
        highlight-current-row
        fit
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="couponResults">
        <el-table-column label="手机号码"
          show-overflow-tooltip
          prop="tel">
        </el-table-column>
        <el-table-column label="优惠券类型"
          show-overflow-tooltip
          prop="categoryName">
        </el-table-column>
        <el-table-column label="优惠券名称"
          show-overflow-tooltip
          prop="couponName">
        </el-table-column>
        <el-table-column label="优惠券编码"
          show-overflow-tooltip
          prop="couponCode">
        </el-table-column>
        <el-table-column label="状态"
          show-overflow-tooltip
          :formatter="statusFormatter">
        </el-table-column>
        <el-table-column label="领取时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.createDate  || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="领取来源"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{sendTypes[scope.row.sendType] ||'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="面额"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.denomination + unitTypes[scope.row.unitType] ||'-'}}</span>
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
import couponCategoryService from '../../../coupon/service/coupon-category-service.js'
import historyService from '../../service/history-service.js'

export default {
  name: 'coupounDetail',
  mounted() {
    this.queryParam.tel = this.$route.query.tel
    this.handleQueryReceivedCoupon()
    this.couponCategories()
  },
  data() {
    return {
      loading: false,
      currentPage: 1,
      totalPage: 0,
      categoryList: [],
      unitTypes: ['', '元', '角', '分', 'M', 'G', '分钟', '小时', '折'],
      sendTypes: ['系统发放', '用户领取'],
      statusList: [
        {
          value: '1',
          label: '待激活'
        },
        {
          value: '2',
          label: '待使用'
        },
        {
          value: '3',
          label: '待核销'
        },
        {
          value: '4',
          label: '已使用'
        },
        {
          value: '5',
          label: '已过期'
        }
      ],
      couponResults: [],
      categoryArr: [],
      statusArr: [],
      queryParam: {
        beginTime: null,
        endTime: null,
        categoryIds: '',
        couponName: '',
        status: '',
        pageNum: 1,
        pageSize: 10,
        tel: ''
      }
    }
  },
  methods: {
    // 优惠券类型
    couponCategories() {
      let self = this
      couponCategoryService.queryAllCategory().then(rspData => {
        self.categoryList = rspData.data
      })
    },
    statusFormatter(result) {
      let showStatus = ''
      for (let index = 0; index < this.statusList.length; index++) {
        const element = this.statusList[index]
        if (element.value === result.status) {
          showStatus = element.label
          break
        }
      }
      return showStatus
    },
    handleCurrentChange(val) {
      this.handleQueryReceivedCoupon(val)
    },
    timeCheck() {
      let startTime = this.queryParam.beginTime
      let endTime = this.queryParam.endTime

      let startDate = 0
      let endDate = 0

      let startTempArr = []
      let endTempArr = []

      if (startTime && startTime.length > 0) {
        let startArr = startTime.split(' ')

        const element1 = startArr[0]
        let tmp1 = element1.split('-')
        startTempArr = startTempArr.concat(tmp1)

        const element2 = startArr[1]
        let tmp2 = element2.split(':')
        startTempArr = startTempArr.concat(tmp2)

        startDate = new Date(
          startTempArr[0],
          startTempArr[1],
          startTempArr[2],
          startTempArr[3],
          startTempArr[4],
          startTempArr[5]
        )
      }

      if (endTime && endTime.length > 0) {
        let startArr = endTime.split(' ')

        const element1 = startArr[0]
        let tmp1 = element1.split('-')
        endTempArr = endTempArr.concat(tmp1)

        const element2 = startArr[1]
        let tmp2 = element2.split(':')
        endTempArr = endTempArr.concat(tmp2)

        endDate = new Date(
          endTempArr[0],
          endTempArr[1],
          endTempArr[2],
          endTempArr[3],
          endTempArr[4],
          endTempArr[5]
        )
      }

      if (startDate !== 0 && endDate !== 0) {
        if (startDate.getTime() > endDate.getTime()) {
          return false
        }
      }
      return true
    },
    handleQueryReceivedCoupon(pn = 1) {
      this.currentPage = pn
      this.queryParam['pageNum'] = pn
      let param = this.queryParam
      param['categoryIds'] = this.categoryArr.join(',')
      param['status'] = this.statusArr.join(',')
      let self = this
      if (this.timeCheck()) {
        this.loading = true
        historyService
          .getUserCouponDetailList(param)
          .then(rspData => {
            self.totalPage = rspData.data.total
            self.couponResults = rspData.data.results
            self.loading = false
          })
          .catch(e => {
            self.loading = false
          })
      } else {
        this.$message({
          showClose: true,
          message: '请选择正确的时间',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style>
</style>
