<template>
  <div class="wrap four">
    <div class="analysisName">{{title}}</div>
    <div class="analysisNum">{{num}}</div>
    <div class="analysisNote">
      <el-select v-model="countCycle"
        class="selectBox"
        size="small"
        @change="queryCouponPercent"
        placeholder="请选择"
        style="width:110px;">
        <el-option v-for="item in compDateOpts"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span :class="percentNum.indexOf('-') < 0 ? 'ft-green' : 'ft-red'">{{percentNum.substr(0, 1) === '-' ? percentNum : `+${percentNum}`}}</span>
    </div>
  </div>
</template>
<script>
import platAnalyService from '../../service/plat-analysis-service.js'
export default {
  props: {
    index: {
      type: Number
    },
    title: {
      type: String
    },
    num: {
      type: Number
    },
    percent: {
      type: String
    }
  },
  data() {
    return {
      countCycle: 'day',
      percentNum: '',
      compDateOpts: [
        {
          value: 'day',
          label: '较昨天'
        },
        {
          value: 'week',
          label: '较上周'
        },
        {
          value: 'month',
          label: '较上月'
        }
      ]
    }
  },
  methods: {
    queryCouponPercent() {
      let self = this
      let queryParams = {
        type: this.index,
        countCycle: this.countCycle
      }
      platAnalyService
        .queryCouponPercent(queryParams)
        .then(rsp => {
          if (rsp.data.percent !== '' && rsp.data.percent != null) self.percentNum = rsp.data.percent
          else self.percentNum = '0%'
        })
        .catch(e => {})
    }
  },
  watch: {
    percent: {
      handler: function(val, oldVal) {
        if (val !== '') {
          this.percentNum = val
        } else {
          this.percentNum = '0%'
        }
      },
      deep: true
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.wrap {
  display: inline-block;
  border: #edf8f6 1px solid;
  width: 100%;
}
.four {
  // width: 22.5%;
  margin: 1% 1%;
  background-color: #f7fbfa;
}
.analysisName {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0 10px;
}
.analysisNum {
  text-align: center;
  font-size: 16px;
  margin: 20px 0 10px;
}
.analysisNote {
  margin: 20px 0;
  .selectBox {
    display: inline-block;
    width: 100px;
    padding: 5px 5px;
    margin-left: 16%;
  }
  .data {
    display: inline-block;
    margin-left: 10px;
    line-height: 30px;
  }
}
</style>
