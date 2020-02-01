<template>
  <div>
    <el-form ref="receiveRuleForm"
      :label-position="'right'"
      :rules="editStatus === 0 || editStatus === '0' ? {} : rules"
      :disabled="editStatus === 0 || editStatus === '0'"
      :model="receiveRuleForm"
      v-loading="loading"
      element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="12">
          <el-form-item label="领取总量"
            prop="sumNum"
            label-width="20%">
            <el-radio v-model="totalReceive"
              label='limitless'
              @change="numUnlimit('sumNum')">不限量</el-radio>
            <el-radio v-model="totalReceive"
              @change="numLimit('sumNum')"
              label="limit">限量</el-radio>
            <el-input placeholder="请输入优惠券最高领取总量"
              v-show="totalReceive==='limit'"
              class="dib wid_45"
              v-model="receiveRuleForm.sumNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="每月领取量"
            prop="monthNum"
            label-width="20%">
            <el-radio v-model="monthReceive"
              label='limitless'
              @change="numUnlimit('monthNum')">不限量</el-radio>
            <el-radio v-model="monthReceive"
              @change="numLimit('monthNum')"
              label="limit">限量</el-radio>
            <el-input placeholder="请输入优惠券每月最高领取量"
              v-show="monthReceive==='limit'"
              class="dib wid_45"
              v-model="receiveRuleForm.monthNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="每周领取量"
            prop="weekNum"
            label-width="20%">
            <el-radio v-model="weekReceive"
              label='limitless'
              @change="numUnlimit('weekNum')">不限量</el-radio>
            <el-radio v-model="weekReceive"
              @change="numLimit('weekNum')"
              label="limit">限量</el-radio>
            <el-input placeholder="请输入优惠券每周最高领取量"
              v-show="weekReceive==='limit'"
              class="dib wid_45"
              v-model="receiveRuleForm.weekNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="每日领取量"
            prop="dayNum"
            label-width="20%">
            <el-radio v-model="dayReceive"
              label='limitless'
              @change="numUnlimit('dayNum')">不限量</el-radio>
            <el-radio v-model="dayReceive"
              @change="numLimit('dayNum')"
              label="limit">限量</el-radio>
            <el-input placeholder="请输入优惠券每日最高领取量"
              v-show="dayReceive==='limit'"
              class="dib wid_45"
              v-model="receiveRuleForm.dayNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
       <!-- <el-col :span="12">
          <el-form-item label="保有量"
            prop="inventory"
            label-width="20%">
            <el-radio v-model="reserve"
              label='limitless'
              @change="numUnlimit('inventory')">不限量</el-radio>
            <el-radio v-model="reserve"
              @change="numLimit('inventory')"
              label="limit">限量</el-radio>
            <el-input placeholder="请输入优惠券保有量"
              v-show="reserve==='limit'"
              class="dib wid_45"
              v-model="receiveRuleForm.inventory"></el-input>
          </el-form-item>
        </el-col>-->

        <!--<el-col :span="12">
          <el-form-item label="领取方式"
            prop="receiveWay"
            label-width="20%">
            <div>
              <el-radio v-model="receiveRuleForm.receiveWay"
                :label='0'>免费领取</el-radio>
            </div>
            <div>
              <el-radio v-model="receiveRuleForm.receiveWay"
                @change="numLimit('amount')"
                :label='1'>积分兑换</el-radio>
              <span class="mgrl_20"
                v-show="receiveRuleForm.receiveWay===1">兑换积分：</span>
              <el-input placeholder="请输入兑换积分值"
                class="dib wid_45"
                v-model="receiveRuleForm.amount"
                v-show="receiveRuleForm.receiveWay===1"></el-input>
            </div>
            <div>
              <el-radio v-model="receiveRuleForm.receiveWay"
                @change="numLimit('amount')"
                :label='2'>购买</el-radio>
              <span class="mgrl_20"
                v-show="receiveRuleForm.receiveWay===2">购买金额：</span>
              <el-input placeholder="请输入购买金额"
                class="dib wid_45"
                v-model="receiveRuleForm.amount"
                v-show="receiveRuleForm.receiveWay===2"></el-input>
              <span class="mgrl_1"
                v-show="receiveRuleForm.receiveWay===2">元</span>
            </div>
          </el-form-item>
        </el-col>-->
      </el-row>
    </el-form>
    <div class="submit-button-wrap">
      <!--<el-button type="primary"-->
        <!--@click="jump"-->
        <!--plain-->
        <!--v-if="userType !== '2'"-->
        <!--class="submit_btn">跳过</el-button>-->
      <el-button type="primary"
        @click="submit"
        class="submit_btn"
        :loading="btnLoading">下一步</el-button>
      <el-button class="submit_btn"
        @click="goBack">上一步</el-button>
    </div>
  </div>
