<template>
  <div class="petFormBox">
    <a-form-model class="petAddForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="宠物名字">
        <a-input v-model="form.name" />
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
      <a-form-model-item label="所属门店">
        <a-checkbox-group class="shopArr" v-model="form.shopIdArr">
          <a-checkbox
            v-for="item of allShops"
            :value="item._id"
            :key="item._id"
            name="type"
          >{{item.name}}</a-checkbox>
        </a-checkbox-group>
      </a-form-model-item>
      <uploadFile
        fileName="episode"
        v-model="petImgFile"
        id="petUpdateUpload"
        :multe="true"
        :baseUrl="baseUrl"
        :images="this.form.images"
      />
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px;">Cancel</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import shopService from "../../../service/shop";
import uploadFile from "../../../components/upload/index";
const { mapActions } = createNamespacedHelpers("pet");
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
        classify: "", // 宠物品种
        price: "", // 价格
        weight: "", // 重量
        age: "", // 年龄
        desc: "", // 宠物描述
        images: [],
        shopIdArr: []
      },
      allShops: [],
      petImgFile: new FormData()
    };
  },
  methods: {
    ...mapActions(["updatePet", "uploadPetImg"]),
    async onSubmit() {
      const { patharr } = await this.uploadPetImg(this.petImgFile);
      const {statu, msg} = await this.updatePet(
        Object.assign(this.form, { images: patharr })
      );
      this.$message.info(msg, 0.7)
      if(statu){
        this.$router.replace({name: 'PetList'})
      }
    }
  },
  computed: {
    adminId() {
      return this.$store.state.currentAdmin._id;
    },
    baseUrl() {
      return /http/.test(this.form.images[0]) ? "" : "/api/";
    }
  },
  async created() {
    Object.assign(this.form, this.$route.params, {
      shopIdArr: this.$route.params.shop.map(item => item._id)
    });
    delete this.form.shop;
    const { rows } = await shopService.getShops({
      page: 1,
      limit: 100,
      adminId: this.adminId
    });
    this.allShops = rows;
  }
};
</script>

<style scoped>
.petAddForm {
  width: 45%;
}
.petFormBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.shopArr {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  
}
.shopArr > * {
  display: flex;
  align-items: center;
  /* border: 1px solid rgb(163, 33, 33);
  background-color: rgb(112, 88, 88); */
  border-radius: 4px;
  width: 100px;
  height: 40px;
  margin: 0 4px !important;
}
</style>
 