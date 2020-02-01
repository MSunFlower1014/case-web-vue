<template>
  <el-form :model="formData"
    label-width="100px"
    ref="editForm"
    :rules="formRules">
    <el-form-item label="规则类型："
      prop="targetType">
      <el-select class="edit-dialog-content"
        v-model="formData.targetType"
        placeholder="请选择">
        <el-option v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="规则名称："
      prop="ruleName">
      <el-input class="edit-dialog-content"
        placeholder="请输入规则名称"
        v-model="formData.ruleName"></el-input>
    </el-form-item>
    <el-form-item label="上传文件："
      prop="ruleVal">
      <div class="picAdd">
        <span class="uploadWrap">
          <input type="file"
            class="fileWrap el-input__inner"
            accept="text/plain"
            @change="handleFileChange">
          <input type="text"
            class="textWrap el-input__inner"
            id="textfield"
            :value="formData.ruleVal">
          <input type="button"
            class="btnWrap uploadBtn"
            value="选择上传...">
        </span>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import ruleService from '../../service/rules-service.js'

export default {
  name: 'channelEdit',
  props: {
    modelType: {
      type: String
    },
    record: {
      type: Object,
      default: {
        ruleVal: '',
        ruleName: '',
        targetType: null
      }
    }
  },
  watch: {
    record: {
      handler: function(val, oldVal) {
        if (val) {
          this.formData = Object.assign(this.formData, val)
          let nameArr = this.formData.ruleVal.split('/')
          this.formData.ruleVal = nameArr[nameArr.length - 1]
        }
      },
      deep: true
    }
  },
  mounted() {
    let nameArr = this.formData.ruleVal.split('/')
    this.formData.ruleVal = nameArr[nameArr.length - 1]
  },
  data() {
    const reg = /^\s*$/g
    const validatorName = (rule, value, callback) => {
      if (!value || reg.test(value)) {
        callback(new Error('请输入规则名称'))
      } else {
        callback()
      }
    }
    return {
      targetUserFile: null,

      typeList: [
        {
          value: 3,
          label: '目标用户'
        }, {
          value: 2,
          label: '白名单用户'
        }, {
          value: 1,
          label: '黑名单用户'
        }
      ],
      formData: this.record,
      formRules: {
        ruleName: [
          { required: true, validator: validatorName, trigger: 'blur' }
        ],
        targetType: [
          { required: true, message: '请选择规则类型', trigger: 'blur' }
        ],
        ruleVal: [
          { required: true, message: '请上传文件', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleFileChange(e) {
      let file = null
      if (typeof e.target === 'undefined') file = e[0]
      else file = e.target.files[0]

      this.formData.ruleVal = file.name
      this.targetUserFile = file
    },
    handleSubmit() {
      let fd = new FormData()
      fd.append('targetUserFile', this.targetUserFile)
      let tipMsg = ''
      if (this.modelType === 'ADD') {
        tipMsg = '新增信息成功！'
      } else {
        tipMsg = '更新信息成功！'
      }
      let self = this

      this.$refs.editForm.validate(valid => {
        if (valid) {
          if (this.modelType === 'ADD') {
            ruleService.createRuleData(fd, this.formData.ruleName, this.formData.targetType)
              .then(resp => {
                self.$message({
                  showClose: true,
                  message: tipMsg,
                  type: 'success'
                })
                self.$emit('after-edit')
              })
              .catch(e => {})
          } else {
            ruleService.updateRuleData(fd, this.formData.id, this.formData.ruleName, this.formData.targetType)
              .then(resp => {
                self.$message({
                  showClose: true,
                  message: tipMsg,
                  type: 'success'
                })
                self.$emit('after-edit')
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
.picAdd {
  width: 100%;
  .uploadWrap {
    height: 30px;
    overflow: hidden;
    outline: 0 none;
    position: relative;
    z-index: 1;
    display: block;
    .fileWrap {
      width: 99.5%;
      cursor: pointer;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
    .textWrap {
      width: 80%;
      border-radius: 4px 0px 0px 4px;
      float: left !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    .btnWrap {
      width: 20%;
      float: left !important;
    }
    .uploadBtn {
      height: 30px;
      border-radius: 0 2px 2px 0;
      border: 0;
      background-color: #d3d3d3;
    }
  }
}
.edit-dialog-content {
  width: 70%;
}
.upload-component {
  height: 100%;
}
</style>