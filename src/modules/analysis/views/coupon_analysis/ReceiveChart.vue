<template>
  <div class="app-container">
    <el-row :gutter="20"
      class="chartNum">
      <el-col :span="3"
        class="fb ft_18">{{subTitie}}数:{{doleNum}}</el-col>
      <el-col :span="3">较昨天:
        <span :class="dayPercent.substr(0, 1) === '+' ? 'ft-red' : 'ft-green'">{{dayPercent}}%</span>
      </el-col>
      <el-col :span="3">较上周:
        <span :class="weekPercent.substr(0, 1) === '+' ? 'ft-red' : 'ft-green'">{{weekPercent}}%</span>
      </el-col>
      <el-col :span="3">较上月:
        <span :class="monthPercent.substr(0, 1) === '+' ? 'ft-red' : 'ft-green'">{{monthPercent}}%</span>
      </el-col>
    </el-row>
    <!--<el-row :gutter="20"
      class="chart-container">
      <el-col :span="12"
        class="single-chart-container">
        <div v-if="isChannelPieShow"
          class="submit-button-wrap">
          <img :src="noInfo"
            class="wh_100" />
        </div>
        <pie-chart v-else
          :height="'400px'"
          :width="'100%'"
          :id="'receivepie1'"
          :pieText="channelPieMap.title"
          :pieData="channelPieMap.pieData"></pie-chart>
        <el-row class="chartNum">{{subTitie}}最多的渠道：
          <span class="item">{{channelPieMap.max}}</span>
          <span class="item fb">{{channelPieMap.maxVal}}</span>
        </el-row>
        <el-row class="chartNum">{{subTitie}}最少的渠道：
          <span class="item">{{channelPieMap.min}}</span>
          <span class="item fb">{{channelPieMap.minVal}}</span>
        </el-row>
      </el-col>
      <el-col :span="12"
        class="single-chart-container">
        <div v-if="isAreaPieShow"
          class="submit-button-wrap">
          <img :src="noInfo"
            class="wh_100" />
        </div>
        <pie-chart v-else
          :height="'400px'"
          :width="'100%'"
          :id="'receivepie2'"
          :pieText="areaPieMap.title"
          :pieData="areaPieMap.pieData"></pie-chart>
        <el-row class="chartNum">{{subTitie}}最多的区域：
          <span class="item">{{areaPieMap.max}}</span>
          <span class="item fb">{{areaPieMap.maxVal}}</span>
        </el-row>
        <el-row class="chartNum">{{subTitie}}最少的区域：
          <span class="item">{{areaPieMap.min}}</span>
          <span class="item fb">{{areaPieMap.minVal}}</span>
        </el-row>
      </el-col>
    </el-row>-->
    <div class="line"></div>
    <el-row class="chart-container"
      style="height:550px;">
      <el-row :gutter="20"
        class="query_input_style">
        <el-col :span="4">
          <el-date-picker v-model="queryParam.startDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            size="small"
            style="width:100%;"
            placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-date-picker v-model="queryParam.endDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            size="small"
            style="width:100%;"
            placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
            @click="handleQueryLineData"
            size="small"
            class="query-search-button">
            <i class="fa fa-search"></i> 搜索</el-button>
        </el-col>
      </el-row>
      <el-row class="init ft_14">
        注：间隔最大不超过60天。
      </el-row>
      <!-- :height="'400px'"
          :width="'1300px'" -->
      <el-row class="chartWrap">
        <line-chart :height="'100%'"
          :width="'100%'"
          :id="'receiveLine'"
          :lineKind="lineKind"
          :lineTime="lineMap.lineTime"
          :lineName="lineName"
          :lineData="lineMap.lineData">
        </line-chart>
        <el-row class="chartNum">{{subTitie}}最多的日期：
          <span class="item">{{lineMap.max}}</span>
          <span class="item fb">{{lineMap.maxVal}}</span>
        </el-row>
        <el-row class="chartNum">{{subTitie}}最少的日期：
          <span class="item">{{lineMap.min}}</span>
          <span class="item fb">{{lineMap.minVal}}</span>
        </el-row>
      </el-row>
    </el-row>
  </div>

