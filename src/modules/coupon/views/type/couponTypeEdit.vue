<template>
  <el-form :model="formData"
    label-width="100px"
    ref="editForm"
    :rules="formRules">
    <el-form-item label="类型名称："
      prop="categoryName">
      <el-input class="edit-dialog-content"
        v-model="formData.categoryName"
        disabled
        placeholder="请输入类型名称">
      </el-input>
    </el-form-item>
    <el-form-item label="类型状态："
      prop="status">
      <el-radio-group v-model="formData.status">
        <el-radio :label="1">启用</el-radio>
        <el-radio :label="0">停用</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
import couponCategoryService from '../../service/coupon-category-service.js'

export default {
  name: 'couponTypeEdit',
  mounted() {},
  props: {
    record: {
      type: Object
    },
    channels: {
      type: Array
    }
  },
  watch: {
    record: {
      handler: function(val, oldVal) {
        if (val) {
          this.formData = Object.assign(this.formData, val)
          this.checkedArr = this.formData.channelCodes
        }
      },
      deep: true
    }
  },
  data() {
    return {
      formData: this.record,

      channelList: this.channels,
      checkedArr: this.record.channelCodes,

      formRules: {
        categoryName: { required: true, message: '请输入类型名称', trigger: 'blur' },
        status: { required: true, message: '请选择类型状态', trigger: 'blur' },
        channelCodes: { required: true, message: '请选择渠道', trigger: 'blur' }
      }
    }
  },
  methods: {
    handleSubmit() {
      let params = JSON.parse(JSON.stringify(this.formData))
      if (!this.checkedArr || this.checkedArr.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择渠道',
          type: 'error'
        })
        return
      }
      params.channelCodes = this.checkedArr.join(',')
      let self = this
      this.$refs.editForm.validate(valid => {
        if (valid) {
          couponCategoryService.updateCouponInfo(params)
            .then(resp => {
              if (resp) {
                self.$message({
                  showClose: true,
                  message: '更新信息成功！',
                  type: 'success'
                })
                self.$emit('after-edit')
              }
            })
            .catch(e => {})
        }
      })
    },
    handleCancel() {
      this.$refs['editForm'].resetFields()
      this.$refs.editForm.clearValidate()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.edit-dialog-content {
  width: 70%;
}
</style>
