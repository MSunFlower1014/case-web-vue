<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row class="box-card-title">
        <span>基本信息</span>
      </el-row>
      <el-row class="formLine"
        :gutter="20">
        <el-col :span="4"
          class="title">
          <span>名称：</span>
        </el-col>
        <el-col :span="20"
          class="desc">
          <span>{{basicInfoForm.couponName}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine"
        :gutter="20">
        <el-col :span="4"
          class="title">
          <span>面额：</span>
        </el-col>
        <el-col :span="20"
          class="desc">
          <span>{{basicInfoForm.denomination + unitTypes[basicInfoForm.unitType]}}</span>
        </el-col>
      </el-row>
      <!-- <el-row class="formLine"
        :gutter="20">
        <el-col :span="4"
          class="title">
          <span>图片：</span>
        </el-col>
        <el-col :span="20">
          <div class="picBox"
            v-if="basicInfoForm.couponImg!== ''">
            <img :src="picUrlPrefix+basicInfoForm.couponImg"
              alt="">
          </div>
          <span v-else>该优惠券暂无图标</span>
        </el-col>
      </el-row> -->
      <el-row class="formLine"
        :gutter="20">
        <el-col :span="4"
          class="title">
          <span>描述：</span>
        </el-col>
        <el-col :span="20"
          class="desc">
          <span>{{basicInfoForm.couponDesc}}</span>
        </el-col>
      </el-row>
    </el-card>
    <!-- 发放规则 -->
    <el-card class="box-card">
      <el-row class="box-card-title">
        <span>发放规则</span>
      </el-row>

      <el-form ref="sendRuleForm"
        :label-position="'right'"
        :model="sendRuleForm"
        :rules="rules"
        :disabled="editStatus === 0 || editStatus === '0'"
        style="width:86%; margin: 0 auto;">
        <el-row v-if="sendRuleForm.sendType === '1' || sendRuleForm.sendType === 1">
          <el-col :span="12">
            <el-form-item label="发放总量"
              prop="allNumLimit"
              label-width="20%">
              <el-radio v-model="totalGrant"
                label="limitless"
                :disabled="editNumFlag"
                @change="numUnlimit('allNumLimit')">不限量</el-radio>
              <el-radio v-model="totalGrant"
                :disabled="editNumFlag"
                @change="numLimit('allNumLimit')"
                label="limit">限量</el-radio>
              <el-input placeholder="请输入优惠券发放总数"
                v-show="totalGrant==='limit'"
                class="dib wid_45"
                v-model="sendRuleForm.allNumLimit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="sendRuleForm.sendType === '1'">
          <el-col :span="12">
            <el-form-item label="每月发放量"
              prop="mouthNumLimit"
              label-width="20%">
              <el-radio v-model="monthGrant"
                label="limitless"
                :disabled="editNumFlag"
                @change="numUnlimit('mouthNumLimit')">不限量</el-radio>
              <el-radio v-model="monthGrant"
                :disabled="editNumFlag"
                @change="numLimit('mouthNumLimit')"
                label="limit">限量</el-radio>
              <el-input placeholder="请输入优惠券每月发放总数"
                v-show="monthGrant==='limit'"
                class="dib wid_45"
                v-model="sendRuleForm.mouthNumLimit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"
            v-if="monthGrant==='limit'">
            <el-form-item label="月二次分配方式"
              prop="mouthTwiceType"
              label-width="25%">
              <el-radio v-model="sendRuleForm.mouthTwiceType"
                :disabled="editNumFlag"
                label="0">当月清零</el-radio>
              <el-radio v-model="sendRuleForm.mouthTwiceType"
                :disabled="editNumFlag"
                label="1">累积至次月</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="sendRuleForm.sendType === '1'">
          <el-col :span="12">
            <el-form-item label="每周发放量"
              prop="weekNumLimit"
              label-width="20%">
              <el-radio v-model="weekGrant"
                label="limitless"
                :disabled="editNumFlag"
                @change="numUnlimit('weekNumLimit')">不限量</el-radio>
              <el-radio v-model="weekGrant"
                :disabled="editNumFlag"
                @change="numLimit('weekNumLimit')"
                label="limit">限量</el-radio>
              <el-input placeholder="请输入优惠券每周发放总数"
                v-show="weekGrant==='limit'"
                class="dib wid_45"
                v-model="sendRuleForm.weekNumLimit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"
            v-if="weekGrant==='limit'">
            <el-form-item label="周二次分配方式"
              prop="weekTwiceType"
              label-width="25%">
              <el-radio v-model="sendRuleForm.weekTwiceType"
                :disabled="editNumFlag"
                label="0">当周清零</el-radio>
              <el-radio v-model="sendRuleForm.weekTwiceType"
                :disabled="editNumFlag"
                label="1">累积至次周</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="sendRuleForm.sendType === '1'">
          <el-col :span="12">
            <el-form-item label="每日发放量"
              prop="dayNumLimit"
              label-width="20%">
              <el-radio v-model="dayGrant"
                label="limitless"
                :disabled="editNumFlag"
                @change="numUnlimit('dayNumLimit')">不限量</el-radio>
              <el-radio v-model="dayGrant"
                :disabled="editNumFlag"
                @change="numLimit('dayNumLimit')"
                label="limit">限量</el-radio>
              <el-input placeholder="请输入优惠券每日发放总数"
                v-show="dayGrant==='limit'"
                class="dib wid_45"
                v-model="sendRuleForm.dayNumLimit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"
            v-if="dayGrant==='limit'">
            <el-form-item label="日二次分配方式"
              prop="dayTwiceType"
              label-width="25%">
              <el-radio v-model="sendRuleForm.dayTwiceType"
                :disabled="editNumFlag"
                label="0">当日清零</el-radio>
              <el-radio v-model="sendRuleForm.dayTwiceType"
                :disabled="editNumFlag"
                label="1">累积至次日</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="限时发放"
            prop="dateLimit"
            label-width="10%">
            <div>
              <el-radio v-model="grantTimes"
                :disabled="editNumFlag"
                @change="timeUnlimit"
                label="limitless">不限 </el-radio>
            </div>
            <div class="dib fl">
              <el-radio v-model="grantTimes"
                :disabled="editNumFlag"
                label="limit">限定</el-radio>
            </div>
            <div v-if="grantTimes==='limit'"
              class="dib"
              style=" width:70%;margin:0 0 0 20px;">
              <el-checkbox-group v-model="grantTimeTypes"
                :disabled="editNumFlag">
                <el-row>
                  <el-checkbox label="限定日期"></el-checkbox>
                  <el-date-picker v-model="grantDate"
                    type="daterange"
                    size="small"
                    @change="dateChange"
                    value-format="yyyy-MM-dd"
                    range-separator="-"
                    start-placeholder="起始日期"
                    end-placeholder="结束日期"
                    :picker-options="{disabledDate: rangeDateFunc}"
                    :disabled="grantTimeTypes.indexOf('限定日期')<0 || editNumFlag"
                    class="mgrl_1">
                  </el-date-picker>
                </el-row>
                <el-row>
                  <el-checkbox label="限定星期"></el-checkbox>
                  <el-checkbox-group v-model="grantWeek"
                    class="dib mgrl_1"
                    @change="weekChange"
                    :disabled="grantTimeTypes.indexOf('限定星期')<0 || editNumFlag">
                    <el-checkbox label="1">周一</el-checkbox>
                    <el-checkbox label="2">周二</el-checkbox>
                    <el-checkbox label="3">周三</el-checkbox>
                    <el-checkbox label="4">周四</el-checkbox>
                    <el-checkbox label="5">周五</el-checkbox>
                    <el-checkbox label="6">周六</el-checkbox>
                    <el-checkbox label="7">周日</el-checkbox>
                  </el-checkbox-group>
                </el-row>
                <el-row>
                  <el-checkbox label="限定时段"></el-checkbox>
                  <el-time-picker v-model="grantTime"
                    is-range
                    @change="timeChange"
                    size="small"
                    :picker-options="{
      selectableRange: '00:00:00 - 23:59:00'
    }"
                    value-format="HH:mm:ss"
                    range-separator="-"
                    start-placeholder="起始时段"
                    end-placeholder="结束时段"
                    :disabled="grantTimeTypes.indexOf('限定时段')<0 || editNumFlag"
                    class="mgrl_1">
                  </el-time-picker>
                </el-row>
              </el-checkbox-group>
            </div>
          </el-form-item>
        </el-row>
        <el-row v-if="channelCode===''">
          <el-form-item label="发放平台"
            prop="sendChannel"
            label-width="10%">
            <el-checkbox-group v-model="grantChannel"
              :disabled="editNumFlag"
              class="dib">
              <el-checkbox v-for="item in channelList"
                :label="item.channelCode"
                :key="item.channelCode">{{item.channelName}}</el-checkbox>
            </el-checkbox-group>
            <el-table :data="grantChannelTableData"
              border
              stripe
              fit
              class="result-table"
              :header-cell-class-name="'table-head-th'"
              v-if="isChannelTableShow">
              <el-table-column label="渠道名称"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.channelName}}
                </template>
              </el-table-column>
              <el-table-column label="发行量"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input style="width: 50%"
                    v-model="scope.row.percent"></el-input>%
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="发放地市"
            show-overflow-tooltip
            prop="sendArea"
            label-width="10%">
            <el-checkbox :indeterminate="isIndeterminate"
              v-model="checkAll"
              :disabled="editNumFlag"
              @change="handleCheckAllChange">全市</el-checkbox>
            <el-checkbox-group v-model="grantAreas"
              @change="areaChange"
              :disabled="editNumFlag"
              class="dib mgrl_1">
              <el-checkbox v-for="item in areaList"
                :label="item.areaCode"
                :key="item.areaCode">{{item.areaName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <!--<el-row>-->
          <!--<el-form-item label="发放人群"-->
            <!--show-overflow-tooltip-->
            <!--prop="targetUser"-->
            <!--label-width="10%">-->
            <!--<el-button class="addBtn fa fa-plus fa-lg"-->
              <!--size="mini"-->
              <!--:disabled="editNumFlag"-->
              <!--@click="showTargetDialog"></el-button>-->
            <!--<el-table :data="sendRuleForm.targetUserList"-->
              <!--border-->
              <!--class="result-table"-->
              <!--:header-cell-class-name="'table-head-th'"-->
              <!--v-if="isTargetTableShow">-->
              <!--<el-table-column prop="ruleName"-->
                <!--label="规则名称"></el-table-column>-->
              <!--<el-table-column label="操作">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-button @click.native.prevent="deleteRow(scope.$index, sendRuleForm.targetUserList)"-->
                    <!--type="text"-->
                    <!--title="删除"-->
                    <!--:disabled="editNumFlag">-->
                    <!--<i class="fa fa-trash-o fa-lg funcBtn"></i>-->
                  <!--</el-button>-->
                <!--</template>-->
              <!--</el-table-column>-->
            <!--</el-table>-->
          <!--</el-form-item>-->
        <!--</el-row>-->
      </el-form>
    </el-card>

    <div class="submit-button-wrap">
      <el-button type="primary"
        @click="handleSubmit" :loading="btnLoading" class="submit_btn">提交</el-button>
    </div>

    <!-- 使用规则-商品范围-限定商品 -->
    <el-dialog :title="targetDialogTitle"
      :visible.sync="targetDialogShow"
      :before-close="handleTargetDialogClose"
      lock-scroll
      custom-class="scroll-dialog"
      width="80%">
      <target-form ref="targetForm"
        @after-edit="afterEditTarget">
      </target-form>
      <template slot="footer">
        <el-button size="mini"
          @click="handleTargetReturn">取消</el-button>
        <el-button size="mini"
          type="primary"
          @click="handleTargetSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import couponService from '../../service/coupon-service.js'
import sendRuleService from '../../service/send-rule-service.js'
import areaService from '../../service/area-service.js'
const PIC_URL_PREFIX = 'https://www.nimitz.org.cn/uploadFile/couponMaterialFile'
const NUM_PATTERN = /^\+?[1-9][0-9]*$/
import targetForm from './targetForm.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    targetForm
  },
  name: 'grantPersonal',
  data() {
    const checkAllNum = (rule, value, callback) => {
      if (!this.totalGrant) {
        callback(new Error('请选择发放总量限定方式'))
      } else if (!value && this.totalGrant !== 'limitless') {
        callback(new Error('请输入优惠券发放总数'))
      } else if (value !== -1 && this.totalGrant !== 'limitless') {
        if (!NUM_PATTERN.test(value)) {
          callback(new Error('请输入正整数'))
        }
        if (!(value <= this.oddNum)) {
          callback(new Error('发放总数应小于等于可发放量'))
        }
        callback()
      } else {
        callback()
      }
    }
    const checkMonthNum = (rule, value, callback) => {
      if (!this.monthGrant) {
        callback(new Error('请选择每月发放量限定方式'))
      } else if (!value && this.monthGrant !== 'limitless') {
        callback(new Error('请输入优惠券每月发放总数'))
      } else if (value !== -1 && this.monthGrant !== 'limitless') {
        if (!NUM_PATTERN.test(value)) {
          callback(new Error('请输入正整数'))
        }
        if (!(value <= this.oddNum)) {
          callback(new Error('每月发放量应小于等于可发放量'))
        }
        callback()
      } else {
        callback()
      }
    }
    const checkWeekNum = (rule, value, callback) => {
      if (!this.weekGrant) {
        callback(new Error('请选择每周发放量限定方式'))
      } else if (!value && this.weekGrant !== 'limitless') {
        callback(new Error('请输入优惠券每周发放总数'))
      } else if (value !== -1 && this.weekGrant !== 'limitless') {
        if (!NUM_PATTERN.test(value)) {
          callback(new Error('请输入正整数'))
        }
        if (!(value <= this.oddNum)) {
          callback(new Error('每周发放量应小于等于可发放量'))
        }
        callback()
      } else {
        callback()
      }
    }
    const checkDayNum = (rule, value, callback) => {
      if (!this.dayGrant) {
        callback(new Error('请选择每日发放量限定方式'))
      } else if (!value && this.dayGrant !== 'limitless') {
        callback(new Error('请输入优惠券每日发放总数'))
      } else if (value !== -1 && this.dayGrant !== 'limitless') {
        if (!NUM_PATTERN.test(value)) {
          callback(new Error('请输入正整数'))
        }
        if (!(value <= this.oddNum)) {
          callback(new Error('每日发放量应小于等于可发放量'))
        }
        callback()
      } else {
        callback()
      }
    }
    const checkTimeLimit = (rule, value, callback) => {
      if (!this.grantTimes) {
        callback(new Error('请选择是否限定'))
      } else if (this.grantTimes === 'limit' && !this.grantTimeTypes.length) {
        callback(new Error('请选择限时发放限定类型'))
      } else if (
        this.grantTimeTypes.indexOf('限定日期') > -1 &&
        !this.grantDate.length
      ) {
        callback(new Error('请选择限定日期'))
      } else if (
        this.grantTimeTypes.indexOf('限定星期') > -1 &&
        !this.grantWeek.length
      ) {
        callback(new Error('请选择限定星期'))
      } else if (
        this.grantTimeTypes.indexOf('限定时段') > -1 &&
        !this.grantTime.length
      ) {
        callback(new Error('请选择限定时段'))
      } else {
        callback()
      }
    }
    const checkSendChannel = (rule, value, callback) => {
      if (!this.grantChannel.length) {
        callback(new Error('请选择发放平台'))
      } else {
        callback()
      }
    }
    const checkSendArea = (rule, value, callback) => {
      if (!this.checkAll && !this.grantAreas.length) {
        callback(new Error('请选择发放地市'))
      } else {
        callback()
      }
    }
    return {
      btnLoading: false,
      picUrlPrefix: PIC_URL_PREFIX,
      couponId: '',
      status: null,
      oddNum: null,
      watchChannelFlag: false,
      editStatus: 1,
      editNumFlag: false,
      basicInfoForm: {
        couponName: '',
        denomination: '',
        couponImg: '',
        couponDesc: '',
        validTimeStr: ''
      },
      // 领取规则
      sendRuleForm: {
        couponId: '',
        oddNum: null,
        allNumLimit: '',
        dayNumLimit: '',
        weekNumLimit: '',
        mouthNumLimit: '',
        dayTwiceType: '',
        weekTwiceType: '',
        mouthTwiceType: '',
        dateLimit: '',
        weekLimit: '',
        timeLimit: '',
        sendChannel: null,
        sendArea: null,
        targetUser: '',
        sendChannelList: [],
        sendAreaList: [],
        targetUserList: [],
        sendType: ''
      },
      // 自定义
      totalGrant: '', // 发放总量
      dayGrant: '', // 每日发放量
      weekGrant: '', // 每周发放量
      monthGrant: '', // 每月发放量
      grantTimes: '', // 限时发放
      grantTimeTypes: [], // 限定类别
      grantDate: [], // 限定日期
      grantWeek: [], // 限定星期
      grantTime: [new Date(2018, 8, 28, 0, 0, 0), new Date(2018, 8, 28, 23, 59, 59)], // 限定时段
      grantChannel: [], // 发放平台
      channelList: [], // 平台选项列表
      grantChannelTableData: [], // 发放平台表格数据
      isIndeterminate: true, // 发放地市全选框
      checkAll: false, // 是否全选
      areaList: [], // 地市范围
      areaCodeArr: [], // 地市名称数组
      grantAreas: [], // 选中地市
      // 目标用户dialog
      targetDialogTitle: '', // 标题
      targetDialogShow: false, // 显隐
      sendChannelList: [],
      unitTypes: ['', '元', '角', '分', 'M', 'G', '分钟', '小时', '折'],
      // 表单校验
      rules: {
        allNumLimit: [
          { required: true, validator: checkAllNum, trigger: 'change' }
        ],
        dayNumLimit: [
          { required: true, validator: checkDayNum, trigger: 'change' }
        ],
        weekNumLimit: [
          { required: true, validator: checkWeekNum, trigger: 'change' }
        ],
        mouthNumLimit: [
          { required: true, validator: checkMonthNum, trigger: 'change' }
        ],
        dayTwiceType: [
          { required: true, message: '请选择日二次分配方式', trigger: 'change' }
        ],
        weekTwiceType: [
          { required: true, message: '请选择周二次分配方式', trigger: 'change' }
        ],
        mouthTwiceType: [
          { required: true, message: '请选择月二次分配方式', trigger: 'change' }
        ],
        dateLimit: [
          { required: true, validator: checkTimeLimit, trigger: 'blur' }
        ],
        sendChannel: [
          { required: true, validator: checkSendChannel, trigger: 'change' }
        ],
        sendArea: [
          { required: true, validator: checkSendArea, trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    // 发放平台 table
    isChannelTableShow: {
      get: function() {
        return this.grantChannel.length > 0
      }
    },
    // 目标人群 table
    isTargetTableShow: {
      get: function() {
        return (this.sendRuleForm.targetUserList || []).length > 0
      }
    },
    channelCode() {
      return Cookies.get('channelCode')
    }
  },
  methods: {
    queryBasicInfo() {
      let self = this
      let params = {
        id: this.couponId,
        status: this.status
      }
      couponService.getBasicByIdStatus(params).then(rsp => {
        self.basicInfoForm = Object.assign({}, rsp.data)
      })
    },
    querySendRule() {
      let self = this
      sendRuleService.querySendRuleById(this.couponId).then(rsp => {
        self.editStatus = rsp.data.editStatus
        console.log(self.editStatus)
        if (self.editStatus === 0 || self.editStatus === '0') {
          self.editNumFlag = true
        }
        // if (rsp.data.sendArea !== null) {
        self.sendRuleForm = Object.assign({}, rsp.data)
        // 将数值转化为视图
        self.data2visual()
        // }
        self.sendRuleForm.oddNum = self.oddNum
        // self.sendRuleForm.sendType = rsp.data.sendType
      })
    },
    data2visual() {
      // 发放总量
      if (this.sendRuleForm.allNumLimit) {
        this.totalGrant =
          this.sendRuleForm.allNumLimit === -1 ? 'limitless' : 'limit'
      }
      // 每日发放量
      if (this.sendRuleForm.dayNumLimit) {
        this.dayGrant =
          this.sendRuleForm.dayNumLimit === -1 ? 'limitless' : 'limit'
      }
      // 每周发放量
      if (this.sendRuleForm.weekNumLimit) {
        this.weekGrant =
          this.sendRuleForm.weekNumLimit === -1 ? 'limitless' : 'limit'
      }
      // 每月发放量
      if (this.sendRuleForm.mouthNumLimit) {
        this.monthGrant =
          this.sendRuleForm.mouthNumLimit === -1 ? 'limitless' : 'limit'
      }
      // 限时发放
      if (
        this.sendRuleForm.dateLimit ||
        this.sendRuleForm.weekLimit ||
        this.sendRuleForm.timeLimit
      ) {
        if (
          this.sendRuleForm.dateLimit === '-1' &&
          this.sendRuleForm.weekLimit === '-1' &&
          this.sendRuleForm.timeLimit === '-1'
        ) {
          this.grantTimes = 'limitless'
        } else {
          this.grantTimes = 'limit'
          if (
            this.sendRuleForm.dateLimit !== '-1' &&
            this.sendRuleForm.dateLimit
          ) {
            this.grantTimeTypes.push('限定日期')
            this.grantDate = this.sendRuleForm.dateLimit.split(',')
          }
          if (
            this.sendRuleForm.weekLimit !== '-1' &&
            this.sendRuleForm.weekLimit
          ) {
            this.grantTimeTypes.push('限定星期')
            this.grantWeek = this.sendRuleForm.weekLimit.split(',')
          }
          if (
            this.sendRuleForm.timeLimit !== '-1' &&
            this.sendRuleForm.timeLimit
          ) {
            this.grantTimeTypes.push('限定时段')
            this.grantTime = this.sendRuleForm.timeLimit.split(',')
          }
        }
      }

      // 发放平台
      if (this.sendRuleForm.sendChannelList) {
        this.grantChannelTableData = this.sendRuleForm.sendChannelList.slice(0)
        this.str2arr()
      }
      // 发放地市  // 初始化查询时为 null 的校验问题
      if (this.sendRuleForm.sendArea && this.sendRuleForm.sendArea === '-1') {
        this.checkAll = true
        this.isIndeterminate = false
        this.grantAreas = this.areaCodeArr
      } else {
        if (this.sendRuleForm.sendArea) {
          this.grantAreas = this.sendRuleForm.sendArea.split(',')
        }
      }
    },
    visual2data() {
      // 发放渠道
      let strObj = {}
      this.grantChannelTableData.forEach(item => {
        let key = item.channelName
        strObj[key] = parseInt(item.percent)
      })
      this.sendRuleForm.sendChannel = this.obj2str(strObj)
    },
    obj2str(obj) {
      let result = JSON.stringify(obj)
      let arr = result
        .replace(/\"/g, '')
        .replace(/\}/g, '')
        .replace(/\{/g, '')
      return arr
    },
    str2arr() {
      let arr = this.sendRuleForm.sendChannel.split(',')
      arr.map(item => {
        // item 输出为： omo:12
        // 截取冒号前的字符串 作为channelName
        this.grantChannel.push(item.slice(0, item.indexOf(':')))
      })
    },
    // queryChannelInfo() {
    //   let self = this
    //   channelService.getLoginChannel().then(rspData => {
    //     self.channelList = rspData.data
    //   })
    // },
    queryAreas() {
      let self = this
      areaService.queryAllArea().then(rspData => {
        self.areaList = rspData.data
        self.areaList.map(item => {
          self.areaCodeArr.push(item.areaCode)
        })
      })
    },
    timeUnlimit(val) {
      if (val) {
        this.sendRuleForm.dateLimit = '-1'
        this.sendRuleForm.weekLimit = '-1'
        this.sendRuleForm.timeLimit = '-1'
        this.grantTimeTypes = []
      }
    },
    numUnlimit(val) {
      if (val) this.sendRuleForm[val] = -1
    },
    numLimit(val) {
      if (val) this.sendRuleForm[val] = null
    },
    dateChange(val) {
      this.sendRuleForm.dateLimit = val.length ? val.join(',') : '-1'
    },
    weekChange(val) {
      this.sendRuleForm.weekLimit = val.length ? val.join(',') : '-1'
    },
    timeChange(val) {
      this.sendRuleForm.timeLimit = val.length ? val.join(',') : '-1'
    },
    handleCheckAllChange(val) {
      this.sendRuleForm.sendArea = val ? '-1' : ''
      this.grantAreas = val ? this.areaCodeArr : []
      this.isIndeterminate = false
    },
    areaChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.areaCodeArr.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.areaCodeArr.length
      if (checkedCount) this.sendRuleForm.sendArea = value.join(',')
    },
    showTargetDialog() {
      this.targetDialogTitle = '选择目标用户'
      this.targetDialogShow = true
    },
    handleTargetDialogClose(done) {
      done()
    },
    handleTargetReturn() {
      this.$refs['targetForm'].handleReturn()
    },
    handleTargetSubmit() {
      this.$refs['targetForm'].handleSubmit()
    },
    afterEditTarget(arr) {
      this.sendRuleForm.targetUserList = arr
      this.targetDialogShow = false
      let ids = []
      arr.forEach(item => {
        ids.push(item.id)
      })
      this.sendRuleForm.targetUser = ids.join(',')
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    handleSubmit() {
      this.$refs.sendRuleForm.validate(valid => {
        if (valid) {
          this.handleSave()
        } else {
          return false
        }
      })
    },
    handleSave() {
      this.btnLoading = true
      this.visual2data()
      this.sendRuleForm.couponId = this.couponId
      let self = this
      sendRuleService
        .saveBatchRules(JSON.stringify(this.sendRuleForm))
        .then(response => {
          self.btnLoading = false
          self.$message({
            showClose: true,
            message: '批量发放规则编辑成功！',
            type: 'success'
          })
          self.$router.go(-1)
        })
        .catch(e => {
          this.btnLoading = false
        })
    },
    rangeDateFunc(date) {
      let validTimeStr = this.basicInfoForm.validTimeStr
      if (validTimeStr != null && validTimeStr.indexOf(',') >= 0) {
        let dateArr = validTimeStr.split(',')
        // let startDate = new Date(dateArr[0] + ' 00:00:00')
        let endDate = new Date(dateArr[1] + ' 23:59:59')
        // 此范围内的不允许选择
        if (date > endDate) {
          return true
        }
      }
      return false
    }
  },
  created() {},
  mounted() {
    this.couponId = this.$route.query.id
    this.status = this.$route.query.status
    this.oddNum = this.$route.query.oddNum
    this.queryBasicInfo()
    this.querySendRule()
    this.queryAreas()
  },
  watch: {
    grantChannel: {
      handler: function(val, oldVal) {
        // 页面初始化 不要做监听处理 因为val === oldVal
        if (this.watchChannelFlag) {
          let difference = val
            .filter(x => oldVal.indexOf(x) === -1)
            .concat(oldVal.filter(x => val.indexOf(x) === -1))
          difference = difference.join(',')
          if (val.indexOf(difference) > -1) {
            // 选中新项 push
            let obj = {}
            obj = {
              channelName: difference,
              percent: null
            }
            this.grantChannelTableData.push(obj)
          } else {
            // 取消旧项 delete
            let index = oldVal.indexOf(difference)
            this.grantChannelTableData.splice(index, 1)
          }
        }
        this.watchChannelFlag = true
      },
      deep: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box-card-title {
  font-size: 16px;
  color: #666;
  font-weight: bold;
  margin-bottom: 10px;
}
.row-content {
  margin-left: 50px;
}

.selfTable::before {
  background-color: #fff;
}
.row-table {
  margin-left: 40px;
}
.addBtn {
  background-color: #afb4b8;
  border: none;
  color: #fff;
  width: 65px;
}
.btn_group_wrap {
  width: 140px;
  margin: 0 auto;
  padding: auto;
}
</style>
