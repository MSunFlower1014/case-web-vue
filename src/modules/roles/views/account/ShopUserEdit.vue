<template>
  <div>
    <el-form :model="record"
      ref="editShopForm"
      :rules="formRules">
      <el-form-item label="账号"
        prop="username"
        label-width="80px">
        <el-col :span="22">
          <el-input disabled
            v-model="record.username"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="姓名"
        prop="realname"
        label-width="80px">
        <el-col :span="22">
          <el-input disabled
            v-model="record.realname"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item v-if="mode === 'add'"
        label="密码"
        label-width="80px"
        prop="password">
        <el-col :span="22">
          <el-input disabled
            type="password"
            v-model="record.password"
            auto-complete="off"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item v-if="mode === 'add'"
        label="确认密码"
        label-width="80px"
        prop="repassword">
        <el-col :span="22">
          <el-input disabled
            type="password"
            v-model="record.repassword"
            auto-complete="off"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="用户类型"
        prop="type"
        label-width="80px">
        <el-col :span="22">
          <el-select disabled
            v-model="record.type"
            placeholder="请选择">
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
          <el-input disabled
            v-model="record.email"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电话"
        prop="phone"
        label-width="80px">
        <el-col :span="22">
          <el-input disabled
            v-model="record.phone"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="角色"
        label-width="80px">
        <el-col :span="22">
          <el-select disabled
            v-model="selectedRoles"
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
          <el-input disabled
            v-model="record.orgName"></el-input>
          <!-- <ef-dynamic-tree-select v-model="record.organizationId"
            prefix-url="/api/sys/organization" /> -->
        </el-col>
      </el-form-item>
      <el-form-item align="center">
        <el-col :span="24">
          <el-button type="primary"
            size="mini"
            @click.native.prevent="handleSure">确定</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import EfDynamicTreeSelect from '@/components/EfDynamicTreeSelect'
// import userService from '../../service/user-service.js'
import roleService from '../../service/role-service.js'
// import organizationService from '../../service/organization-service'
export default {
  name: 'ShopUserEdit',
  components: {
    EfDynamicTreeSelect
  },
  props: {
    mode: {
      type: String
    },
    record: {
      type: Object
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
        ]
      },
      typeOptions: [
        {
          value: '0',
          label: '默认'
        },
        {
          value: '1',
          label: '渠道经理'
        },
        {
          value: '2',
          label: '渠道商'
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
    resetFields() {
      this.$refs['editShopForm'].resetFields()
    },
    handleSure() {
      this.$emit('after-edit-shop')
    }
  },
  mounted() {
    // 初始化
    this.init()
  }
}
</script>
