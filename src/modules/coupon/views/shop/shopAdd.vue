<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row :gutter="20"
        class="query_label_mgr">
        <el-col :span="4">
          <span>组织名称</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input v-model="queryParam['orgName']"
            placeholder="请输入组织名称"
            clearable></el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="query-search-button"
            type="primary"
            size="small"
            @click="handleQueryOrg">
            <i class="fa fa-search"></i>搜索</el-button>
        </el-col>
      </el-row>

    </el-card>
    <!-- 分配 -->
    <el-card class="box-card">
      <el-button type="primary"
        size="medium"
        @click="handleAverageAction">
        <i class="fa fa-database"></i>平均分配</el-button>
      <el-button type="primary"
        size="medium"
        @click="handleUnaverageAction">
        <i class="fa fa-braille"></i> 不平均分配</el-button>
      <el-row>
        <p class="count-label">可分配数量：{{oddNum}}</p>
      </el-row>
      <!-- 列表数据 -->
      <el-table :header-cell-class-name="'table-head-th'"
        highlight-current-row
        fit
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="pushResults">

        <el-table-column label="组织名称"
                         show-overflow-tooltip
                         prop="orgName">
        </el-table-column>
          <el-table-column label="级别"
                           show-overflow-tooltip
                           prop="roleName">
          </el-table-column>


        <el-table-column label="操作"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input placeholder="请输入数量"
              v-model="scope.row.num">
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background
          layout="total"
          :total="totalPage">
        </el-pagination>
      </div>
      <!-- dialog -->
      <el-dialog :title="'不平均分配优惠券数量'"
        :visible.sync="showDialog"
        :show-close="true"
        :close="handleDialogClose">
        <el-form ref="configForm"
          label-width="80px"
          :rules="formRules"
          :model="configParam">
          <el-form-item prop="distributionCount"
            label="数量：">
            <el-row>
              <el-input :style="{width: '80%'}"
                placeholder="请输入数量"
                v-model="configParam['distributionCount']">
              </el-input>
            </el-row>
            <el-row class="tips-row">
              <span class="tips-row tips">
                提示：输入数量需小于平均数量，平均数量为：{{configParam.averageCount}}。
              </span>
            </el-row>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button size="mini"
            @click="handleDialogClose">取消</el-button>
          <el-button type="primary"
            size="mini"
            @click="handleDialogCommit">确定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <div class="submit-button-wrap">
      <el-button :style="{ width:'150px' }"
        type="primary"
        @click="handleSubmit"
        :loading="btnLoading">确认</el-button>
    </div>
  </div>
</template>

<script>
import couponDistributionService from '../../service/coupon-distribution-service.js'
const NUM_PATTERN = /^\+?[1-9][0-9]*$/

export default {
  name: 'shopAdd',
  data() {
    const checkAllNum = (rule, value, callback) => {
      if (!NUM_PATTERN.test(value)) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      btnLoading: false,
      oddNum: 0,
      showDialog: false,
      totalPage: 0,
      configParam: {
        distributionCount: '',
        averageCount: ''
      },
      formRules: {
        distributionCount: {
          validator: checkAllNum,
          trigger: 'blur'
        }
      },
      pushResults: [],
      queryParam: {
        orgName: '',
        status: '',
        couponId: '',
        pageNum: 1,
        pageSize: 100 // 获取最大数量，不做分页加载
      }
    }
  },
  methods: {
    handleQueryOrg() {
      let param = this.queryParam
      let self = this
      this.loading = true
      couponDistributionService
        .getNewCouponOrgList(param)
        .then(rspData => {
          self.totalPage = rspData.data.total
          self.pushResults = rspData.data.results
          self.loading = false
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleDialogClose() {
      this.showDialog = false
    },
    handleAverageAction() {
      if (this.totalPage > 0) {
        let averageCount = parseInt(this.oddNum / this.totalPage)
        if (averageCount === 0) {
          averageCount = ''
          this.configParam.averageCount = ''
          this.$message({
            showClose: true,
            message: '剩余数量不足以平均分配！',
            type: 'warning'
          })
        } else {
          this.configParam.averageCount = averageCount

          let objArr = this.pushResults
          objArr.map((obj, index) => {
            obj.num = averageCount
          })
        }
      }
    },
    handleUnaverageAction() {
      this.showDialog = true
      let averageCount = parseInt(this.oddNum / this.totalPage)
      this.configParam.averageCount = averageCount
    },
    // 不平均分配弹出框
    handleDialogCommit() {
      if (this.configParam.distributionCount > this.configParam.averageCount) {
        this.$message({
          showClose: true,
          message: '剩余数量不足以平均分配！',
          type: 'warning'
        })
      } else {
        let averageCount = this.configParam.distributionCount
        let objArr = this.pushResults
        objArr.map((obj, index) => {
          obj.num = averageCount
        })
        this.showDialog = false
      }
    },
    handleSubmit() {
      let allCount = 0
      let canRequest = true
      let param = this.pushResults
      let requestParam = []
      let nullFlagArr = []
      param.map((obj, index) => {
        if (obj.num === '' || obj.num === null) {
          return
        } else if (obj.num === '0' || obj.num === 0) {
          nullFlagArr.push(0)
        } else {
          if (!NUM_PATTERN.test(obj.num)) {
            canRequest = false
          } else {
            nullFlagArr.push(1)
            requestParam.push(obj)
            allCount = allCount + parseInt(obj.num)
          }
        }
      })
      if (nullFlagArr.indexOf(1) < 0 || nullFlagArr.indexOf(0) > -1) {
        canRequest = false
      }
      if (!canRequest || !requestParam.length) {
        this.$message({
          showClose: true,
          message: '请输入正确的数量！',
          type: 'error'
        })
      } else {
        if (allCount > parseInt(this.oddNum)) {
          this.$message({
            showClose: true,
            message: '总数量大于可分配数量',
            type: 'error'
          })
        } else {
          let self = this
          this.btnLoading = true
          couponDistributionService
            .saveCouponList(requestParam)
            .then(resp => {
              self.oddNum = resp.data
              if (resp) {
                self.btnLoading = false
                self.$message({
                  showClose: true,
                  message: '铺货分配成功！',
                  type: 'success'
                })
                self.$router.go(-2)
              }
            })
            .catch(e => {
              self.btnLoading = false
            })
        }
      }
    }
  },
  mounted() {
    this.oddNum = this.$route.query.oddNum
    this.queryParam.status = this.$route.query.status
    this.queryParam.couponId = this.$route.query.couponId
    this.handleQueryOrg()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.count-label {
  font-weight: bold;
}
.tips-row {
  line-height: 20px;
  font-weight: bold;
  .tips {
    font-size: 13px;
    color: gray;
  }
}
</style>

