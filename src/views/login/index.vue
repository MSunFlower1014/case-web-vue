<template>
  <div class="login-container">
    <app-banner :listImg="listImg"></app-banner>
    <div class="login-wrap">
      <el-row>
        <el-col :span="14">
          <div class="login-name">
            <div class="dis_block mrgt_8 ft_1">卫生信息平台</div>
            <div class="dis_block mrgt_2 ft_2"
              style="line-height: 1.8">
              <br> -基于健康档案的区域卫生信息平台
              <br> -是指以健康档案信息的采集、存储为基础，能够自动产生、分发、推送工作任务清单，支持区域范围内不同医疗卫生机构
              <br> -以及相关部门业务应用系统间实现互联互通、数据共享和业务整合的信息平台
              <br> -平台主要以服务居民为中心，同时满足卫生管理和辅助决策的需求
            </div>
            </div>
        </el-col>
        <el-col :span="10">
          <div class="login-form">
            <el-row class="login-top">
              <el-col :span="8">
                <div class="login-img">
        
                  <span>用户登录</span>
                </div>
              </el-col>
            </el-row>
            <div class="input-line">
              <el-form autoComplete="on"
                :model="loginForm"
                :rules="loginRules"
                ref="loginForm"
                label-position="right"
                label-width="80px">
                <el-form-item label="账号"
                  prop="userName"
                  class="input-container">
                  <el-input name="userName"
                    type="text"
                    v-model="loginForm.userName"
                    placeholder="用户名或手机号码" />
                </el-form-item>

                <el-form-item label="密码"
                  prop="password"
                  class="input-container">
                  <el-input name="password"
                    :type="passwordType"
                    v-model="loginForm.password"
                    placeholder="6-20个大小写英文字母、符号或数字" />
                </el-form-item>

                <el-form-item label="验证码"
                  prop="captcha"
                  class="input-container">
                  <el-input name="captcha"
                    type="text"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.captcha"
                    placeholder="请输入图形验证码"
                    :maxlength="5"></el-input>
                  <img :src.sync="jcaptcha"
                    @click="changeCaptcha"
                    class="validate" />
                </el-form-item>

                  <el-form-item prop="rememberMe"
                    class="input-container">
                    <el-button class="login-button"
                      :loading="loading"
                      @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>
                  </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Banner from './Banner.vue'
import a from '@/assets/images/bg_01.jpeg'
import b from '@/assets/images/bg_02.jpeg'
import c from '@/assets/images/bg_03.jpeg'
import d from '@/assets/images/bg_04.jpeg'
import { generateUUID } from '@/utils/index'

import { setToken } from '@/utils/auth'
import { getRandom } from '@/utils/security'

const baseURL = process.env.BASE_API
export default {
  components: {
    'app-banner': Banner
  },
  name: 'Login',
  data() {
    return {
      listImg: [
        {
          url: a
        },
        {
          url: b
        },
        {
          url: c
        },
        {
          url: d
        }
      ],
      loginForm: {
        userName: '',
        password: '',
        rememberMe: true,
        mobileLogin: false,
        captcha: ''
      },
      loginRules: {
        userName: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }],
        captcha: { required: true, trigger: 'blur' }
      },
      passwordType: 'password',
      loading: false,
      // jcaptcha: `${baseURL}/api/platform/validateCode`,
      jcaptcha: `${baseURL}/api/platform/validateCode`,
      activeTag: 0
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      let self = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.loginForm.password = this.loginForm.password
          this.$store
            .dispatch('system/login/login', JSON.stringify(this.loginForm))
            .then(response => {
              // if (response.respCode === '0000') {
              setToken(getRandom(32))
              self.loading = false
              self.$router.push({ path: '/' })
              // }
            })
            .catch(e => {
              this.changeCaptcha()
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    changeCaptcha() {
      const uuid = generateUUID()
      this.jcaptcha = `${baseURL}/api/platform/validateCode?${uuid}`
    },
    blobToBase64(blob, callback) {
      let a = new FileReader()
      a.onload = function(e) {
        callback(e.target.result)
      }
      a.readAsDataURL(blob)
    }
  },
  mounted() {
    this.changeCaptcha()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/assets/styles/variables.scss';
/* reset element-ui css */
#app {
  overflow: hidden;
}
.mrgt_2 {
  margin-top: 2%;
}
.mrgt_8 {
  margin-top: 8%;
}
.login-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  .login-wrap {
    background-color: rgba(0, 0, 0, 0.45);
    width: 100%;
    display: block;
    margin: 9.5% auto 0;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    .login-name {
      margin: 0 10%;
      color: #fff;
      letter-spacing: 0.4rem;
    }
    .login-form {
      padding: 20px 2%;
      background-color: #fff;
      .login-top {
        width: 88%;
        display: block;
        margin: 0 auto 20px;
        overflow: hidden;
        .login-img {
          color: #3ac2d2;
          font-size: 1.35rem;
          height: 50px;
          line-height: 50px;
          img {
            margin-right: 5px;
            vertical-align: middle;
          }
          span {
            height: 100%;
            vertical-align: middle;
            line-height: 60px;
          }
        }

        .login-type {
          float: right;
          button {
            width: 118px;
            margin: 10px 0 10px 10px;
            font-size: 14px;
          }
        }
      }

      .input-line {
        width: 88%;
        margin: 0 auto;
        height: 100%;
        .input-container {
          width: 100%;
          display: inline-block;
          // margin: 0.3em 0;
          margin: 0.8em 0;
          vertical-align: middle;
          position: relative;
          input {
            color: #606266 !important;
            float: left;
            width: 100%;
            display: block;
            font-size: 1rem;
            line-height: 32px;
            background: 0 0;
            border-width: 0 0 1px 0;
            outline: none;
            border-bottom: #b9c1ca 1px solid;
            border-radius: 0;
            -webkit-order: 2;
            -ms-flex-order: 2;
            order: 2;
            -ms-flex-preferred-size: 30px;
            box-sizing: border-box;
            transition: border-bottom 0.3s, border-color 0.3s, border-width 0.3s,
              border 0.3s ease-in-out;
          }
          .el-select {
            .el-icon-arrow-up {
              display: none;
            }
          }
          .el-select-dropdown {
            min-width: 250px !important;
          }
          .validate {
            width: 128px;
            height: 50px;
            position: absolute;
            right: 2%;
            bottom: 40%;
            cursor: pointer;
          }
        }
        .login-button {
          float: right;
          width: 160px;
          height: 50px;
          text-align: center;
          background-color: #fff;
          border: #3ac2d2 1px solid;
          color: #3ac2d2;
          font-size: 1.15rem;
          letter-spacing: 5px;
          box-shadow: 0 1px 4px 0 #3ac2d2;
          -webkit-border-radius: 40px;
          -moz-border-radius: 40px;
          border-radius: 40px;
        }
      }
    }
  }
}
.activeBtn {
  background-color: #ecf8f6;
  border-color: #c6ebf2;
  color: #42bcd3;
}
</style>
