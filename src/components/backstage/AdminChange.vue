<template>
  <div class="admin-change">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="300px"
      class="demo-ruleForm"
      v-if="!choose"
    >
      <el-form-item label="管理员id">
        <el-input v-model="ruleForm.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="管理员名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="管理员编号" prop="admin_num">
        <el-input v-model="ruleForm.admin_num"></el-input>
        <span class="errTips" v-if="adminNumUn">管理员编号已存在</span>
      </el-form-item>
      <el-form-item label="管理员电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
        <span class="errTips" v-if="phoneUn">手机号已存在</span>
      </el-form-item>
      <el-form-item label="创建者">
        <el-input v-model="ruleForm.creater_name" disabled></el-input>
      </el-form-item>
      <el-form-item label="创建者编号">
        <el-input v-model="ruleForm.creater_num" disabled></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="ruleForm.create_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="上一次修改时间">
        <el-input v-model="ruleForm.change_time" disabled></el-input>
      </el-form-item>
      <el-form-item label="上传头像">
        <input type="file" id="file">
      </el-form-item>
      <el-form-item v-if="ruleForm.admin_num != '66666' && admin_num == '66666'" label="是否为超级管理员" prop="repassword">
        <el-switch
          v-model="isSuper"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="是"
          inactive-text="否"
        ></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        <router-link to="adminManage">
          <el-button>放弃修改</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <div class="success" v-if="choose">
      <p>修改成功！！！</p>
      <div class="btn">
        <router-link to="adminManage">
          <el-button type="success">立即查看</el-button>
        </router-link>
        <!-- <el-button type="info" @click="addAgain">继续修改</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入管理员名称"));
      } else if (value.length < 2 || value.length > 16) {
        callback(new Error("管理员名称长度4-16"));
      } else {
        callback();
      }
    };
    var checkAdminNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入管理员编号"));
      } else if (value.length != 5) {
        callback(new Error("管理员编号长度5"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (value.length != 11) {
        callback(new Error("请输入11位手机号"));
      } else {
        callback();
      }
    };
    return {
      isSuper:false,
      admin_num : sessionStorage.adminNum,
      adminNumUn: false,
      phoneUn: false,
      ruleForm: {},
      choose: false,
      rules: {
        name: [{ validator: checkName, trigger: "blur" }],
        admin_num: [{ validator: checkAdminNum, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  created() {
    this.ruleForm = this.$route.query;
    this.isSuper = this.ruleForm.super == 'true' ? true : false;
  },
  methods: {
    submitForm(formName) {
      // console.log(this.ruleForm.super)
      this.adminNumUn = false;
      this.phoneUn = false;
      // console.log(this.getNowDate());
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
          form.append("admin_num", this.ruleForm.admin_num);
          form.append("phone", this.ruleForm.phone);
          form.append("change_time", this.getNowDate());
          form.append("isSuper", this.isSuper);
          var config = {
            headers: { "Content-Type": "multipart/form-data" }
          }; //添加请求头

          // alert("submit!");
          this.axios.post("/api/adminChange", form, config).then(response => {
            // console.log(response.data);
            if (response.data.status == "ok") {
              this.choose = true;
            } else {
              if (response.data.message == "phoneUn") {
                self.phoneUn = true;
              } else if (response.data.message == "adminNumUn") {
                self.adminNumUn = true;
              }
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    getNowDate() {
      var date = new Date();
      var year, month, day, hours, minutes;
      year = date.getFullYear();
      month = ("0" + (date.getMonth() + 1)).slice(-2);
      day = ("0" + date.getDate()).slice(-2);
      hours = ("0" + date.getHours()).slice(-2);
      minutes = ("0" + date.getMinutes()).slice(-2);
      var str = year + "-" + month + "-" + day + "  " + hours + ":" + minutes;
      return str;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/backstage/adminChange.scss";
</style>
