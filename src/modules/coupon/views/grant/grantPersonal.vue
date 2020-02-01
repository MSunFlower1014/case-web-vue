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
          <span>{{basicInfoForm.denomination}}</span>
        </el-col>
      </el-row>
      <!-- <el-row class="formLine"
        :gutter="20">
        <el-col :span="4"
          class="title">
          <span>图片：</span>
        </el-col>
        <el-col :span="20">
          <div class="grantImg"
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
      <el-row class="row-content">
        <el-button size="small"
          type="primary"
          class="addBtn"
          @click="handleAddTel">
          添加号码
        </el-button>
      </el-row>
      <el-form :model="dynamicTelForm"
        ref="dynamicTelForm"
        label-width="100px"
        class="demo-dynamic">
        <el-form-item v-for="(tel, index) in dynamicTelForm.tels"
          :label="'号码' + (index+1)"
          :key="tel.key"
          :prop="'tels.' + index + '.value'"
          :rules="telRule">
          <el-input v-model="tel.value"
            style="width:30%;"></el-input>
          <el-button @click.prevent="removeTel(tel)"
            type="text"
            style="text-decoration:underline;">删除</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="submit-button-wrap">
      <el-button type="primary"
        @click="handleSubmit"
        class="submit_btn">提交</el-button>
    </div>
  </div>
</template>

<script>
import couponService from '../../service/coupon-service.js'
import sendRuleService from '../../service/send-rule-service.js'
const PIC_URL_PREFIX = 'https://www.nimitz.org.cn/uploadFile/couponMaterialFile'
const PATTERN_CHINAMOBILE = /^1(3[4-9]|5[012789]|8[23478]|4[7]|7[8]|9[8])\d{8}$/
export default {
  name: 'grantPersonal',
  data() {
    const validateTel = (rule, value, callback) => {
      if (value === null || value === '') {
        callback(new Error('手机号码不能为空'))
      } else {
        if (!PATTERN_CHINAMOBILE.test(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      }
    } // 验证手机号码
    return {
      picUrlPrefix: PIC_URL_PREFIX,
      couponId: '',
      status: null,
      oddNum: null,
      basicInfoForm: {
        couponName: '',
        denomination: '',
        couponImg: '',
        couponDesc: ''
      },
      dynamicTelForm: {
        tels: [
          {
            value: ''
          }
        ]
      },
      telRule: {
        validator: validateTel,
        trigger: 'blur'
      }
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
    handleAddTel() {
      this.dynamicTelForm.tels.push({
        value: '',
        key: Date.now()
      })
    },
    removeTel(item) {
      let index = this.dynamicTelForm.tels.indexOf(item)
      if (index !== -1) {
        this.dynamicTelForm.tels.splice(index, 1)
      }
    },
    handleSubmit() {
      let self = this
      this.$refs.dynamicTelForm.validate(valid => {
        if (valid) {
          if (this.dynamicTelForm.tels.length) {
            if (this.dynamicTelForm.tels.length > this.oddNum) {
              this.$message({
                showClose: true,
                message: '优惠券剩余量不足以发放！',
                type: 'error'
              })
              return false
            }
            let telArr = []
            this.dynamicTelForm.tels.forEach(item => {
              telArr.push(item.value)
            })
            let params = {
              tels: telArr,
              couponId: this.couponId,
              oddNum: this.oddNum
            }
            sendRuleService
              .addSingleSend(params)
              .then(rsp => {
                self.$message({
                  showClose: true,
                  message: '优惠券个人发放规则编辑成功！',
                  type: 'success'
                })
                self.$router.go(-1)
              })
              .catch(e => {})
          } else {
            this.$message({
              showClose: true,
              message: '请添加号码！',
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    }
  },
  created() {},
  mounted() {
    this.couponId = this.$route.query.id
    this.status = this.$route.query.status
    this.oddNum = this.$route.query.oddNum
    this.queryBasicInfo()
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
  margin-bottom: 15px;
}

.formLine {
  padding: 10px 10%;
  line-height: 30px;
  font-size: 15px;
  vertical-align: top;
  font-weight: bold;
  color: #666;
  .title {
    text-align: right;
  }
  .desc {
    font-size: 14px;
    text-align: left;
  }
  .grantImg {
    height: 200px;
    width: 500px;
    border: 1px solid #ddd;
    img {
      display: block;
      max-width: 300px;
      max-height: 198px;
      margin: 0 auto;
    }
  }
}
.addBtn {
  width: 106px;
  background-color: #afb4b8;
  border: none;
}
</style>
