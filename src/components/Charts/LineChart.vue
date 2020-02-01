<template>
  <div :class="className"
    :id="id"
    :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '1300px'
    },
    height: {
      type: String,
      default: '400px'
    },
    lineTime: {
      type: Array
    },
    lineName: {
      type: Array
    },
    lineData: {
      type: Array
    },
    lineKind: {
      type: String
    }
  },
  data() {
    return {
      chart: null,
      series: ''
    }
  },
  watch: {
    lineTime: {
      handler: function(val, oldVal) {
        if (val.length) {
          this.lineKind === 'single' ? this.oneDSeries() : this.twoDSeries()
          this.initChart()
        }
      },
      deep: true
    }
  },
  mounted() {},
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    oneDSeries() {
      let self = this
      this.series = '['
      let i = 0
      this.lineName.forEach(function(e) {
        let temp = "{name:'" + e + "', type:'line', smooth:'true', data:["
        let j = 0
        self.lineData.forEach(function(d) {
          temp = temp + "'" + d + "'"
          if (j < self.lineTime.length - 1) temp = temp + ','
          j++
        })
        temp = temp + ']}'
        self.series = self.series + temp
        if (i < self.lineName.length - 1) self.series = self.series + ','
        i++
      })
      this.series = this.series + ']'
    },
    twoDSeries() {
      let self = this
      this.series = '['
      let i = 0
      this.lineName.forEach(function(e) {
        let j = 0
        let colors = ['#EEAD0E', '#20B2AA', '#AB82FF']
        let temp =
          "{name:'" +
          e +
          `', itemStyle : {
								normal : {
									lineStyle:{
										color: '${colors[i]}' }}}` +
          ", type:'line', smooth:'true', data:["
        self.lineData.forEach(function(d) {
          temp = temp + "'" + d.split(',')[i] + "'"
          if (j < self.lineTime.length - 1) {
            temp = temp + ','
          }
          j++
        })
        temp = temp + ']}'
        self.series = self.series + temp
        if (i < self.lineName.length - 1) self.series = self.series + ','
        i++
      })
      this.series = this.series + ']'
    },
    fakeEval(fn) {
      let Fn = Function
      return new Fn('return' + fn)()
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.lineName
        },
        color: ['#EEAD0E', '#20B2AA', '#AB82FF'],
        toolbox: {
          show: true,
          right: '50',
          feature: {
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        grid: {
          borderWidth: 0,
          x: 80,
          y: 45,
          y2: 40,
          x2: 30
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisLabel: {
              textStyle: {
                fontSize: '14',
                fontFamily: 'Microsoft Yahei'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#FFF',
                type: 'dashed'
              }
            },
            data: this.lineTime
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: this.fakeEval(this.series)
      })
    }
  }
}
</script>
