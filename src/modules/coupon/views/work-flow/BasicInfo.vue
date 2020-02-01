<template>
  <div>
    <el-form ref="basicInfoForm"
      :label-position="'right'"
      :rules="editStatus === 0 || editStatus === '0' ? onlyCouponNumRules : rules"
      :model="basicInfoForm"
      v-loading="loading"
      element-loading-text="拼命加载中">
      <el-form-item label="名称"
        prop="couponName"
        label-width="10%">
        <el-input v-model="basicInfoForm.name"
          :disabled="editStatus === 0 || editStatus === '0'"
          placeholder="请输入优惠券名称"></el-input>
      </el-form-item>
    
      <!-- 4满减券 5满折券 9膨胀券 面额/折扣+使用门槛/膨胀系数+单位+数量 -->
      <el-row >
        <el-col :span="6"
          v-if="categoryCode==4||categoryCode===9">
          <el-form-item label="面额"
            prop="denomination"
            label-width="40%">
            <el-input v-model="basicInfoForm.patientName"
              
              placeholder="请输入优惠券面额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"
          v-if="categoryCode===5">
          <el-form-item label="折扣"
            prop="denomination"
            label-width="40%">
            <el-input v-model="basicInfoForm.patientAge"
              :disabled="editStatus === 0 || editStatus === '0'"
              placeholder="请输入小于100的折扣"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"
          v-if="categoryCode==4||categoryCode===5">
          <el-form-item label="使用门槛"
            prop="useLimit"
            label-width="40%">
            <el-input v-model="basicInfoForm.patientSex"
              :disabled="editStatus === 0 || editStatus === '0'"
              placeholder="请输入金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"
          v-if="categoryCode===9">
          <el-form-item label="膨胀系数"
            prop="swellFactor"
            label-width="40%">
            <el-input v-model="basicInfoForm.patientMobile"
              :disabled="editStatus === 0 || editStatus === '0'"
              placeholder="请输入系数"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="数量"
            prop="hospital"
            label-width="40%">
            <el-input v-model="basicInfoForm.hospital"
              :disabled="quantityStatus === 2"
              placeholder="请输入数量"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 跳转链接 -->
      <el-form-item :span="6" label="跳转链接"
                    prop="couponLink"
                    label-width="10%">
        <el-input v-model="basicInfoForm.couponLink"
                  :disabled="quantityStatus === 2"
                  placeholder="请输入跳转链接"></el-input>
      </el-form-item>

      <!-- 使用说明 -->
      <el-form-item label="使用说明"
                    prop="message"
                    label-width="10%">
        <el-input v-model="basicInfoForm.message"
                  :disabled="quantityStatus === 2"
                  placeholder="请输入使用说明"></el-input>
      </el-form-item>

      <!-- 短信模板 -->
      <el-form-item label="短信模板"
                    prop="couponGetMsg"
                    label-width="10%">
        <el-input type="textarea"
                  title="模板参数说明：$1表示卡券名称，$2表示生效时间，$3表示结束时间。内容为空则不发送"
                  v-model="basicInfoForm.couponGetMsg"
                  :disabled="quantityStatus === 2"
                  placeholder="短信模板，模板参数说明：$1表示卡券名称，$2表示生效时间，$3表示结束时间。内容为空则不发送"></el-input>
      </el-form-item>
     
      <el-form-item label="说明"
        prop="couponDesc"
        label-width="10%">
        <el-input type="textarea"
          :rows="5"
          :disabled="editStatus === 0 || editStatus === '0'"
          v-model="basicInfoForm.couponDesc"></el-input>
      </el-form-item>
      <el-form-item label="热点宣传"
        prop="hotDesc"
        label-width="10%">
        <el-input v-model="basicInfoForm.hotDesc"
          :disabled="editStatus === 0 || editStatus === '0'"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发放方式"
            prop="sendType"
            label-width="20%">
            <el-radio v-model="basicInfoForm.sendType"
                      label="1">直接发放</el-radio>
            <!--<el-radio v-model="basicInfoForm.sendType"
                      label="2">铺货发放</el-radio>-->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="submit-button-wrap">
      <el-button type="primary"
        @click="handleAdd"
        class="submit_btn"
        :loading="btnLoading">下一步</el-button>
    </div>
  </div>
