<template>
  <div class="foundTeacher">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="家长名称" prop="name">
        <el-input disabled v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="家长电话" prop="phone">
        <el-input disabled v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="家长邮箱" prop="email">
        <el-input disabled v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="家长性别">
        <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
        <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="期望教师文化水平" prop="education">
        <el-input v-model="ruleForm.education" placeholder="例如：大学本科"></el-input>
      </el-form-item>
      <el-form-item label="期望教师教龄" prop="teachage">
        <el-input v-model="ruleForm.teachage" placeholder="例如：3年"></el-input>
      </el-form-item>
      <el-form-item label="期望教师职业" prop="teacherjob">
        <el-select v-model="ruleForm.teacherjob" placeholder="请选择教师职业">
          <el-option v-for="item in teacherjobList" :key="item.id" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="需求教学科目" prop="teachlesson">
        <el-select v-model="ruleForm.teachlesson" multiple placeholder="请选择教学科目，可多选">
          <el-option v-for="item in teachlessonList" :key="item.id" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教学时间" prop="teachtime1">
        <el-select v-model="ruleForm.teachtime1" multiple placeholder="请选择教学时间，可多选">
          <el-option value="周一"></el-option>
            <el-option value="周二"></el-option>
            <el-option value="周三"></el-option>
            <el-option value="周四"></el-option>
            <el-option value="周五"></el-option>
            <el-option value="周六"></el-option>
            <el-option value="周日"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教学时段" prop="teachtime2">
        <el-select v-model="ruleForm.teachtime2" multiple placeholder="请选择教学时段，可多选">
          <el-option value="上午"></el-option>
          <el-option value="下午"></el-option>
          <el-option value="晚上"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教学时间详细说明" prop="teachtimedis">
        <el-input
          type="textarea"
          resize="none"
          :autosize="{ minRows: 3, maxRows: 10}"
          v-model="ruleForm.teachtimedis"
          placeholder="请输入教学时间的详细说明，例如：每天下午 15:00-19:00"
        ></el-input>
      </el-form-item>
      <el-form-item label="期望价格" prop="price">
        <el-input v-model="ruleForm.price" style="width:100px;margin-right:10px;"></el-input>/小时
      </el-form-item>
      <el-form-item label="教学地点" prop="teacharea">
        <el-select v-model="ruleForm.teacharea" multiple placeholder="请选择教学地点，可多选">
          <el-option v-for="item in areaList" :key="item.id" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教学地点详细说明" prop="areadis">
        <el-input
          type="textarea"
          resize="none"
          :autosize="{ minRows: 3, maxRows: 10}"
          v-model="ruleForm.areadis"
          placeholder="请输入教学地点的详细说明，例如：郫都区成都工业学院附近"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="description">
        <el-input
          type="textarea"
          resize="none"
          :autosize="{ minRows: 3, maxRows: 10}"
          v-model="ruleForm.description"
          placeholder="请输入备注信息"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <router-link to="/">
          <el-button type="primary">放弃并返回首页</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkGraduated = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else if (value.length > 50) {
        return callback(new Error("最大长度50"));
      } else {
        callback();
      }
    };
    var checkEducation = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else if (value.length > 50) {
        return callback(new Error("最大长度50"));
      } else {
        callback();
      }
    };
    var checkTeachAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else if (value.length > 10) {
        return callback(new Error("信息过长，最大长度10"));
      } else {
        callback();
      }
    };
    var checkSelect = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    var checkSelectGroup = (rule, value, callback) => {
      if (value.length == 0) {
        return callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    var checkTeachTimeDis = (rule, value, callback) => {
      if (value.length > 128) {
        return callback(new Error("信息过长"));
      } else {
        callback();
      }
    };
    var checkPrice = (rule, value, callback) => {
      var priceReg = /^\d*\.?\d+$/;
      if (!priceReg.test(value)) {
        return callback(new Error("格式不正确，请输入正的整数或小数"));
      } else {
        callback();
      }
    };
    return {
      teacherjobList: [],
      teachlessonList: [],
      areaList: [],
      ruleForm: {
        parent_id: "",
        name: "",
        phone: "",
        email: "",
        sex: "男",
        education: "",
        teachage: "",
        teacherjob: "",
        teachlesson: "",
        teachtime1: "",
        teachtime2: "",
        teachtimedis: "",
        price: "",
        teacharea: "",
        areadis: "",
        description: ""
      },
      rules: {
        graduated: [{ validator: checkGraduated, trigger: "blur" }],
        education: [{ validator: checkEducation, trigger: "blur" }],
        teachage: [{ validator: checkTeachAge, trigger: "blur" }],
        teacherjob: [{ validator: checkSelect, trigger: "change" }],
        teachlesson: [{ validator: checkSelectGroup, trigger: "change" }],
        teachtime1: [{ validator: checkSelectGroup, trigger: "change" }],
        teachtime2: [{ validator: checkSelectGroup, trigger: "change" }],
        teacharea: [{ validator: checkSelectGroup, trigger: "change" }],
        teachtimedis: [{ validator: checkTeachTimeDis, trigger: "blur" }],
        areadis: [{ validator: checkTeachTimeDis, trigger: "blur" }],
        description: [{ validator: checkTeachTimeDis, trigger: "blur" }],
        price: [{ validator: checkPrice, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this; //this保留起来
          this.axios
            .post("/api/parentInfoChange", {
              parent_id: sessionStorage.userId,
              name: self.ruleForm.name,
              phone: self.ruleForm.phone,
              email: self.ruleForm.email,
              pic_path: sessionStorage.userPic,
              sex: self.ruleForm.sex,
              education: self.ruleForm.education,
              teachage: self.ruleForm.teachage,
              teacherjob: self.ruleForm.teacherjob,
              teachlesson: self.ruleForm.teachlesson.join(","),
              teachtime1: self.ruleForm.teachtime1.join(","),
              teachtime2: self.ruleForm.teachtime2.join(","),
              teachtimedis: self.ruleForm.teachtimedis,
              price: self.ruleForm.price,
              teacharea: self.ruleForm.teacharea.join(","),
              areadis: self.ruleForm.areadis,
              description: self.ruleForm.description,
              createTime: self.getNowDate(),
              flag: "未通过",
              type: "add"
            })
            .then(response => {
              // console.log(response.data);
              if (response.data.status == "ok") {
                this.insertSuccess();
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    },
    insertSuccess() {
      this.$confirm("信息已经提交，请等待管理员审核通过", "信息提交成功", {
        confirmButtonText: "查看",
        cancelButtonText: "返回首页",
        type: "success"
      })
        .then(() => {
          this.$router.replace("publish");
        })
        .catch(() => {
          this.$router.replace("/index");
        });
    }
  },
  created() {
    this.ruleForm.name = sessionStorage.userName;
    this.ruleForm.phone = sessionStorage.userPhone;
    this.ruleForm.email = sessionStorage.userEmail;
    this.ruleForm.card = ("00000" + sessionStorage.userId).slice(-5);
    this.axios.get("/api/getSearchList").then(response => {
      var data = response.data.result;
      this.teacherjobList = data[2];
      this.teachlessonList = data[1];
      this.areaList = data[0];
    });
  },
  mounted() {
    this.resetForm("ruleForm");
  }
};
</script>

<style lang="scss">
@import "@/assets/css/main/foundTeacher.scss";
</style>
