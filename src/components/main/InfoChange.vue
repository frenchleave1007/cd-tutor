<template>
  <div class="userInfoChange">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="300px"
      class="demo-ruleForm"
      v-if="!choose"
    >
      <el-form-item label="用户id">
        <el-input v-model="ruleForm.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-input v-model="ruleForm.create_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="用户电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
        <span class="errTips" v-if="phoneUn">手机号已存在</span>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="输入旧密码" prop="oldPassword">
        <el-input type="password" v-model="ruleForm.oldPassword" placeholder="若要修改密码，请先输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="输入新密码" prop="newPassword">
        <el-input type="password" v-model="ruleForm.newPassword" :disabled="changePwd"></el-input>
      </el-form-item>
      <el-form-item label="再次确认" prop="rePassword">
        <el-input type="password" v-model="ruleForm.rePassword" :disabled="changePwd"></el-input>
      </el-form-item>
      <el-form-item label="上传头像">
        <input type="file" id="file">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        <router-link to="/index">
          <el-button>放弃修改</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <div class="success" v-if="choose">
      <p>修改成功！！！</p>
      <el-button type="success" @click="open">即将重新登录</el-button>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  data() {
    var checkUserName = (rule, value, callback) => {
      //用户名正则，4到16位（字母，数字，汉字）
      var userNameReg = /^[a-zA-Z0-9\u4E00-\u9FA5]{2,16}$/;
      if (!userNameReg.test(value)) {
        callback(new Error("格式错误！请输入2-16位的汉字、字母或数字"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      //手机号正则
      var phoneReg = /^1[34578]\d{9}$/;
      if (!phoneReg.test(value)) {
        callback(new Error("格式错误！请输入正确的11位手机号"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      //Email正则
      var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!emailReg.test(value)) {
        callback(new Error("格式错误！请输入正确邮箱"));
      } else {
        callback();
      }
    };
    var checkOldPassword = (rule, value, callback) => {
      //密码正则，最少6位，数字字母下划线
      //   var pwdReg = /^[a-zA-Z0-9_]{6,16}$/;
      if (value && md5(value) == this.oldPassword) {
        this.changePwd = false;
        callback();
      } else if (value && md5(value) != this.oldPassword) {
        callback(new Error("旧密码错误"));
      } else if (!value) {
        this.changePwd = true;
        callback();
      }
    };
    var checkNewPassword = (rule, value, callback) => {
      //密码正则，最少6位，数字字母下划线
      var pwdReg = /^[a-zA-Z0-9_]{6,16}$/;
      if (value && !pwdReg.test(value)) {
        callback(new Error("密码格式：6-16位的数字、字母或下划线"));
      } else {
        callback();
      }
    };
    var checkRePassword = (rule, value, callback) => {
      if (!value && this.ruleForm.newPassword != "") {
        callback(new Error("请再次输入密码！"));
      } else if (
        value !== this.ruleForm.newPassword &&
        this.ruleForm.newPassword != ""
      ) {
        callback(new Error("两次输入的密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      phoneUn: false,
      changePwd: true,
      oldPassword: "",
      ruleForm: {
        id: "",
        create_time: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        newPassword: "",
        rePassword: ""
      },
      choose: false,
      rules: {
        name: [{ validator: checkUserName, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        oldPassword: [{ validator: checkOldPassword, trigger: "blur" }],
        newPassword: [{ validator: checkNewPassword, trigger: "blur" }],
        rePassword: [{ validator: checkRePassword, trigger: "blur" }]
      }
    };
  },
  created() {
    var self = this; //this保留起来
    this.axios
      .post("/api/getUserInfo", {
        phone: sessionStorage.userPhone
      })
      .then(response => {
        // console.log(response.data);
        self.ruleForm.id = response.data[0].id;
        self.ruleForm.create_time = response.data[0].create_time;
        self.ruleForm.name = response.data[0].name;
        self.ruleForm.phone = response.data[0].phone;
        self.ruleForm.email = response.data[0].email;
        self.oldPassword = response.data[0].password;
      });
  },
  methods: {
    submitForm(formName) {
      //   console.log(this.ruleForm);
      this.phoneUn = false;
      //   console.log(this.getNowDate());
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this; //this保留起来
          var file = document.getElementById("file").files[0];
          if (file == undefined) {
            file = null;
          }
          // console.log(file);
          var form = new FormData();
          form.append("file", file);
          // console.log(form);
          form.append("id", this.ruleForm.id);
          form.append("name", this.ruleForm.name);
          form.append("phone", this.ruleForm.phone);
          form.append("email", this.ruleForm.email);
          if (this.ruleForm.newPassword == "") {
            form.append("password", this.oldPassword);
          } else {
            form.append("password", this.ruleForm.newPassword);
          }
          var config = {
            headers: { "Content-Type": "multipart/form-data" }
          }; //添加请求头
          // console.log(form);
          this.axios.post("/api/userChange", form, config).then(response => {
            console.log(response.data);
            if (response.data.status == "ok") {
              this.choose = true;
              this.open();
            } else {
              if (response.data.message == "phoneUn") {
                self.phoneUn = true;
              }
            }
          });
        } else {
          return false;
        }
      });
    },
    reLogin() {
      this.$router.replace("/login");
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("userPhone");
      sessionStorage.removeItem("userPic");
    },
    open() {
        this.$alert('信息已经修改，需要重新登录', '修改成功', {
          confirmButtonText: '立即登录',
          center:true,
          showClose:false,
        }).then(() => {
            this.reLogin();
        });
      }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/main/infoChange.scss";
</style>
