<template>
  <div id="dome">
    <div>
      <p>hello word</p>
    </div>
    <el-form>
      <el-form-item>
        <el-input
          style="width:50%;margin-right:50px"
          v-model="loginForm.testcode"
          placeholder="请输入验证码"
          :disabled="testCode.disable"
          prop="tetscode"
        ></el-input>
        <el-button
          type="primary"
          @click="getCode"
          :disabled="getCodeBtn.disable"
        >{{ getCodeBtn.text }}</el-button>
      </el-form-item>
    </el-form>
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
        username: '',
        password: '',
        testcode: '',
      },
      LoginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
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
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            min: 4,
            max: 4,
            message: '4位数字验证码',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    getCode() {
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
    },
  },
  // setTime(obj) {
  //   console.log(obj)
  //   if (obj.times > 0) {
  //     obj.times--
  //     obj.disable = true
  //     obj.text = '(' + obj.times + 's)后重新发送'
  //     setTimeout(function () {
  //       this.setTime(obj)
  //     }, 1000)
  //   } else {
  //     console.log(obj.text + '2')
  //     obj.disable = false
  //     obj.text = '点击获取验证码'
  //     obj.times = 0 //60秒过后button上的文字初始化,计时器初始化;
  //   }
  // },
}
</script>

<style></style>
