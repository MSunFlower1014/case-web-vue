<template>
  <el-form :model="formData"
    label-width="100px"
    ref="editForm"
    :rules="formRules">
    <el-form-item label="渠道名称："
      prop="channelName">
      <el-input class="edit-dialog-content"
        v-model="formData.channelName"></el-input>
    </el-form-item>
    <el-form-item label="渠道编码："
      prop="channelCode">
      <el-input class="edit-dialog-content"
        v-model="formData.channelCode"></el-input>
    </el-form-item>
    <el-form-item label="渠道类型："
      prop="status">
      <el-select class="edit-dialog-content"
        v-model="formData.status"
        placeholder="请选择">
        <el-option v-for="item in statusList"
          :key="item.status"
          :label="item.name"
          :value="item.status">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import channelService from '../../service/channel-service.js'

export default {
  name: 'channelEdit',
  props: {
    modelType: {
      type: String
    },
    record: {
      type: Object,
      default: {
        remarks: '',
        createBy: '',
        createDate: '',
        updateBy: '',
        updateDate: '',
        delFlag: '',
        id: '',
        channeCode: '',
        channeName: '',
        status: null
      }
    }
  },
  watch: {
    record: {
      handler: function(val, oldVal) {
        if (val) {
          this.formData = Object.assign({}, val)
        }
      },
      deep: true
    }
  },
  data() {
    const reg = /^\s*$/g
    const validatorName = (rule, value, callback) => {
      if (!value || reg.test(value)) {
        callback(new Error('请输入渠道名称'))
      } else if (value.length > 20) {
        callback(new Error('长度不超过20个字符'))
      } else {
        callback()
      }
    }
    const validatorCode = (rule, value, callback) => {
      if (!value || reg.test(value)) {
        callback(new Error('请输入渠道编码'))
      } else if (value.length > 20) {
        callback(new Error('长度不超过20个字符'))
      } else {
        callback()
      }
    }

    return {
      statusList: [
        {
          status: 0,
          name: '停用'
        },
        {
          status: 1,
          name: '启用'
        }
      ],
      formData: this.record,
      formRules: {
        channelName: [
          { required: true, validator: validatorName, trigger: 'blur' }
        ],
        channelCode: [
          { required: true, validator: validatorCode, trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择规则类型', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      let params = this.formData
      let self = this
      this.$refs.editForm.validate(valid => {
        if (valid) {
          if (self.modelType === 'ADD') {
            channelService
              .addData(params)
              .then(resp => {
                self.$message({
                  showClose: true,
                  message: '新增信息成功！',
                  type: 'success'
                })
                self.$emit('after-edit')
              })
              .catch(e => {})
          } else {
            channelService
              .updateDataById(params)
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