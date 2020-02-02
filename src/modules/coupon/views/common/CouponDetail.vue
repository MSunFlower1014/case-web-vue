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
        <li :class="{ on: isActive==='2' }">
          <a @click="handleChangeTab('2')">
            <i class="fa fa-file-powerpoint-o fa-2x"></i>
            <span>领取规则</span>
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
              <span>{{basicInfoForm.patientSex}}</span>
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
              <span>{{basicInfoForm.type}}</span>
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
              <span>{{basicInfoForm.status}}</span>
            </el-col>
          </el-row>
        </el-row>

        <!-- 领取规则 -->
        <el-row v-if="isActive==='2'">

        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import couponService from '../../service/coupon-service.js'
import receiveRuleService from '../../service/receive-rule-service.js'
import useRuleService from '../../service/use-rule-service.js'
import sendRuleService from '../../service/send-rule-service.js'
const PIC_URL_PREFIX = 'https://www.nimitz.org.cn/uploadFile/couponMaterialFile'
export default {
  data() {
    return {
      picUrlPrefix: PIC_URL_PREFIX,
      isActive: '1', // 当前点击索引
      receiveDone: false,
      useDone: false,
      sendDone: false,
      tripRulesShow: false, // 规则是否显示
      sendRuleOn: false, // 规则是否显示
      basicInfoForm: {}, // 基本信息
      receiveRuleForm: {}, // 领取规则
      // 使用规则查询接口返回数据
      useRuleStatus: false,
      sendType: '',
      use_way: '',
      use_time: '',
      activate_way: '',
      use_interval: '',
      goods_scope: '',
      use_channel: '',
      amount_scope: '',
      selectedCategory: [],
      selectedBrand: [],
      selectedGoods: [],
      unitTypes: ['', '元', '角', '分', 'M', 'G', '分钟', '小时', '折'],
      weekDays: [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日'
      ]
    }
  },
  filters: {
    statusFilter(value) {
      let statusDesc = ''
      switch (value) {
        case -1:
          statusDesc = '草稿'
          break
        case 0:
          statusDesc = '停用'
          break
        case 1:
          statusDesc = '启用'
          break
      }
      return statusDesc
    }
  },
  computed: {
    couponID() {
      return this.$route.query.couponID
    }
    ,
    useWay() {
      if (this.use_way === '') {
        return this.use_way
      } else {
        return this.use_way === '1' ? '线上' : '线下'
      }
    },
    activateWay() {
      if (this.activate_way === '') {
        return this.activate_way
      } else {
        return this.activate_way === '1' ? '自动激活' : '手工激活'
      }
    },
    useChannel() {
      if (this.use_channel === '-1') {
        return '不限渠道'
      } else {
        return this.use_channel
      }
    },
    useInterval() {
      if (this.use_interval === '-1') {
        return '不限'
      } else if (this.use_interval === '') {
        return ''
      } else {
        let weeks = JSON.parse(this.use_interval).week
        let time = JSON.parse(this.use_interval).time
        let result = ''
        if (weeks) {
          let arrCode = weeks.split(',')
          let arrValue = []
          arrCode.forEach(item => {
            arrValue.push(this.weekDays[parseInt(item) - 1])
          })
          result = '限定星期： ' + arrValue + ' '
        }
        if (time) {
          result += '限定时段： ' + time
        }
        return result
      }
    }
  },
  methods: {
    handleChangeTab(index) {
      this.isActive = index
    },
    queryBasicInfo() {
      let self = this
      couponService.queryCouponDetailById(this.couponID).then(rsp => {
        self.basicInfoForm = Object.assign({}, rsp)
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
        if (val === '2' && !this.receiveDone) this.queryReceiveRule()
        if (val === '3' && !this.useDone) this.queryUseRule()
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
