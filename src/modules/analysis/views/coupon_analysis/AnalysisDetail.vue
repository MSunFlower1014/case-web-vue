<template>
  <div class="app-container">
    <el-row>
      <el-card style="padding:0 10%;">
        <el-row class="formLine"
          :gutter="20">
          <el-col :span="3"
            class="title">
            <span>名称：</span>
          </el-col>
          <el-col :span="21"
            class="desc">
            <span>{{basicInfoForm.couponName}}</span>
          </el-col>
        </el-row>
        <el-row class="formLine"
          :gutter="20">
          <el-col :span="3"
            class="title">
            <span>面额：</span>
          </el-col>
          <el-col :span="21"
            class="desc">
            <span>{{basicInfoForm.denomination}}</span>
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
            <span>{{basicInfoForm.status}}</span>
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
            <span>{{basicInfoForm.categoryName}}</span>
          </el-col>
        </el-row>
        <el-row class="formLine"
          :gutter="20">
          <el-col :span="3"
            class="title">
            <span>使用方式：</span>
          </el-col>
          <el-col :span="21"
            class="desc">
            <span>{{basicInfoForm.useType}}</span>
          </el-col>
        </el-row>
        <el-row class="formLine"
          :gutter="20">
          <el-col :span="3"
            class="title">
            <span>有效期：</span>
          </el-col>
          <el-col :span="21"
            class="desc">
            <span>{{basicInfoForm.validateTime}}</span>
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
            <span>发行方：</span>
          </el-col>
          <el-col :span="21"
            class="desc">
            <span>{{basicInfoForm.sendBy}}</span>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row class="mrgt_15">
      <el-tabs type="border-card"
        @tab-click="handleTabClick">
        <el-tab-pane label="领取记录">
          <search-table :tableColumn="receiveColumns"
            :searchType="'dole'"
            :couponId="couponId">
          </search-table>
        </el-tab-pane>
        <el-tab-pane label="使用记录">
          <search-table :tableColumn="useColumns"
            :searchType="'use'"
            :couponId="couponId">
          </search-table>
        </el-tab-pane>
        <el-tab-pane label="统计分析">
          <el-tabs @tab-click="handleAnalyClick">
            <el-tab-pane label="领取分析">
              <receive-chart ref="receiveAnaly"
                :couponId="couponId"
                :doleNum="doleNum"></receive-chart>
            </el-tab-pane>
            <el-tab-pane label="使用分析">
              <use-chart ref="useAnaly"
                :couponId="couponId"
                :useNum="useNum"></use-chart>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
import couponAnalyService from '../../service/coupon-analysis-service.js'
import SearchTable from './SearchTable.vue'
import ReceiveChart from './ReceiveChart.vue'
import UseChart from './UseChart.vue'
export default {
  components: {
    SearchTable,
    ReceiveChart,
    UseChart
  },
  data() {
    return {
      basicInfoForm: {
        couponName: '',
        denomination: '',
        status: '',
        categoryName: '',
        receiveType: '',
        useType: '',
        validateTime: '',
        createPlatform: '',
        createBy: '',
        sendBy: ''
      },
      receiveColumns: [
        {
          key: 'tel',
          name: '手机号码'
        },
        {
          key: 'createDate',
          name: '领取时间'
        },
        {
          key: 'channel',
          name: '领取渠道'
        },
        {
          key: 'receive',
          name: '领取方式'
        },
        {
          key: 'couponCode',
          name: '券码'
        },
        {
          key: 'statusName',
          name: '状态'
        }
      ],
      useColumns: [
        {
          key: 'tel',
          name: '手机号码'
        },
        {
          key: 'createDate',
          name: '领取时间'
        },
        {
          key: 'receive',
          name: '领取方式'
        },
        {
          key: 'couponCode',
          name: '券码'
        },
        {
          key: 'statusName',
          name: '状态'
        },
        {
          key: 'updateDate',
          name: '使用时间'
        },
        {
          key: 'channel',
          name: '使用渠道'
        }
      ]
    }
  },
  computed: {
    couponId() {
      return this.$route.query.couponId
    },
    doleNum() {
      return this.$route.query.doleNum
    },
    useNum() {
      return this.$route.query.useNum
    }
  },
  methods: {
    queryBasicInfo() {
      let self = this
      couponAnalyService
        .queryBasicInfo(this.couponId)
        .then(rsp => {
          self.basicInfoForm = rsp.data
        })
        .catch(e => {})
    },
    handleTabClick(tab, event) {
      // 统计分析
      if (tab.index === '2') {
        this.$refs.receiveAnaly.$emit('analysisReady')
      }
    },
    handleAnalyClick(tab, event) {
      // 统计分析
      if (tab.index === '0') {
        this.$refs.receiveAnaly.$emit('analysisReady')
      }
      if (tab.index === '1') {
        this.$refs.useAnaly.$emit('analysisReady')
      }
    }
  },
  created() {},
  mounted() {
    this.queryBasicInfo()
  }
}
</script>
<style lang="scss" scoped>
.mrgt_15 {
  margin-top: 15px;
}
</style>
