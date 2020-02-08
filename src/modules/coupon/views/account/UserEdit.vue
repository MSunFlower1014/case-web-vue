<template>
  <div>
    <el-form :model="userObject"
      ref="editForm"
      :rules="formRules" >
      <el-form-item label="姓名"
        prop="userName"
        label-width="80px">
        <el-col :span="22">
          <el-input v-model="userObject.userName" ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="医院名称" prop="hospital"
        label-width="80px">
        <el-col :span="22">
          <el-input v-model="userObject.hospital" ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item 
        label="密码"
        prop="password"
        label-width="80px">
        <el-col :span="22">
          <el-input type="password"
            v-model="userObject.password"
            auto-complete="off"  ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item 
        label="确认密码"
        prop="repassword"
        label-width="80px">
        <el-col :span="22">
          <el-input type="password"
            v-model="userObject.repassword"
            auto-complete="off"  ></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="用户类型"
        prop="type"
        label-width="80px">
        <el-col :span="22">
          <el-select v-model="userObject.levle"
            placeholder="请选择" >
            <el-option v-for="item in levelUtils"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
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
import productsService from '@/modules/products/service/products-service.js'
import { validateEmail } from '@/utils/validate.js'
import couponService from '../../service/coupon-service'
export default {
  name: 'UserEdit',
  props: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userObject.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userObject: {},
      formRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        hospital: [
          { required: true, message: '请输入医院名称', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        repassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      },
      levelUtils: [1,2,3,4,5,6,7,8,9,10]
    }
  },
  watch: {},
  methods: {
    handleSubmit() {
      this.loading1 = true
      let formData = new FormData()
      formData.append('userEntity', JSON.stringify(this.userObject))
      couponService
      .saveUser(formData)
      .then(rsp => {
        this.loading1 = false
        if(rsp.resultCode==0){
          this.$message({
            showClose: true,
            message: '保存账号信息成功！',
            type: 'success'
          })
          this.$router.go(0)
        }else{
          this.$message({
            showClose: true,
            message: rsp.resultMessage,
            type: 'error'
          })
        }
      }).catch(error => {
        this.loading1 = false
        this.$message({
          showClose: true,
          message: '保存账号信息失败！',
          type: 'error'
        })
      })
    }
  },
  mounted() {}
}
</script>
