<template>
  <div class="loginPage">
    <h1>
      宠物管理系统
    </h1>
    <a-form-model class="loginForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="账号">
        <a-input v-model="form.account" />
      </a-form-model-item>
      <a-form-model-item label="密码">
        <a-input v-model="form.password" />
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
        <router-link to="/registe" style="margin-left: 10px;">去注册</router-link>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import adminService from '../service/admin'
export default {
  data(){
    return{
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        account: "", // 账号
        password: "", // 密码
        position: "plat" // 职位（平台管理员/门店管理员） plat / shop
      },
    }
  },
  methods:{
    async onSubmit(){
      const data = await adminService.login(this.form)
      this.$message.info(data.msg, 0.7)
      if(data.statu){
        const {token, _id, position, name} = data
        window.localStorage['_k'] = token
        const { account} = this.form
        const admininfo = {
          _id, position, name, account
        }
        window.localStorage['admininfo'] = JSON.stringify(admininfo)
        this.$router.push({name: 'Info'})
      }
    }
  }
}
</script>

<style>
.loginPage, .regPage{
  display:flex;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  background: url('../assets/bg.jpg') top center/cover;
}
.loginPage>h1, .regPage>h1{
  height: 500px;
  color: white;
  width: 600px;
  text-shadow: 4px 4px 5px rgb(156, 53, 53);
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  font-size: 45px;
  letter-spacing: 4px;
}
.loginForm{
  width: 35%;
  padding-right: 100px;
  /* border: 1px solid black; */
}
</style>
