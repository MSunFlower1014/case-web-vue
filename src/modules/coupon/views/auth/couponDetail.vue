<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row :gutter="20"
        class="query_label_mgr">
        <el-col :span="4">
          <span>请输入券码</span>
        </el-col>
      </el-row>
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-input placeholder="请输入券码"
            clearable
            v-model="queryParam['couponCode']"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="query-search-button"
            type="primary"
            size="small"
            @click="handleQueryCoupon">
            <i class="fa fa-search"></i>搜索</el-button>
        </el-col>
      </el-row>

    </el-card>
    <el-card class="box-card">
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>名称：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.couponName}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>券码：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.couponCode}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>面额：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.denomination}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>状态：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.status}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>类型：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.categoryName}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>领取方式：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.receiveType}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>使用方式：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.useType}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>有效期：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.validateTime}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>制作来源：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.createPlatform}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>制作方：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.createBy}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>发行方：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.sendBy}}</span>
        </el-col>
      </el-row>
      <!-- 线条 -->
      <div class="line"></div>
      <!-- 线条下面 -->
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>归属账户：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.tel}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>领取渠道：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.channel}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>领取时间：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.receiveTime}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>状态：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.userCouponStatusName}}</span>
        </el-col>
      </el-row>
      <el-row class="formLine ft_14"
        :gutter="20">
        <el-col :span="3"
          class="title">
          <span>商品范围：</span>
        </el-col>
        <el-col :span="21"
          class="desc">
          <span>{{record.goodsList + ''}}</span>
        </el-col>
      </el-row>
    </el-card>
    <div class="submit-button-wrap">
      <el-button :style="{ width:'150px' }"
        type="primary"
        @click="handleSubmit"
        :loading="btnLoading">{{record.userCouponStatus===1?'激活优惠券':'核销优惠券'}}</el-button>
    </div>
  </div>
</template>

<script>
import authService from '../../service/auth-service.js'

export default {
  name: 'couponDetail',
  data() {
    return {
      btnLoading: false,
      record: {},
      queryParam: {
        couponCode: '',
        status: ''
      }
    }
  },
  mounted() {
    this.queryParam.couponCode = this.$route.query.couponCode
    this.handleQueryCoupon()
  },
  methods: {
    handleQueryCoupon() {
      let param = this.queryParam
      let self = this
      authService.getActivationDetail(param)
        .then(rspData => {
          self.record = rspData.data
        })
    },
    handleSubmit() {
      let param = this.queryParam
      let tipMsg = ''
      let self = this
      // 激活优惠券
      if (this.record.userCouponStatus === 1) {
        tipMsg = '激活成功'
        param.status = 1
      } else { // 使用优惠券
        tipMsg = '核销成功'
        param.status = 3
      }
      this.btnLoading = true
      authService.verifyCoupon(param)
        .then(rspData => {
          self.btnLoading = false
          self.$message({
            showClose: true,
            message: tipMsg,
            type: 'success'
          })
          self.$router.go(-1)
          // self.handleQueryCoupon()
        }).catch(e => {
          self.btnLoading = false
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.formLine {
  padding: 10px 10%;
  line-height: 30px;
  vertical-align: top;
  .title {
    color: #666;
    text-align: right;
    font-weight: bold;
  }
  .desc {
    text-align: left;
  }
}
</style>
