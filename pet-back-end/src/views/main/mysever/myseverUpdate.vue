<template>
  <div class="myseverFormBox">
    <a-form-model class="myseverForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="服务名称">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="服务种类">
        <a-input v-model="form.classify" />
      </a-form-model-item>
      <a-form-model-item label="适用宠物">
        <a-input v-model="form.pet" />
      </a-form-model-item>
      <a-form-model-item label="服务价格">
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="服务描述">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px;">Cancel</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import myseverService from "../../../service/mysever";
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: "", // 名称
        classify: "", // 服务种类（洗澡/游泳/修毛/驱虫...）
        pet: "", // 适用宠物（全部/猫/狗/其他）
        price: "", // 服务价格
        desc: "" // 服务描述
      }
    };
  },
  methods: {
    async onSubmit() {
      const { statu, msg } = await myseverService.update(this.form);
      this.$notification.open({
        message: "backServer",
        description: msg
      });
      if (statu) {
        this.$router.replace('/info/mysever/list');
      }
    }
  },
  created(){
    this.form = this.$route.params
  }
};
</script>

<style scoped>
.myseverFormBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.myseverForm {
  width: 45%;
}
</style>