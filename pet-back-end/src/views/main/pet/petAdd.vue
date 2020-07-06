<template>
  <div class="petFormBox">
    <a-form-model class="petAddForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="宠物名字">
      <a-input v-model="form.name"/>
    </a-form-model-item>
    <a-form-model-item label="宠物品种">
      <a-input v-model="form.classify" />
    </a-form-model-item>
    <a-form-model-item label="宠物价格">
      <a-input v-model="form.price" />
    </a-form-model-item>
    <a-form-model-item label="宠物重量">
      <a-input v-model="form.weight" />
    </a-form-model-item>
    <a-form-model-item label="宠物年龄">
      <a-input v-model="form.age" />
    </a-form-model-item>
    <a-form-model-item label="宠物描述">
      <a-input v-model="form.desc" type="textarea" />
    </a-form-model-item>
    <a-form-model-item label="选择该属门店">
      <a-checkbox-group v-model="form.type">
        <a-checkbox value="1" name="type">
          门店一
        </a-checkbox>
        <a-checkbox value="2" name="type">
          门店二
        </a-checkbox>
         <a-checkbox value="4" name="type">
          门店四
        </a-checkbox>
        <a-checkbox value="3" name="type">
          门店三
        </a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <div>
      <a-form-model-item label="宠物图片">
      <input ref="imgFile" multiple id="files"  type="file" />
      </a-form-model-item>
      <div id="preViewBox" style="height: 200px; display: flex; "></div>
    </div>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px;">Cancel</a-button>
    </a-form-model-item>
  </a-form-model>
  </div>
</template>
<script>
import {getFileURL } from '../../../utils/getFileURL'
import petService from '../../../service/pet'
import { createNamespacedHelpers } from "vuex";
const {mapActions} = createNamespacedHelpers("Pet");
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '', // 名称
        classify: '', // 宠物品种
        price: '', // 价格
        weight: '', // 重量
        age: '', // 年龄
        desc: '', // 宠物描述
        images:[]
      }
    };
  },
  methods: {
     ...mapActions(["petadd"]),
    async onSubmit() {
      const formData = new FormData()
      const files = this.$refs.imgFile.files
      for (const key in files) {
				if (key !== 'length' && key !== 'item') {
					formData.append('episode', files[key])
				}
      }
      const {patharr} = await petService.updatapetsanys(formData)
      const arr =[]
      for (let i = 0; i < patharr.length; i++) {
          arr.push("/api/"+patharr[i])
      }
      this.form.images = arr
      console.log(this.form);
      // this.petadd(this.form)
      // alert("添加成功")
      // this.$router.push("/info/pet/list");
    },
  },
  mounted(){
    document.getElementById('files').addEventListener('input', function () {
      document.getElementById('preViewBox').innerHTML = [...this.files].map(item => `<img style="display: inline-block;width: 150px;  margin-right: 10px; height: 150;" src="${getFileURL(item)}" />`).join('')
    })
  }
};
</script>

<style scoped>
.petAddForm{
  width: 45%;
}
.petFormBox{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>