</template>
<script>
import Bus from '@/assets/bus.js'
import Cookies from 'js-cookie'
import receiveRuleService from '../../service/receive-rule-service.js'
const NUM_PATTERN = /^\+?[1-9][0-9]*$/
export default {
  name: 'ReceiveRule',
  props: {
    codesFlag: {
      type: Object
    },
    editType: {
      type: String
    },
    status: {
      type: [Number, String]
    },
    couponNum: {
      type: [Number, String]
    },
    couponID: {
      type: String
    },
    active: {
      type: [Number, String]
    }
  },
  data() {
    // 领取总量 < list页面的 couponNum
    const checkSumNum = (rule, value, callback) => {
      if (!this.totalReceive) {
        callback(new Error('请选择领取总量限制类型'))
      } else if (!value && this.totalReceive !== 'limitless') {
        callback(new Error('请输入优惠券领取总量'))
      } else if (value !== -1 && this.totalReceive !== 'limitless') {
        if (!NUM_PATTERN.test(value)) {
          callback(new Error('请输入正整数'))
        }
        if (!(parseInt(value) <= (this.couponNUM || this.couponNum))) {
          callback(new Error('领取总量应小于等于优惠券总量'))
        }
        callback()
      } else {
        callback()
      }
    }
    const checkMonthNum = (rule, value, callback) => {
      if (!this.monthReceive) {
        callback(new Error('请选择每月领取量限制类型'))
      } else if (!value && this.monthReceive !== 'limitless') {
        callback(new Error('请输入优惠券每月最高领取量'))
      } else if (value !== -1 && this.monthReceive !== 'limitless') {
        if (!NUM_PATTERN.test(value)) {
          callback(new Error('请输入正整数'))
        }
        if (this.receiveRuleForm.sumNum === -1) {
          if (!(parseInt(value) <= (this.couponNUM || this.couponNum))) {
            callback(new Error('每月领取量应小于等于优惠券总量'))
          } else {
            callback()
          }
        } else {
          if (!(parseInt(value) <= parseInt(this.receiveRuleForm.sumNum))) {
            callback(new Error('每月领取量应小于等于最高领取总量'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    }
    const checkWeekNum = (rule, value, callback) => {
      if (!this.weekReceive) {
        callback(new Error('请选择每周领取量限制类型'))
      } else if (!value && this.weekReceive !== 'limitless') {
        callback(new Error('请输入优惠券每周最高领取量'))
      } else if (value !== -1 && this.weekReceive !== 'limitless') {
        if (!NUM_PATTERN.test(value)) {
          callback(new Error('请输入正整数'))
        }
        if (this.receiveRuleForm.sumNum === -1) {
          if (!(parseInt(value) <= (this.couponNUM || this.couponNum))) {
            callback(new Error('每周领取量应小于等于优惠券总量'))
          } else {
            callback()
          }
        } else {
          if (!(parseInt(value) <= parseInt(this.receiveRuleForm.sumNum))) {
            callback(new Error('每周领取量应小于等于最高领取总量'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    }
    const checkDayNum = (rule, value, callback) => {
      if (!this.dayReceive) {
        callback(new Error('请选择每日领取量限制类型'))
      } else if (!value && this.dayReceive !== 'limitless') {
        callback(new Error('请输入优惠券每日最高领取量'))
      } else if (value !== -1 && this.dayReceive !== 'limitless') {
        if (!NUM_PATTERN.test(value)) {
          callback(new Error('请输入正整数'))
        }
        if (this.receiveRuleForm.sumNum === -1) {
          if (!(parseInt(value) <= (this.couponNUM || this.couponNum))) {
            callback(new Error('每日领取量应小于等于优惠券总量'))
          } else {
            callback()
          }
        } else {
          if (!(parseInt(value) <= parseInt(this.receiveRuleForm.sumNum))) {
            callback(new Error('每日领取量应小于等于最高领取总量'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    }
    return {
      loading: false,
      btnLoading: false,
      action: '',
      editStatus: 1,
      receiveRuleStatus: false,
      couponNUM: this.couponNum,
      // 领取规则
      receiveRuleForm: {
        remarks: '',
        couponId: '',
        dayNum: '-1',
        weekNum: '-1',
        monthNum: '-1',
        sumNum: '-1',
        receiveWay: null,
        amount: null,
        inventory: null, // 保有量
        organizationId: ''
      },
      checked: true,
      payWay: '',
      totalReceive: 'limitless', // 总领取数量
      dayReceive: 'limitless', // 每日取数量
      weekReceive: 'limitless', // 每周取数量
      monthReceive: 'limitless', // 每月取数量
      reserve: '', // 保有量
      receiveType: '', // 领取方式
      paidReceiveTypes: [], // 有偿领取方式
      // 表单校验
      rules: {
        sumNum: [{ required: true, validator: checkSumNum, trigger: 'change' }],
        dayNum: [{ required: true, validator: checkDayNum, trigger: 'change' }],
        weekNum: [
          { required: true, validator: checkWeekNum, trigger: 'change' }
        ],
        monthNum: [
          { required: true, validator: checkMonthNum, trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    userType() {
      return Cookies.get('userType')
    }
  },
  methods: {
    getCouponId() {
      let self = this
      Bus.$on('getCouponId', data => {
        self.receiveRuleForm.couponId = data
      })
    },
    getCouponNum() {
      let self = this
      Bus.$on('getCouponNum', num => {
        self.couponNUM = num
      })
    },
    queryReceiveRule() {
      let self = this
      let params = {
        couponId: this.couponID,
        status: parseInt(this.status)
      }
      this.loading = true
      receiveRuleService
        .getReceiveByIdStatus(params)
        .then(rsp => {
          self.loading = false
          self.editStatus = rsp.data.editStatus
          if (rsp.data.id !== null) {
            self.receiveRuleStatus = true
            self.receiveRuleForm = Object.assign({}, rsp.data)
            // 编辑状态页面值的匹配
            self.totalReceive =
              self.receiveRuleForm.sumNum !== -1 ? 'limit' : 'limitless'
            self.dayReceive =
              self.receiveRuleForm.dayNum !== -1 ? 'limit' : 'limitless'
            self.weekReceive =
              self.receiveRuleForm.weekNum !== -1 ? 'limit' : 'limitless'
            self.monthReceive =
              self.receiveRuleForm.monthNum !== -1 ? 'limit' : 'limitless'
          } else {
            self.receiveRuleForm.couponId = self.couponID
          }
        })
        .catch(e => {
          self.loading = false
        })
    },
    goBack() {
      this.$emit('previous')
      localStorage.setItem('back2basicInfo', 'false')
      if (this.action === 'add') {
        localStorage.setItem('back2basicInfo', 'true')
      }
    },
    jump() {
      this.$emit('change-flag2')
    },
    submit() {
      if (this.editStatus === 0 || this.editStatus === '0') {
        this.$emit('change-flag2')
      } else {
        this.$refs.receiveRuleForm.validate(valid => {
          if (valid) {
            this.action === 'modify' && this.receiveRuleStatus
              ? this.handleModify()
              : this.handleAdd()
          } else {
            return false
          }
        })
      }
    },
    handleModify() {
      let self = this
      this.receiveRuleForm.couponId = this.couponID
      this.btnLoading = true
      receiveRuleService
        .updateRuleByCouponId(this.receiveRuleForm)
        .then(response => {
          self.btnLoading = false
          self.$message({
            showClose: true,
            message: '领取规则修改成功！',
            type: 'success'
          })
          self.$emit('change-flag2')
        })
        .catch(e => {
          self.btnLoading = false
        })
    },
    handleAdd() {
      let self = this
      this.btnLoading = true
      receiveRuleService
        .addReceiveRule(this.receiveRuleForm)
        .then(response => {
          self.btnLoading = false
          self.$message({
            showClose: true,
            message: '领取规则添加成功！',
            type: 'success'
          })
          self.$emit('change-flag2')
        })
        .catch(e => {
          self.btnLoading = false
        })
    },
    numUnlimit(val) {
      if (val) this.receiveRuleForm[val] = -1
    },
    numLimit(val) {
      if (val) this.receiveRuleForm[val] = null
    }
  },
  mounted() {
    this.action = this.editType
  },
  created() {},
  watch: {
    action: {
      handler: function(val, oldVal) {
        if (this.action === 'modify') {
          this.getCouponNum()
        } else {
          this.getCouponId() // 新增时，接收新增优惠券基础信息时传过来的couponId
          this.getCouponNum()
        }
      }
    },
    active: {
      handler: function(val, oldVal) {
        if ((val === 1 || val === '1') && this.action === 'modify') {
          this.queryReceiveRule()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
