<template>
  <div class="shopAddBox">
    <a-form-model class="shopAddForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="门店名称">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="门店地址">
        <a-input v-model="form.address" />
      </a-form-model-item>
      <a-form-model-item label="联系电话">
        <a-input v-model="form.telephone" />
      </a-form-model-item>
      <a-form-model-item label="门店简介">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item label="门店图片">
        <uploadFile v-model="shopFile" :multe="true" fileName="shopImgs" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">添加</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import uploadFile from "../../../components/upload/index";
import shopService from "../../../service/shop";
export default {
  components: {
    uploadFile
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: "", // 名称
        address: "", // 地址
        telephone: "", // 电话
        desc: "", // 门店描述
        images: [""]
      },
      shopFile: new FormData()
    };
  },
  computed: {
    adminId() {
      return this.$store.state.currentAdmin._id;
    }
  },
  methods: {
    async onSubmit() {
      const { patharr } = await shopService.upload(this.shopFile);
      const addData = Object.assign(
        {},
        this.form,
        { adminId: this.adminId },
        { images: patharr }
      );
      const { statu, msg } = await shopService.addShops(addData);
      if (statu) {
        this.$message.info(msg);
        this.$router.replace({ name: "ShopList" });
      } else {
        this.$message.info("添加失败！");
      }
    }
  }
};
</script>
<style>
.shopAddBox{
  width: 800px;
}
</style>