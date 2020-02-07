<template>
  <div class="app-container">
    <el-steps :active="active"
      finish-status="success"
      align-center
      simple>
      <el-step title="基本信息"
        icon="el-icon-circle-check-outline"></el-step>
    </el-steps>

    <el-card class="box-card">
      <div class="steps-form-con">
        <!-- 基本信息 -->
        <basic-info :codesFlag="codesFlag"
          :active="active"
          :couponID="couponID"
          :editType="editType"
          :status="status"
          :couponNum="couponNum"
          v-show="basicShow"
          @change-flag1="changeFlag1">
        </basic-info>
      </div>
    </el-card>

  </div>
</template>
<script>
import BasicInfo from './BasicInfo.vue'
export default {
  components: {
    BasicInfo
  },
  data() {
    return {
      // 组件传值
      couponID: this.$route.query.couponID,
      categoryName: this.$route.query.categoryName,
      editType: this.$route.query.editType,
      status: this.$route.query.status,
      couponNum: this.$route.query.couponNum,
      codesFlag: {},
      couponCategories: [],
      active: 0,
      // 分步flag
      step1Flag: false // 第1步结果
    }
  },
  computed: {
    // 基本信息
    basicShow: {
      get: function() {
        return this.active === 0
      }
    }
  },
  methods: {
    changeFlag1() {
      this.step1Flag = true
      this.next()
    },
    next() {
      if (this.active++ > 3) this.active = 0
    },
    previous() {
      if (this.active-- < 0) this.active = 0
    },
    done() {
      if (
        this.step1Flag &&
        this.step2Flag &&
        this.step3Flag
      ) {
        // 返回setup 刷新数据
        this.$router.push({
          path: '/case/case_list'
        })
      }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.steps-form-con {
  width: 86%;
  margin: 20px auto;
}
.other-form-con {
  width: 96%;
  margin: 20px auto;
}
</style>
