<template>
  <div>
    <el-form :model="record"
      ref="editForm"
      :rules="formRules"
      label-width="100px">
      <!-- <el-form-item label="ID"
        prop="id">
        <el-col :span="22">
          <el-input v-model="record.id"
            disabled></el-input>
        </el-col>
      </el-form-item> -->
      <el-form-item label="名称"
        prop="name">
        <el-col :span="22">
          <el-input v-model="record.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="链接"
        prop="url">
        <el-col :span="22">
          <el-input v-model="record.url"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="权限"
        prop="permission">
        <el-col :span="22">
          <el-input v-model="record.permission"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="图标"
        prop="menuIcon">
        <el-col :span="22">
          <el-input v-model="record.menuIcon"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="排序"
        prop="sort">
        <el-col :span="22">
          <el-input-number v-model="record.sort"
            class="ef-input-number"
            controls-position="right"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item prop="isshow"
        label="是否显示">
        <el-col :span="22">
          <el-switch v-model="record.isshow"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </el-col>
      </el-form-item>
      <el-form-item class="pdb_20">
        <el-col :offset="8">
          <el-button size="mini"
            @click.native.prevent="handleCancel">
            <i class="fa fa-undo"></i> 取 消</el-button>
          <el-button type="primary"
            @click.native.prevent="handleSubmit"
            size="mini">
            <i class="fa fa-save"></i> 保存</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import menuService from '../../service/menu-service'

export default {
  name: 'MenuEdit',
  props: {
    mode: {
      type: String
    },
    record: {
      type: Object
    }
  },
  data() {
    return {
      formRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleCancel() {
      this.resetFields()
      this.$emit('after-edit')
    },
    handleSubmit() {
      this.$refs['editForm'].validate(valid => {
        if (valid) {
          let newRecord = Object.assign({}, this.record, {
            parent: null,
            children: null
          })
          if (this.mode === 'add') {
            menuService.addData(newRecord).then(rsp => {
              this.$emit('after-edit')
            })
          } else {
            menuService.updateDataById(newRecord).then(rsp => {
              this.$emit('after-edit')
            })
          }
        } else {
          return false
        }
      })
    },
    resetFields() {
      this.$refs['editForm'].resetFields()
    }
  },
  mounted() {
    this.record.isshow = 1
  },
  watch: {
    mode(val, oldVal) {
      if (val) {
        if (val === 'add') this.record.isshow = 1
      }
    }
  }
}
</script>