</template>
<script>
import PieChart from '@/components/Charts/PieChart.vue'
import LineChart from '@/components/Charts/LineChart.vue'
import couponAnalyService from '../../service/coupon-analysis-service.js'
import noInfo from '@/assets/images/noInfo.png'
export default {
  props: {
    doleNum: {
      type: [Number, String]
    },
    couponId: {
      type: String
    },
    useNum: {
      type: [Number, String]
    }
  },
  components: {
    PieChart,
    LineChart
  },
  computed: {
    classObj() {
      return {
        'ft-red': this.isActive && !this.error,
        'ft-green': this.error && this.error.type === 'fatal'
      }
    }
  },
  data() {
    return {
      noInfo,
      subTitie: '领取',
      dateRange: [],
      isChannelPieShow: false,
      isAreaPieShow: false,
      queryParam: {
        couponId: '',
        endDate: null,
        startDate: null
      },
      // 增长数
      dayPercent: '',
      weekPercent: '',
      monthPercent: '',
      // 饼图
      channelPieMap: {
        title: '',
        pieData: [],
        max: '',
        maxVal: null,
        min: '',
        minVal: null
      },
      areaPieMap: {
        title: '',
        pieData: [],
        max: '',
        maxVal: null,
        min: '',
        minVal: null
      },
      // 折线图
      lineKind: 'single',
      lineName: [],
      lineMap: {
        lineData: [],
        lineTime: [],
        title: '',
        max: '',
        maxVal: null,
        min: '',
        minVal: null
      }
    }
  },
  methods: {
    handleTimeChange(val) {
      this.queryParam.startDate = val[0]
      this.queryParam.endDate = val[1]
    },
    // 校验时间间隔不超过60天
    timeCheck() {
      let startTime = this.queryParam.startDate
      let endTime = this.queryParam.endDate

      let startDate = 0
      let endDate = 0

      let startTempArr = []
      let endTempArr = []

      if (startTime && startTime.length > 0) {
        let startArr = startTime.split(' ')

        const element1 = startArr[0]
        let tmp1 = element1.split('-')
        startTempArr = startTempArr.concat(tmp1)

        const element2 = startArr[1]
        let tmp2 = element2.split(':')
        startTempArr = startTempArr.concat(tmp2)

        startDate = new Date(
          startTempArr[0],
          startTempArr[1],
          startTempArr[2],
          startTempArr[3],
          startTempArr[4],
          startTempArr[5]
        )
      }

      if (endTime && endTime.length > 0) {
        let startArr = endTime.split(' ')

        const element1 = startArr[0]
        let tmp1 = element1.split('-')
        endTempArr = endTempArr.concat(tmp1)

        const element2 = startArr[1]
        let tmp2 = element2.split(':')
        endTempArr = endTempArr.concat(tmp2)

        endDate = new Date(
          endTempArr[0],
          endTempArr[1],
          endTempArr[2],
          endTempArr[3],
          endTempArr[4],
          endTempArr[5]
        )
      }

      if (startDate !== 0 && endDate !== 0) {
        if (startDate.getTime() >= endDate.getTime()) {
          this.$message({
            showClose: true,
            message: '开始时间应小于结束时间！',
            type: 'error'
          })
          return false
        } else if (
          endDate.getTime() >
          startDate.getTime() + 60 * 24 * 60 * 60 * 1000
        ) {
          this.$message({
            showClose: true,
            message: '时间间隔不超过60天！',
            type: 'error'
          })
          return false
        } else {
          return true
        }
      }
      return true
    },
    handleQueryLineData() {
      if (this.timeCheck()) {
        this.queryDoleAnalysisData('line')
      } else {
        return false
      }
    },
    queryDoleAnalysisData(type = 'both') {
      let self = this
      this.queryParam.couponId = this.couponId
      couponAnalyService
        .queryDoleAnalysisData(this.queryParam)
        .then(rsp => {
          self.rsp2chart(type, rsp)
        })
        .catch(e => {})
    },
    rsp2chart(type, rsp) {
      this.lineName = []
      this.lineMap = Object.assign({}, rsp.data.lineAnalyseData)
      this.lineName.push(this.lineMap.title)
      this.dayPercent = rsp.data.dayPercent || ''
      this.weekPercent = rsp.data.weekPercent || ''
      this.monthPercent = rsp.data.monthPercent || ''
      if (type === 'both') {
        this.channelPieMap = Object.assign({}, rsp.data.pieAnalyseDataList[0])
        this.areaPieMap = Object.assign({}, rsp.data.pieAnalyseDataList[1])
        if (!rsp.data.pieAnalyseDataList[0].pieData.length) {
          this.isChannelPieShow = true
        }
        if (!rsp.data.pieAnalyseDataList[1].pieData.length) {
          this.isAreaPieShow = true
        }
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.$on('analysisReady', function() {
        this.queryDoleAnalysisData()
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.chartNum {
  margin: 15px 0;
  font-size: 16px;
  color: #333;
  .item {
    margin: 0 10px;
  }
}
.chart-container {
  margin: 15px 0;
  .single-chart-container {
    margin: 15px 0;
    height: 100%;
  }
}
.init {
  color: #999;
  line-height: 2.4;
}
.wh_100 {
  height: 400px;
}
</style>
