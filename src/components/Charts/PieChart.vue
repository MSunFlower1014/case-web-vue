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
      default: '800px'
    },
    height: {
      type: String,
      default: '400px'
    },
    pieText: {
      type: String
    },
    pieData: {
      type: Array
    }
  },
  data() {
    return {
      chart: null,
      labelText: {
        normal: {
          label: {
            show: true,
            formatter: '{b}\n{c} ({d}%)'
          }
        }
      },
      params: ''
    }
  },
  computed: {
    pieDataParam() {
      let arr = []
      this.pieData.forEach(item => {
        arr.push(item.label)
      })
      return arr
    },
    pieDataValues() {
      let self = this
      let temp = ''
      let i = 0
      this.pieData.forEach(item => {
        i++
        temp += `[{value:` + item.value + `, name:'` + item.label + `'}`
        if (i < self.pieData.length) temp += `,`
      })
      temp += `]`
      return temp
    }
  },
  watch: {
    pieData: {
      handler: function(val, oldVal) {
        if (val.length) {
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
    fakeEval(fn) {
      let Fn = Function
      return new Fn('return' + fn)()
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        title: {
          text: this.pieText,
          subtext: '',
          x: 'left',
          textStyle: {
            fontSize: '14',
            fontFamily: 'Microsoft Yahei',
            color: '#1EBE79'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        color: ['#EE7600', '#20B2AA', '#AB82FF', '#63B8FF', '#3A5FCD'],
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'bottom',
          data: this.pieDataParam
        },
        toolbox: {
          show: true,
          right: '50',
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: this.pieText,
            type: 'pie',
            radius: ['15', '65%'],
            center: ['50%', '50%'],
            itemStyle: this.labelText,
            data: this.fakeEval(this.pieDataValues)
          }
        ]
      })
    }
  }
}
</script>
