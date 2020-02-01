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
        <li :class="{ on: isActive==='3' }">
          <a @click="handleChangeTab('3')">
            <i class="fa fa-bookmark-o fa-2x"></i>
            <span>使用规则</span>
          </a>
          <em></em>
        </li>
       <!-- <li :class="{ on: isActive==='4' }"-->
          <!-- v-if="sendRuleOn">-->
          <!-- <a @click="handleChangeTab('4')">-->
           <!--  <i class="fa fa-crosshairs fa-2x"></i>-->
            <!-- <span>发放规则</span>-->
           <!--</a>-->
           <!--<em></em>-->
        <!-- </li>-->
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
              <span>id：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.id}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20"
            v-if="categoryName!=='贴膜券'">
            <el-col :span="3"
              class="title">
              <span>面额：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.name }}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20"
            v-if="categoryName==='满减券' || categoryName==='满折券'">
            <el-col :span="3"
              class="title">
              <span>使用门槛：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.useLimit + '元'}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20"
            v-if="categoryName==='膨胀券'">
            <el-col :span="3"
              class="title">
              <span>膨胀系数：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.swellFactor}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>状态：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.hospital | statusFilter}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>类型：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.message}}</span>
            </el-col>
          </el-row>
          <!-- <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>图标：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <div class="picBox"
                v-if="basicInfoForm.couponImg!== ''">
                <img :src="picUrlPrefix+basicInfoForm.couponImg" />
              </div>
                <span v-else>该优惠券暂无图标</span>
            </el-col>
          </el-row> -->
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>描述：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.couponDesc !== '' ? basicInfoForm.couponDesc : '暂无描述'}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>制作来源：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.createPlatform}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>制作方：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.createBy}}</span>
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
              <span>发放类型：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.sendType === '1' ? '直接发放' : '铺货发放'}}</span>
            </el-col>
          </el-row>
          <!--<el-row class="formLine"-->
            <!--:gutter="20">-->
            <!--<el-col :span="3"-->
              <!--class="title">-->
              <!--<span>是否可转赠：</span>-->
            <!--</el-col>-->
            <!--<el-col :span="21"-->
              <!--class="desc">-->
              <!--<span>{{basicInfoForm.isPresent === 0 ? '不可转赠' : '可转赠'}}</span>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!-- <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>是否可退还：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{basicInfoForm.isReturn === 0 ? '不可退还' : '可退还'}}</span>
            </el-col>
          </el-row> -->
        </el-row>

        <!-- 领取规则 -->
        <el-row v-if="isActive==='2'">
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>领取总量：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{receiveRuleForm.sumNum === -1 ? '不限量' : receiveRuleForm.sumNum}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>每日领取量：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{receiveRuleForm.dayNum === -1 ? '不限量' : receiveRuleForm.dayNum}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>每周领取量：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{receiveRuleForm.weekNum === -1 ? '不限量' : receiveRuleForm.weekNum}}</span>
            </el-col>
          </el-row>
          <el-row class="formLine"
            :gutter="20">
            <el-col :span="3"
              class="title">
              <span>每月领取量：</span>
            </el-col>
            <el-col :span="21"
              class="desc">
              <span>{{receiveRuleForm.monthNum === -1 ? '不限量' : receiveRuleForm.monthNum}}</span>
            </el-col>
          </el-row>
          <!--<el-row class="formLine"-->
             <!-- :gutter="20">-->
            <!--<el-col :span="3"-->
             <!-- class="title">-->
             <!-- <span>保有量：</span>-->
            <!--</el-col>-->
            <!--<el-col :span="21"-->
            <!--  class="desc">-->
             <!-- <span>{{receiveRuleForm.inventory === -1 ? '不限量' : receiveRuleForm.inventory}}</span>-->
            <!--</el-col>-->
         <!-- </el-row>-->
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
      ],
      sendRuleForm: {
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
        targetUser: null,
        sendChannelList: [],
        sendAreaList: [],
        targetUserList: []
      } // 发放规则
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
    },
    issuerCode() {
      return this.$route.query.issuerCode
    },
    categoryName() {
      return this.$route.query.categoryName
    },
    // 使用规则
    useTime() {
      if (this.use_time === '-1') {
        return '始终有效'
      } else if (this.use_time === '') {
        return this.use_time
      } else {
        let obj = JSON.parse(this.use_time)
        if (obj.absolute_time !== undefined) {
          return obj.absolute_time
        } else {
          return `自领取后： ` + obj.relative_time + `天内有效`
        }
      }
    },
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
    },
    goodsScope() {
      if (this.issuerCode === 1 || this.issuerCode === '1') {
        return ''
      } else {
        if (this.goods_scope === '-1') {
          return '不限'
        } else if (this.goods_scope === '') {
          return ''
        } else {
          let result = []
          if (this.selectedCategory && this.selectedCategory.length) {
            this.selectedCategory.map(item => {
              result.push(item.label)
            })
            return '限定品类： ' + result
          } else if (this.selectedBrand && this.selectedBrand.length) {
            this.selectedBrand.map(item => {
              result.push(item.brandName)
            })
            return '限定品牌： ' + result
          } else {
            this.selectedGoods.map(item => {
              result.push(item.goodsName)
            })
            return '限定商品： ' + result
          }
        }
      }
    },
    amountScope() {
      if (this.amount_scope === '') {
        return ''
      } else if (this.amount_scope === '-1') {
        return '不限渠道'
      } else {
        return '满 ' + this.amount_scope + ' 元可使用'
      }
    },
    // 发放规则
    grantChannelTableData() {
      if (
        this.sendRuleForm.sendChannelList &&
        this.sendRuleForm.sendChannelList.length
      ) {
        return this.sendRuleForm.sendChannelList
      }
    },
    sendArea() {
      if (
        this.sendRuleForm.sendArea === '-1' ||
        this.sendRuleForm.sendArea === ''
      ) {
        return '全市'
      } else {
        if (
          this.sendRuleForm.sendAreaList &&
          this.sendRuleForm.sendAreaList.length
        ) {
          let arr = []
          this.sendRuleForm.sendAreaList.forEach(item => {
            arr.push(item.areaName)
          })
          return arr + ''
        }
      }
    },
    targetUser() {
      if (
        this.sendRuleForm.targetUserList &&
        this.sendRuleForm.targetUserList.length
      ) {
        let arr = []
        this.sendRuleForm.targetUserList.forEach(item => {
          arr.push(item.ruleName)
        })
        return arr + ''
      }
    },
    dateLimit() {
      if (!this.sendRuleForm.dateLimit) {
        return null
      } else if (this.sendRuleForm.dateLimit === '-1') {
        return '限定日期: ' + '不限'
      } else {
        return '限定日期: ' + this.sendRuleForm.dateLimit
      }
    },
    weekLimit() {
      if (!this.sendRuleForm.weekLimit) {
        return null
      } else if (this.sendRuleForm.weekLimit === '-1') {
        return '限定星期: ' + '不限'
      } else {
        let weeks = this.sendRuleForm.weekLimit.split(',')
        let arrValue = []
        weeks.forEach(item => {
          arrValue.push(this.weekDays[parseInt(item) - 1])
        })
        return '限定星期: ' + arrValue
      }
    },
    timeLimit() {
      if (!this.sendRuleForm.timeLimit) {
        return null
      } else if (this.sendRuleForm.timeLimit === '-1') {
        return '限定时段: ' + '不限'
      } else {
        return '限定时段: ' + this.sendRuleForm.timeLimit
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
    },
    queryReceiveRule() {
      let self = this
      let params = {
        couponId: this.couponID,
        status: parseInt(this.basicInfoForm.status)
      }
      receiveRuleService.getReceiveByIdStatus(params).then(rsp => {
        if (rsp.data.id !== null) {
          self.receiveRuleForm = Object.assign({}, rsp.data)
        }
        self.receiveDone = true
      })
    },
    queryUseRule() {
      let self = this
      let params = {
        couponId: this.couponID,
        status: parseInt(this.basicInfoForm.status)
      }
      useRuleService.getUseByIdStatus(params).then(rsp => {
        self.useDone = true
        self.sendType = rsp.data.sendType
        if (rsp.data.couponRuleRefVOList !== null) {
          self.useRuleStatus = true
          rsp.data.couponRuleRefVOList.map(rule => {
            self[rule.ruleKey] = rule.paramVal
          })
          self.selectedCategory = rsp.data.goodsCategoryList || []
          self.selectedBrand = rsp.data.goodsBrandList || []
          self.selectedGoods = rsp.data.goodsList || []
        }
      })
    },
    querySendRule() {
      let self = this
      sendRuleService.querySendRuleById(this.couponID).then(rsp => {
        self.sendDone = true
        if (rsp.data.sendArea !== null) {
          self.sendRuleOn = true
          self.sendRuleForm = Object.assign({}, rsp.data)
        }
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
