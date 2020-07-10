<template>
  <div class="regPage">
    <h1>
      宠物管理系统
    </h1>
    <a-form-model class="regForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="账号">
        <a-input v-model="form.account" />
      </a-form-model-item>
      <a-form-model-item label="密码">
        <a-input v-model="form.password" />
      </a-form-model-item>
      <a-form-model-item label="姓名">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="年龄">
        <a-input v-model="form.age" />
      </a-form-model-item>
      <a-form-model-item label="性别">
        <a-radio-group v-model="form.gender">
          <a-radio value="male">男</a-radio>
          <a-radio value="female">女</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="电话">
        <a-input v-model="form.phone" />
      </a-form-model-item>
      <a-form-model-item label="注册身份">
        <a-radio-group v-model="form.position">
          <a-radio value="plat">平台管理员</a-radio>
          <a-radio value="shop">门店管理员</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px;">Cancel</a-button>
        <router-link to="/" style="margin-left: 10px;">去登录</router-link>
      </a-form-model-item>
    </a-form-model>
    
  </div>
</template>
<script>
import adminService from "../service/admin";
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        account: "", // 账号
        password: "", // 密码
        name: "", // 姓名
        age: "", // 年龄
        gender: "male", // 性别
        phone: "", // 手机号
        position: "plat" // 职位（平台管理员/门店管理员） plat / shop
      },
      rules: {
        account: { rule: /\w+/, text: "请填写正确的账号（数字字母构成）" },
        password: { rule: /\w+/, text: "请填写正确的密码（数字字母构成）" },
        name: { rule: /.+/, text: "请填写正确的昵称（至少一位）" },
        age: { rule: /\d+/, text: "请填写正确的年龄（数字）" },
        gender: { rule: /^(male|female)$/, text: "请填写正确的性别" },
        phone: {
          rule: /^1[3-9]\d{9}$/,
          text: "请填写正确的手机号码"
        },
        position: { rule: /^(plat|shop)$/, text: "请填写正确的（状态）" }
      }
    };
  },
  methods: {
    async onSubmit() {
      const state = Object.entries(this.form).some(([key, val]) => {
        if (!this.rules[key].rule.test(val)) {
          this.$message.info(this.rules[key].text, 0.4);
          return true;
        }
      });
      if (!state) {
        const {statu, msg} = await adminService.reg(this.form);
        this.$notification.open({message: '注册信息', description: msg + (statu ? ',请登录' : '')})
        if(statu){
          this.$router.replace('/')
        }
      }
    }
  }
};
</script>

<style>
.regForm{
  padding-right: 200px !important;
  width: 40%;
}
</style>