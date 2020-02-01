<template>
  <div class="app-container">
    <el-row>
      <el-tabs type="border-card"
        @tab-click="handleTabClick">
        <el-tab-pane label="领取TOP10">
          <el-row :gutter="20">
            <el-col :span="12">
              <card-list :title="'领取优惠券TOP10'"
                :record="receiveCouponTop10"></card-list>
            </el-col>
            <el-col :span="12">
              <card-list :title="'领取渠道TOP10'"
                :record="receiveChannelTop10"></card-list>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="使用TOP10">
          <el-row :gutter="20">
            <el-col :span="12">
              <card-list :title="'使用优惠券TOP10'"
                :record="useCouponTop10"></card-list>
            </el-col>
            <el-col :span="12">
              <card-list :title="'使用渠道TOP10'"
                :record="useChannelTop10"></card-list>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <el-row :gutter="20"
      class="num-box-container">
      <el-card :body-style="{ padding: '0px'}">
        <el-col :span="6"
          :offset="1"
          class="mrgtb_10">
          <num-box :title="'制作数'"
            :index="1"
            :num="numberMap.makeNumber"
            :percent="numberMap.makePercent">
          </num-box>
        </el-col>
        <el-col :span="6"
          :offset="2"
          class="mrgtb_10">
          <num-box :title="'领取数'"
            :index="3"
            :num="numberMap.receiveNumber"
            :percent="numberMap.receivePercent">
          </num-box>
        </el-col>
        <el-col :span="6"
          :offset="2"
          class="mrgtb_10">
          <num-box :title="'使用数'"
            :index="4"
            :num="numberMap.useNumber"
            :percent="numberMap.usePercent">
          </num-box>
        </el-col>
      </el-card>
    </el-row>
    <el-row class="chart-search-container">
      <el-card>
        <el-row :gutter="20"
          class="query_input_style">
          <el-col :span="4">
            <el-select v-model="countCycle"
              style="width:100%;"
              size="small"
              placeholder="请选择">
              <el-option v-for="item in nearDateOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button type="primary"
              @click="handleQueryChart"
              size="small"
              class="query-search-button">
              <i class="fa fa-search"></i>搜索</el-button>
          </el-col>
        </el-row>
        <el-row class="chartWrap">
          <line-chart :height="'100%'"
            :width="'100%'"
            :id="'platLine'"
            :lineKind="'multi'"
            :lineTime="lineTime"
            :lineName="lineName"
            :lineData="lineData">
          </line-chart>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import CardList from './CardList.vue'
import NumBox from './NumBox.vue'
import LineChart from '@/components/Charts/LineChart.vue'
import platAnalyService from '../../service/plat-analysis-service.js'
export default {
  components: {
    CardList,
    LineChart,
    NumBox
  },
  data() {
    return {
      active: '0', // 当前tab页
      numberMap: {
        makeNumber: null,
        receiveNumber: null,
        useNumber: null,
        makePercent: null,
        receivePercent: null,
        usePercent: null
      },
      countCycle: 'day',
      nearDateOpts: [
        {
          value: 'day',
          label: '昨天'
        },
        {
          value: 'week',
          label: '上周'
        },
        {
          value: 'month',
          label: '上月'
        }
      ],
      receiveCouponTop10: [], // 领取优惠券top10
      receiveChannelTop10: [], // 领取渠道top10
      useCouponTop10: [], // 使用优惠券top10
      useChannelTop10: [], // 使用渠道top10
      lineDataMap: [],
      seen: true,
      lineTime: [],
      lineName: ['制作数', '领取数', '使用数'], // makeNumber receiveNumber useNumber
      lineData: []
    }
  },
  methods: {
    handleTabClick(tab, event) {
      this.active = tab.index
      this.handleQueryTopList(parseInt(this.active) + 3)
    },
    handleQueryTopList(type = 3) {
      let self = this
      platAnalyService
        .queryTopList(type)
        .then(rsp => {
          if (type === 3) {
            self.receiveCouponTop10 = rsp.data.couponTopList
            self.receiveChannelTop10 = rsp.data.channelTopList
          } else {
            self.useCouponTop10 = rsp.data.couponTopList
            self.useChannelTop10 = rsp.data.channelTopList
          }
        })
        .catch(e => {})
    },
    queryCouponCount() {
      let self = this
      platAnalyService
        .queryCouponCount()
        .then(rsp => {
          self.numberMap = rsp.data
        })
        .catch(e => {})
    },
    handleQueryChart() {
      let self = this
      platAnalyService
        .queryGraphList(this.countCycle)
        .then(rsp => {
          self.lineDataMap = rsp.data
          self.map2arr()
        })
        .catch(e => {})
    },
    map2arr() {
      this.lineData = []
      this.lineTime = []
      this.lineDataMap.forEach(item => {
        this.lineTime.push(item.timeX)
        let tempArr = []
        tempArr.push(item.makeNumber)
        tempArr.push(item.receiveNumber)
        tempArr.push(item.useNumber)
        this.lineData.push(tempArr.join(','))
      })
    }
  },
  mounted() {
    this.handleQueryTopList()
    this.queryCouponCount()
    this.handleQueryChart()
  }
}
</script>

<style lang="scss" scoped>
.num-box-container {
  position: relative;
  padding: 20px 0px;
  width: 100%;
  height: 200px;
  margin-left: 0px !important;
  margin-right: 0px;
}
.chart-search-container {
  position: relative;
  padding: 20px 0px;
  width: 100%;
  height: 500px;
}
.mrgtb_10 {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

