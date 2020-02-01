<template>
  <el-form :model="formData"
    ref="editForm"
    :rules="formRules"
    label-position="right"
    label-width="20%">
    <el-form-item label="缓存Key:"
      prop="cacheKey">
      <el-input v-model="formData.cacheKey"
        style="width:80%;"></el-input>
    </el-form-item>
    <el-form-item label="数据结构:"
      prop="cacheFormat">
      <el-input v-model="formData.cacheFormat"
        style="width:80%;"></el-input>
    </el-form-item>
    <el-form-item label="状态:"
      prop="cacheStatus">
      <el-select v-model="formData.cacheStatus"
        style="width:80%;"
        size="small"
        placeholder="请选择">
        <el-option v-for="item in cachestatuses"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
const reg = /^\s*$/g
const PATTERN_KEY = /^[a-zA-Z0-9\_]{3,60}$/
const validateKey = (rule, value, callback) => {
  if (!value || reg.test(value) || !PATTERN_KEY.test(value)) {
    callback(new Error('3-60位字符，可由英文、数字及“_”组成。'))
  } else {
    callback()
  }
}
import cacheManageService from '../../service/cache-manage-service.js'
export default {
  name: 'cacheEdit',
  props: {
    record: {
      type: Object
    },
    mode: {
      type: String
    }
  },
  data() {
    return {
      formData: {},
      formRules: {
        cacheKey: [{ required: true, validator: validateKey, trigger: 'blur' }]
      },
      cachestatuses: [
        {
          value: 0,
          label: '启用'
        },
        {
          value: 1,
          label: '停用'
        }
      ]
    }
  },
  methods: {
    handleSubmit() {
      let self = this
      let params = this.formData
      params.cacheDes = ''
      this.$refs['editForm'].validate(valid => {
        if (valid) {
          if (self.mode === 'add') {
            cacheManageService
              .addData(params)
              .then(rsp => {
                if (rsp) {
                  self.$message({
                    showClose: true,
                    message: '新增信息成功！',
                    type: 'success'
                  })
                  self.$emit('after-edit')
                }
              })
              .catch(e => {
                self.$emit('after-edit')
              })
          } else {
            cacheManageService
              .updateDataById(params)
              .then(rsp => {
                if (rsp) {
                  self.$message({
                    showClose: true,
                    message: '编辑信息成功！',
                    type: 'success'
                  })
                  self.$emit('after-edit')
                }
              })
              .catch(e => {
                self.$emit('after-edit')
              })
          }
        }
      })
    },
    handleReturn() {
      this.$refs['editForm'].resetFields()
      this.$emit('after-edit')
    }
  },
  mounted() {},
  watch: {
    record: {
      handler: function(val, oldVal) {
        this.formData = Object.assign({}, this.record)
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
