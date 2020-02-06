<template>
  <div>
    <el-form ref="basicInfoForm"
      :label-position="'right'"
      :model="basicInfoForm"
      v-loading="loading"
      element-loading-text="拼命加载中">
      <el-form-item label="病例名称"
        prop="name"
        label-width="10%">
        <el-input v-model="basicInfoForm.name"
              placeholder="请输入病例名称"></el-input>
      </el-form-item>
    
      <el-row >
        <el-col :span="6">
          <el-form-item label="病人名字"
            prop="patientName"
            label-width="40%">
            <el-input v-model="basicInfoForm.patientName"
                    placeholder="请输入病人名字"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="病人年龄"
            prop="patientAge"
            label-width="40%">
            <el-input v-model="basicInfoForm.patientAge"
              placeholder="请输入病人年龄">{{basicInfoForm.patientAge}}</el-input>
          </el-form-item>
        </el-col>


        <el-col :span="6">
          <el-form-item label="病人性别"
            prop="patientSex"
            label-width="40%">
           <el-select v-model="basicInfoForm.patientSex" placeholder="选择病人性别">
            <el-option v-for="(item,index) in sexUtils" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="联系方式"
            prop="patientMobile"
            label-width="40%">
            <el-input v-model="basicInfoForm.patientMobile"
              placeholder="请输入病人联系方式"></el-input>
          </el-form-item>
        </el-col>
       <el-col :span="6">
          <el-form-item label="病例类型"
            prop="type"
            label-width="40%">
           <el-select v-model="basicInfoForm.type" placeholder="选择病例类型">
            <el-option v-for="(item,index) in typeUtils" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注信息"
                    prop="message"
                    label-width="10%">
        <el-input v-model="basicInfoForm.message"
                placeholder="请输入备注信息"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发放方式"
            prop="status"
            label-width="20%">
            <el-radio v-model="basicInfoForm.status"
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
    couponID: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      btnLoading: false,
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
      sexUtils: [
        {
          label: '男',
          value:'1' 
        },
        {
          label: '女',
          value: '2'
        }
      ],
       typeUtils: [
        {
          label: '外科',
          value: '1'
        },
        {
          label: '内科',
          value: '2'
        }
      ],
      // 表单校验
      rules: {
        name: [
          { required: true, message: '请输入病例名称', trigger: 'blur' },
          { max: 100, message: '长度不超过 100 个字符', trigger: 'blur' }
        ],
        patientName: [
          { required: true, message: '请输入病人名字', trigger: 'change' }
        ],
        patientAge: [
          { required: true, message: '请输入病人年龄', trigger: 'change' }
        ],
        patientSex: [
          { required: true, message: '请选择病人性别', trigger: 'blur' }
        ],
        patientMobile: [
          { required: true, message: '请输入病人联系方式', trigger: 'change' }
        ],
        message: [
          { required: true, message: '请输入病例信息', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择病例类型', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    queryBasicInfo() {
      let self = this
      let queryID = this.couponID || this.emitCouponId
      if (queryID =='') {
        return
      }
      let params = {
        id: queryID
      }
      this.loading = true
      couponService
        .getBasicById(params)
        .then(rsp => {
          self.loading = false
          self.basicInfoForm = Object.assign({}, rsp)
          console.log(self.basicInfoForm.name)
        })
        .catch(e => {
          self.loading = false
        })
    },
    handleAdd() {
      let self = this
      let formData = new FormData()
      formData.append('caseEntity', JSON.stringify(this.basicInfoForm))
      this.btnLoading = true
      couponService
        .addFormData(formData)
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
          this.$router.push({
             path: '/case/case_list'
          })
        })
        .catch(e => {
          self.btnLoading = false
        })
    }
  },
  mounted() {
    this.queryBasicInfo()
  },
  created() {},
  watch: {
    action: {
      handler: function(val, oldVal) {
        console.log(val + oldVal)        
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
