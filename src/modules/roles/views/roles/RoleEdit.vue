<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="14">
        <el-form :model="record"
          ref="editForm"
          :rules="formRules">
          <el-form-item label="ID"
            prop="id"
            label-width="70px">
            <el-col :span="22">
              <el-input v-model="record.id"
                disabled></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="名称"
            prop="name"
            label-width="70px">
            <el-col :span="22">
              <el-input v-model="record.name" disabled></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="编码"
            prop="code"
            label-width="70px">
            <el-col :span="22">
              <el-input v-model="record.code" disabled></el-input>
            </el-col>
          </el-form-item>

          <el-row>
            <el-col :span="12">
              <el-form-item prop="usable"
                label="是否可用"
                label-width="70px">
                <el-switch v-model="record.usable"
                  active-value="1"
                  inactive-value="0"
                  disabled>
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="isSys"
                label="是否系统数据"
                label-width="100px">
                <el-switch v-model="record.isSys"
                  active-value="1"
                  inactive-value="0"
                  disabled>
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注"
            prop="remarks"
            label-width="70px">
            <el-col :span="22">
              <el-input type="textarea"
                v-model="record.remarks" disabled></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10">
        <el-row>
          <el-col :span="24">
            <label>角色菜单</label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-tree :data="authMenus"
              ref="menuTree"
              node-key="id"
              :default-expanded-keys="defaultExpandedKeys"
              :default-checked-keys="defaultCheckedKeys"
              :props="{label: 'name', children: 'childMenus'}"
              show-checkbox>
            </el-tree>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="pdb_20">
      <el-col :span="24"
        :class="{'text-center': true}">
        <el-button type="primary"
          size="mini"
          @click.native.prevent="handleSubmit">
          <i class="fa fa-save"></i> 保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import roleService from '../../service/role-service'
export default {
  name: 'RoleEdit',
  props: {
    mode: {
      type: String
    },
    record: {
      type: Object
    },
    authMenus: {
      type: Array
    }
  },
  data() {
    return {
      formRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }]
      },
      defaultExpandedKeys: [],
      defaultCheckedKeys: []
    }
  },
  watch: {
    authMenus: function() {
      this.init()
    }
  },
  methods: {
    init() {
      this.defaultExpandedKeys = this.authMenus.map(function(item) {
        return item.id
      })
      this.defaultCheckedKeys = []
      this.updateDefaultCheckedKeys(this.authMenus)
      this.$refs['menuTree'].setCheckedKeys(this.defaultCheckedKeys)
    },
    handleSubmit() {
      this.$refs['editForm'].validate(valid => {
        if (valid) {
          var checkedNodes = this.$refs['menuTree'].getCheckedNodes()
          var roleMenus = []
          checkedNodes.forEach(element => {
            roleMenus.push(element.id)
            if (element.parentIds) {
              var parentIds = element.parentIds.split('/')
              parentIds.forEach(p => {
                if (p && p.length > 0) {
                  roleMenus.push(p)
                }
              })
            }
          })

          var newRecord = Object.assign({}, this.record, { roleMenus })
          if (this.mode === 'add') {
            roleService.addData(newRecord).then(rsp => {
              this.$emit('after-edit')
            })
          } else {
            roleService.updateDataById(newRecord).then(rsp => {
              this.$emit('after-edit')
            })
          }
        } else {
          return false
        }
      })
    },
    updateDefaultCheckedKeys(menus) {
      for (var menu of menus) {
        if (menu.selected) {
          this.defaultCheckedKeys.push(menu.id)
        }
        if (menu.hasChildren) {
          this.updateDefaultCheckedKeys(menu.childMenus)
        }
      }
    },
    resetFields() {
      this.$refs['editForm'].resetFields()
    }
  },
  mounted() {
    this.init()
  }
}
</script>
