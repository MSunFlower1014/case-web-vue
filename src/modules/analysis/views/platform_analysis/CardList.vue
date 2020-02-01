<template>
  <el-card class="box-card self-card"
    :body-style="{ padding: '0px'}">
    <div slot="header"
      class="clearfix card_header">
      <span class="fb ft_14">{{title}}</span>
    </div>
    <el-table :data="record"
      style="width: 100%"
      fit
      :show-header="false">
      <el-table-column prop="couponName"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="couponCount"
        align="right">
        <template slot-scope="scope">
          <span class="num">{{scope.row.couponCount}}</span>
          <!-- <span :class="scope.row.couponCount.substr(0, 1) === '+' ? 'ft-red' : 'ft-green'">{{scope.row.couponCount}}%</span> -->
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    record: {
      type: Array
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.num {
  color: #fa6f5c;
}
</style>
