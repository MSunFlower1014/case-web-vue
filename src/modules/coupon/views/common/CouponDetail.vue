<template>
  <div class="levelDetails">
    <div class="leftBox">
      <ul class="levelList">
        <li :class="{ on: isActive==='1' }">
          <a @click="handleChangeTab('1')">
            <i class="fa fa-bars fa-2x"></i>
            <span>基本信息</span>
          </a>
          <em></em>
        </li>
        <li :class="{ on: isActive==='2' }" v-if="basicInfoForm.status=='1'">
          <a @click="handleChangeTab('2')">
            <i class="fa fa-file-powerpoint-o fa-2x"></i>
            <span>转诊申请</span>
          </a>
          <em></em>
        </li>
      </ul>
    </div>
    <div class="rightBox">
      <div class="detailsWrap">
        <!-- 基本信息 -->
        <el-row v-if="isActive==='1'">
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>病例id：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.id}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>病人名字：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.patientName }}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>病人年龄：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.patientAge + '岁'}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>病人性别：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.patientSex | sexFilter}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>病人联系方式：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.patientMobile}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>所属医院：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.hospital}}</span>
            </el-col>
          </el-row>
    
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>病例信息：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.message !== '' ? basicInfoForm.message : '暂无描述'}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>病例类型：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.type | typeFilter }}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>创建时间：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.createDate}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>病例状态</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.status | statusFilter }}</span>
            </el-col>
          </el-row>
        </el-row>

        <!-- 转诊申请 -->
        <el-row v-if="isActive==='2'">
            <el-form ref="basicInfoForm"
              :label-position="'right'"
              :model="basicInfoForm"
              element-loading-text="拼命加载中">
              <el-row class="formLine" :gutter="20">
                <el-col :span="3"
                  class="title">
                  <span>转诊医院选择</span>
                </el-col>
                <el-col :span="9"
                  class="desc">
                  <el-select v-model="referral.newOwnId" filterable placeholder="请选择">
                    <el-option
                      v-for="item in userList"
                      :key="item.id"
                      :label="item.hospital"
                      :value="item.id"
                      >
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row class="formLine" :gutter="20">
                <el-col :span="3"
                  class="title">
                  <span>转诊备注信息</span>
                </el-col>
                <el-col :span="12">
                  <el-input type="textarea" v-model="referral.message"
                    maxlength="250" placeholder="请输入转诊备注信息"></el-input>
                </el-col>
              </el-row>
            </el-form>
            <div class="submit-button-wrap">
            <el-button type="primary"
              @click="referralHospital"
              class="submit_btn"
              round>转诊</el-button>
          </div>
          </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import couponService from '../../service/coupon-service.js'
export default {
  data() {
    return {
      isActive: '1', // 当前点击索引
      basicInfoForm: {}, // 基本信息
      userList: [],
      referral: {
        newOwnId: '',
        newOwnName: '',
        message: '',
        caseId: ''
      }
    }
  },
  filters: {
    sexFilter(value) {
      let statusDesc = ''
      switch (value) {
        case '1':
          statusDesc = '男'
          break
        case '2':
          statusDesc = '女'
          break
      }
      return statusDesc
    },
    typeFilter(value) {
      let statusDesc = ''
      switch (value) {
        case '1':
          statusDesc = '外科'
          break
        case '2':
          statusDesc = '内科'
          break
      }
      return statusDesc
    },
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
          statusDesc = '出院，结档'
          break
      }
      return statusDesc
    }
  },
  computed: {
    couponID() {
      return this.$route.query.couponID
    }
  },
  methods: {
    referralHospital() {
      this.$confirm('此操作将发起转诊, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let self = this
          this.referral.caseId = this.basicInfoForm.id
          console.log(this.referral)
          let formData = new FormData()
          formData.append('referralEntity', JSON.stringify(this.referral))
          this.btnLoading = true
          couponService.addReferralFromData(formData).then(rsp => {
            self.btnLoading = false
            var showMessage = '转诊成功！'
            var showType = 'success'
            if (rsp.resultCode !== 0) {
              showMessage = rsp.resultMessage
              showType = 'error'
            }
            self.$message({
                showClose: true,
                message: showMessage,
                type: showType
              })
          }).catch(error => {
              self.$message({
                showClose: true,
                message: error.resultMessage,
                type: 'error'
              })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    handleChangeTab(index) {
      this.isActive = index
    },
    queryBasicInfo() {
      let self = this
      couponService.queryCouponDetailById(this.couponID).then(rsp => {
        self.basicInfoForm = Object.assign({}, rsp)
      })
    },
    queryUserList() {
      let self = this
      couponService.queryUserList(this.couponID).then(rsp => {
        self.userList = Object.assign({}, rsp)
      })
    }
  },
  created() {},
  mounted() {
    this.queryBasicInfo()
  },
  watch: {
    isActive: {
      handler: function(val, oldVal) {
        if (val === '2') this.queryUserList()
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.levelDetails {
  width: 100%;
  margin: 0;
  position: absolute;
  bottom: 0px;
  top: 110px;
  height: 100%;
  .leftBox {
    position: absolute;
    float: left;
    width: 100px;
    min-width: 0;
    min-height: 100%;
    top: 0px;
    border-right: 0 none;
    background-color: #444446;
    background: transparent -webkit-linear-gradient(
        80deg,
        #030910 1%,
        #2D8CF0 99%
      ) repeat scroll 0% 0%;
    background: transparent -moz-linear-gradient(80deg, #030910 1%, #2D8CF0 99%)
      repeat scroll 0% 0%;
    background: transparent -o-linear-gradient(80deg, #030910 1%, #2D8CF0 99%) repeat
      scroll 0% 0%;
    background: transparent -ms-linear-gradient(80deg, #030910 1%, #2D8CF0 99%) repeat
      scroll 0% 0%;
    background: transparent linear-gradient(80deg, #030910 1%, #2D8CF0 99%)
      repeat scroll 0% 0%;
    // overflow-y: auto;
    left: 0;
  }
  .leftBox::after {
    clear: both;
    content: '';
    display: block;
  }
  .rightBox {
    padding-left: 110px;
    background-color: #fff;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
/* 三级目录左侧样式 */
.levelList {
  padding: 0;
  overflow: hidden;
  li {
    position: relative;
    a {
      padding: 15px 0;
      color: #666;
      text-align: center;
      color: #fff;
      display: block;
      opacity: 0.8;
    }
    i {
      display: block;
      margin: 0 auto 5px;
    }
    em {
      width: 0;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 10px solid #fff;
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -8px;
      display: none;
    }
  }
  li.on a,
  li:hover a {
    opacity: 1;
  }
  li.on em {
    display: block;
  }
}
/* 优惠券详情页面样式 */
.detailsWrap {
  display: block;
  dl {
    width: 96%;
    margin-left: auto;
    margin-right: auto;
    padding: 1% 0;
    clear: both;
    overflow: hidden;
    dt {
      font-size: 14px;
      line-height: 30px;
      color: #666;
      vertical-align: top;
      letter-spacing: normal;
      word-spacing: normal;
      text-align: right;
      display: inline-block;
      width: 18%;
      padding-right: 1%;
      margin: 0;
      font-weight: bold;
    }
    dd {
      line-height: 30px;
      vertical-align: top;
      letter-spacing: normal;
      word-spacing: normal;
      display: inline-block;
      width: 78%;
      padding-left: 1%;
      p {
        margin-top: 5px;
      }
      .line {
        display: block;
        overflow: hidden;
      }
    }
  }
}
</style>
