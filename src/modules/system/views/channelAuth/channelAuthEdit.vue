<template>
  <el-form :model="formData"
    label-width="100px"
    ref="editForm"
    :rules="formRules">
    <el-form-item label="渠道编码："
      prop="channelCode">
      <el-select class="edit-dialog-content"
        v-model="formData.channelCode"
        placeholder="请选择">
        <el-option v-for="item in channelList"
          :key="item.channelCode"
          :label="item.channelCode"
          :value="item.channelCode">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="签名："
      prop="signature">
      <el-input class="edit-dialog-content"
        v-model="formData.signature"></el-input>
    </el-form-item>
    <el-form-item label="IP："
      prop="ip">
      <el-input class="edit-dialog-content"
        v-model="formData.ip"></el-input>
    </el-form-item>
    <el-form-item label="状态："
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
import channelAuthService from '../../service/channelAuth-service.js'
import channelService from '../../service/channel-service.js'

export default {
  name: 'channelAuthEdit',
  props: {
    modelType: {
      type: String
    },
    record: {
      type: Object,
      default: {
        createBy: '',
        createDate: '',
        updateBy: '',
        updateDate: '',
        delFlag: '',
        id: '',
        channelCode: null,
        signature: '',
        ip: '',
        status: null
      }
    }
  },
  watch: {
    record: {
      handler: function(val, oldVal) {
        if (val) {
          this.formData = Object.assign(this.formData, val)
        }
      },
      deep: true
    }
  },
  data() {
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
      channelList: [],
      formData: this.record,
      formRules: {
        channelCode: [
          { required: true, message: '请选择渠道编码', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择渠道状态', trigger: 'blur' }]
      }
    }
  },
  methods: {
    init() {
      // 加载渠道信息
      channelService.getAllChannel().then(rspData => {
        this.channelList = rspData.data
      })
    },
    handleSubmit() {
      let params = this.formData
      let self = this
      this.$refs.editForm.validate(valid => {
        if (valid) {
          if (self.modelType === 'ADD') {
            channelAuthService
              .addChannelAuthData(params)
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
            channelAuthService
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
  },
  mounted() {
    // 初始化
    this.init()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.edit-dialog-content {
  width: 70%;
}
</style>