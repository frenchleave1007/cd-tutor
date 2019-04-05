<template>
  <div class="login">
    <el-row>
      <div class="login-top">
        <el-col :span="12">
          <router-link to="/">
            <img src="../../../static/images/logo.png" alt>
          </router-link>
        </el-col>
        <el-col :span="12">
          <div class="login-top-right">
            <span class="hasNum">还没有账号？</span>
            <router-link :to="{name:'register'}">
              <el-button type="success">去注册</el-button>
            </router-link>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row class="login-content">
      <el-col :span="12">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554374631183&di=5736021b2110c1f84ac705b989d247db&imgtype=0&src=http%3A%2F%2Fs15.sinaimg.cn%2Fmw690%2F003sJslDzy7j2Y2eSwCee%26690" alt="">
      </el-col>
      <el-col :span="12">
          <p class="login-title">账号登录</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号" prop="pass">
            <el-input
              type="password"
              placeholder="请输入11位手机号"
              v-model="ruleForm2.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="ruleForm2.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <p class="forget">忘记密码？</p>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: "",
        age: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/login/login.scss";
</style>