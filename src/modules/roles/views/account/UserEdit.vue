<template>
  <div>
    <el-form :model="record"
      ref="editForm"
      :rules="formRules" :disabled="mode !== 'add'">
      <!-- <el-form-item label="ID"
        prop="id"
        label-width="80px">
        <el-col :span="22">
          <el-input v-model="record.id"
            disabled></el-input>
        </el-col>
      </el-form-item> -->
      <el-form-item label="账号"
        prop="username"
        label-width="80px">
        <el-col :span="22">
          <el-input v-model="record.username" ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="姓名"
        prop="realname"
        label-width="80px">
        <el-col :span="22">
          <el-input v-model="record.realname" ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item v-if="mode === 'add'"
        label="密码"
        label-width="80px"
        prop="password">
        <el-col :span="22">
          <el-input type="password"
            v-model="record.password"
            auto-complete="off"  ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item v-if="mode === 'add'"
        label="确认密码"
        label-width="80px"
        prop="repassword">
        <el-col :span="22">
          <el-input type="password"
            v-model="record.repassword"
            auto-complete="off"  ></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="用户类型"
        prop="type"
        label-width="80px">
        <el-col :span="22">
          <el-select v-model="record.type"
            placeholder="请选择" >
            <el-option v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="邮箱"
        prop="email"
        label-width="80px">
        <el-col :span="22">
          <el-input v-model="record.email"  ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电话"
        prop="phone"
        label-width="80px">
        <el-col :span="22">
          <el-input v-model="record.phone"  ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="角色"
        label-width="80px">
        <el-col :span="22">
          <el-select v-model="selectedRoles"
            style="width: 100%"
            multiple
            placeholder="请选择">
            <el-option v-for="item in allRoles"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="组织"
        label-width="80px">
        <el-col :span="22">
          <!--<el-input v-model="record.organizationName" ></el-input>-->
          <ef-dynamic-tree-select v-model="record.organizationId"
            prefix-url="/api/sys/organization" />
        </el-col>
      </el-form-item>
      <el-form-item align="center"
        class="pdb_20">
        <el-col :span="24">
          <el-button type="primary"
            size="mini"
            @click.native.prevent="handleSubmit">
            确定</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import EfDynamicTreeSelect from '@/components/EfDynamicTreeSelect'
import userService from '../../service/user-service.js'
import roleService from '../../service/role-service.js'
const PATTERN_CHINAMOBILE = /^1(3[4-9]|5[012789]|8[23478]|4[7]|7[8]|9[8])\d{8}$/
// import organizationService from '../../service/organization-service'
import { validateEmail } from '@/utils/validate.js'
export default {
  name: 'UserEdit',
  components: {
    EfDynamicTreeSelect
  },
  props: {
    mode: {
      type: String
    },
    record: {
      type: Object,
      realname: ''
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.record.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateEmaiL = (rule, value, callback) => {
      if (value === null || value === '') {
        callback()
      } else {
        if (!validateEmail(value)) {
          callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      }
    }
    var validatePhone = (rule, value, callback) => {
      if (value === null || value === '') {
        callback()
      } else {
        if (!PATTERN_CHINAMOBILE.test(value)) {
          callback(new Error('请输入正确的移动手机号码'))
        } else {
          callback()
        }
      }
    }
    return {
      allRoles: [],
      selectedRoles: [],
      selectedOrganizationId: ['6a51af3bd65c43079e2fb92c13380c9c'],
      formRules: {
        realname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        repassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        email: [{ validator: validateEmaiL, trigger: 'blur' }],
        phone: [{ required: true, validator: validatePhone, trigger: 'blur' }]
      },
      typeOptions: [
        {
          value: '0',
          label: '平台运营管理平台用户'
        },
        {
          value: '1',
          label: 'B端渠道商用户'
        },
        {
          value: '2',
          label: 'B端码店店主用户'
        }
      ]
    }
  },
  watch: {
    record: function(newValue, oldValue) {
      if (newValue.id !== oldValue.id) {
        this.init()
      }
    }
  },
  methods: {
    init() {
      // 加载角色信息
      roleService.getAllRoles().then(rspData => {
        this.allRoles = rspData.data
      })
      if (this.record.id) {
        roleService.getRolesByUserId(this.record.id).then(rspData => {
          this.selectedRoles = rspData.data.map(item => {
            return item.id
          })
        })
      } else {
        this.selectedRoles = []
      }
    },
    handleSubmit() {
      this.$emit('after-edit')
      this.$refs['editForm'].validate(valid => {
        if (valid) {
          // 设定用户的角色
          this.record.roles = this.selectedRoles.map(item => {
            return {
              id: item
            }
          })
          if (this.mode === 'add') {
            console.info(this.record)
            userService.addUserInfo(this.record).then(rsp => {
              this.$emit('after-edit')
              this.$router.go(0)
            })
          } else {
            userService.updateDataById(this.record).then(rsp => {
              this.$emit('after-edit')
            })
          }
        } else {
          if (this.mode === 'add') {
            this.$message({
              showClose: true,
              message: '保存账号信息失败！',
              type: 'error'
            })
          }
          return false
        }
      })
    },
    resetFields() {
      this.$refs['editForm'].resetFields()
    }
  },
  mounted() {
    // 初始化
    this.init()
  }
}
</script>
