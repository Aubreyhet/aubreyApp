<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form
        ref="loginFormRef"
        :rules="LoginFormRules"
        :model="loginForm"
        label-width="80px"
        class="login_form"
      >
        <el-form-item label="账号" prop="j_number">
          <el-input v-model="loginForm.j_number" prefix-icon="el-icon-search" placeholder="请输入工号"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-search"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="tetscode">
          <el-input
            style="width:30%;margin-right:20px"
            v-model="loginForm.testcode"
            placeholder="请输入验证码"
            :disabled="testCode.disable"
          ></el-input>
          <el-button
            type="primary"
            @click="getCode"
            :disabled="getCodeBtn.disable"
          >{{ getCodeBtn.text }}</el-button>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="login" :disabled="loginBtn.disable">登录</el-button>
          <el-button type="info" @click="resetLogin">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      testCode: {
        disable: true,
      },
      loginBtn: {
        disable: true,
      },
      //表单对象
      getCodeBtn: {
        count: 59,
        text: '点击获取验证码',
        disable: false,
        timer: null,
      },
      loginForm: {
        j_number: '',
        password: '',
        testcode: '',
      },
      LoginFormRules: {
        j_number: [
          { required: true, message: '请输入工号', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在2 到 10 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
        tetscode: [
          // { required: true, message: '请输入验证码', trigger: 'blur' },
          // {
          //   min: 4,
          //   max: 4,
          //   message: '4位数字验证码',
          //   trigger: 'blur',
          // },
        ],
      },
    }
  },
  methods: {
    // 点击重置按钮重置表单
    resetLogin() {
      //   console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    //获取验证码
    getCode() {
      this.$refs.loginFormRef.validateField(['j_number'], async (valid) => {
        if (valid) return
        this.$http
          .post('/apis/users/loginGetCode', {
            j_number: this.loginForm.j_number,
            password: this.loginForm.password,
          })
          .then((data) => {
            let res = data.data
            if (res.code == 400) {
              this.$message.error(res.msg)
            } else {
              this.testCode.disable = false
              let me = this.getCodeBtn
              me.timer = setInterval(() => {
                console.log('1')
                if (me.count > 0) {
                  console.log('2')
                  me.disable = true
                  me.text = '(' + me.count + 's)后重新发送'
                  me.count--
                } else {
                  console.log('3')
                  me.disable = false
                  me.text = '点击获取验证码'
                  me.count = 60
                  clearInterval(me.timer) // 清除定时器
                  me.timer = null
                }
              }, 1000)
              this.$message.success(res.msg)
              this.loginBtn.disable = false
              console.log(data)
            }
          })
      })
    },

    //账号密码携带验证码登录
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        await this.$http
          .post('/apis/users/login', this.loginForm)
          .then((data) => {
            let res = data.data
            if (res.code == 400) {
            } else if (res.code == 200 && res.msg !== '验证码错误') {
              this.$message.success(res.msg)
              window.sessionStorage.setItem('token', res.token)
              this.$router.push('/home')
            } else {
              this.$message.error(res.msg)
            }
          })
      })
    },

    //发送验证码倒计时
    // setTime(obj, timeL) {
    //   let countdown = 60;
    //   if (countdown == 0) {
    //     obj.disabled = false;
    //     obj.text = "点击获取验证码";
    //     countdown = 60; //60秒过后button上的文字初始化,计时器初始化;
    //     return;
    //   } else {
    //     obj.disabled = true;
    //     obj.text = "(" + countdown + "s)后重新发送";
    //     countdown--;
    //   }
    // },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
}
.login_box {
  width: 40%;
  height: 350px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