</template>
<script>
import Bus from '@/assets/bus.js'
import couponService from '../../service/coupon-service.js'
const NUM_PATTERN = /^\+?[1-9][0-9]*$/
const DOUBLE_PATTERN = /^([1-9]\d*|0)(\.\d{1,2})?$/
export default {
  name: 'BasicInfo',
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
    },
    couponLink: {
      type: [Number, String]
    },
    couponUseDesc: {
      type: [Number, String]
    },
    couponGetMsg: {
      type: String
    }
  },
  data() {
    const checkDenomination = (rule, value, callback) => {
      if (this.categoryCode === 5 || this.categoryCode === 7) {
        // >0 && <100 整数
        if (!NUM_PATTERN.test(value)) {
          callback(new Error('请输入正整数'))
        } else {
          if (value <= 0 || value >= 100) {
            callback(new Error('折扣应大于0且小于100'))
          } else {
            callback()
          }
        }
      } else {
        if (!NUM_PATTERN.test(value)) {
          callback(new Error('请输入正整数'))
        } else {
          if (value.toString().length > 4) {
            callback(new Error('面额不超过四位数'))
          }
          callback()
        }
      }
    }
    const check5Num = (rule, value, callback) => {
      if (!NUM_PATTERN.test(value)) {
        callback(new Error('请输入正整数'))
      } else {
        if (value.toString().length > 5) {
          callback(new Error('不得超过五位数'))
        }
        callback()
      }
    }
    const checkCouponNum = (rule, value, callback) => {
      if (!NUM_PATTERN.test(value)) {
        callback(new Error('请输入正整数'))
      } else {
        if (value.toString().length > 9) {
          callback(new Error('不得超过九位数'))
        } else if (this.quantityStatus !== null) {
          if (this.quantityStatus === 0) {
            callback()
          } else if (this.quantityStatus === 1) {
            if (!(value >= this.oldCouponNum)) {
              callback(new Error('优惠券数量应大于等于原数量！'))
            } else {
              callback()
            }
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
    }
    const checkSwellFactor = (rule, value, callback) => {
      if (!DOUBLE_PATTERN.test(value)) {
        callback(new Error('请输入正整数或两位以内的小数'))
      } else {
        if (value.toString().length > 5) {
          callback(new Error('不得超过五位数（小数点占一位）'))
        }
        callback()
      }
    }
    return {
      loading: false,
      btnLoading: false,
      action: '',
      editStatus: 1,
      /** quantityStatus
       * 0 不限制输入数量 1：比之前大 2：不可编辑
       */
      quantityStatus: null,
      oldCouponNum: null, // 二次编辑时的原数量
      couponCategories: [],
      emitCouponId: '', // 下一步返回上一步 带回来的couponId
      // 基本信息
      basicInfoForm: {
        id: '',
        name: '',
        patientName: '',
        patientAge: '',
        patientSex: '',
        patientMobile: '',
        hospital: '',
        message: '',
        type: '',
        status: ''
      },
      timeUnits: [
        {
          label: '分',
          value: 6
        },
        {
          label: '时',
          value: 7
        }
      ],
      flowUnits: [
        {
          label: 'M',
          value: 4
        },
        {
          label: 'G',
          value: 5
        }
      ],
      multiUnits: [
        {
          label: '元',
          value: 1
        },
        {
          label: '角',
          value: 2
        },
        {
          label: '分',
          value: 3
        }
      ],
      yuanUnit: [
        {
          label: '元',
          value: 1
        }
      ],
      countUnit: [
        {
          label: '折',
          value: 8
        }
      ],
      iconModifyFlag: false, // 编辑状态时，附件是否被修改过
      isShowPic: false, // 是否有图片
      iconFileUrl: '', // 附件地址
      iconFileName: '', // 附件名称
      formatArr: ['.jpg', '.png', '.gif'], // 图片格式
      // 表单校验
      rules: {
        couponName: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' },
          { max: 100, message: '长度不超过 100 个字符', trigger: 'blur' }
        ],
        denomination: [
          {
            required: true,
            message:
              this.categoryCode !== '5' && this.categoryCode !== '7'
                ? '请输入优惠券面额'
                : '请输入折扣',
            trigger: 'blur'
          },
          {
            validator: checkDenomination,
            trigger: 'blur'
          }
        ],
        unitType: [
          { required: true, message: '请选择单位', trigger: 'change' }
        ],
        serviceCode: [
          { required: true, message: '请输入策划编码', trigger: 'change' },
          { max: 32, message: '长度不超过 32 个字符', trigger: 'blur' }
        ],
        swellFactor: [
          { required: true, message: '请输入系数', trigger: 'blur' },
          { validator: checkSwellFactor, trigger: 'blur' }
        ],
        useLimit: [
          { required: true, message: '请输入金额', trigger: 'change' },
          { validator: check5Num, trigger: 'blur' }
        ],
        couponNum: [
          { required: true, message: '请输入数量', trigger: 'blur' },
          { validator: checkCouponNum, trigger: 'blur' }
        ],
        couponDesc: [
          { required: false, message: '请输入优惠券描述', trigger: 'blur' },
          { max: 1000, message: '长度不超过 1000 个字符', trigger: 'blur' }
        ],
        hotDesc: [
          { required: false, message: '请输入热点宣传', trigger: 'blur' },
          { max: 22, message: '长度不超过 22 个字符', trigger: 'blur' }
        ],
        couponGetMsg: [
          { max: 140, message: '长度不超过 140 个字符', trigger: 'blur' }
        ]
      },
      onlyCouponNumRules: {
        couponNum: [
          { required: true, message: '请输入数量', trigger: 'blur' },
          { validator: checkCouponNum, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    categoryCode() {
      let code = ''
      if (
        localStorage.getItem('codesFlag') &&
        JSON.parse(localStorage.getItem('codesFlag')).categoryCode !== null
      ) {
        code =
          this.codesFlag.categoryCode ||
          JSON.parse(localStorage.getItem('codesFlag')).categoryCode
      } else {
        code = this.codesFlag.categoryCode
      }
      return code
    }
  },
  methods: {
    queryBasicInfo() {
      let self = this
      let queryID = this.couponID || this.emitCouponId
      let params = {
        id: queryID,
        status: this.status === undefined ? -1 : parseInt(this.status)
      }
      this.loading = true
      couponService
        .getBasicByIdStatus(params)
        .then(rsp => {
          self.loading = false
          self.editStatus = rsp.data.editStatus
          self.quantityStatus = rsp.data.quantityStatus
          if (self.quantityStatus === 1) {
            self.oldCouponNum = rsp.data.couponNum
          }
          self.basicInfoForm = Object.assign({}, rsp.data)
          console.log(self.basicInfoForm)
          self.isShowPic = rsp.data.couponImg !== ''
          self.iconFileUrl = self.isShowPic
            ? self.picUrlPrefix + rsp.data.couponImg
            : ''
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleAdd() {
      let self = this
      let formData = new FormData()
      formData.append('coupon', JSON.stringify(this.basicInfoForm))
      if (this.basicInfoForm.couponImg !== '') {
        formData.append('iconFile ', this.basicInfoForm.couponImg)
      }
      this.btnLoading = true
      couponService
        .addData(formData)
        .then(response => {
          self.btnLoading = false
          self.$message({
            showClose: true,
            message: '基本信息添加成功！',
            type: 'success'
          })
          self.emitCouponId = response.data
          Bus.$emit('getCouponId', response.data)
          Bus.$emit('getCouponNum', self.basicInfoForm.couponNum)
          self.$emit('change-flag1')
        })
        .catch(e => {
          self.btnLoading = false
        })
    }
  },
  mounted() {
    this.action = this.editType
  },
  created() {},
  watch: {
    action: {
      handler: function(val, oldVal) {
        if (this.action === 'modify') this.queryBasicInfo()
        else this.handleQueryCategory()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.picPreview {
  border: #d6d6d6 1px solid;
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  margin-bottom: 10px;
  border-radius: 2px;
  overflow: hidden;
  img {
    height: 100px;
  }
}
.picAdd {
  width: 100%;
  .uploadWrap {
    height: 30px;
    overflow: hidden;
    outline: 0 none;
    position: relative;
    z-index: 1;
    display: block;
    .fileWrap {
      width: 99.5%;
      cursor: pointer;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
    .textWrap {
      width: 80%;
      float: left !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    .btnWrap {
      width: 20%;
      float: left !important;
    }
    .uploadBtn {
      height: 30px;
      border-radius: 0 2px 2px 0;
      border: 0;
      background-color: #d3d3d3;
    }
  }
  .hint {
    font-size: 12px;
    line-height: 16px;
    color: #999;
    margin-top: 5px;
  }
}
</style>
