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
      <a-form-model-item label="服务图片">
        <uploadFile
          v-model="imgs"
          fileName="myseverImgs"
          :baseUrl="baseUrl"
          :images="form.images"
          id="myseverUploadFile"
          :multe="true"
        />
      </a-form-model-item>
      <a-form-model-item label="所属门店">
        <a-checkbox-group class="shopArr" v-model="form.shopIdArr">
          <a-checkbox
            v-for="item of allShops"
            :key="item._id"
            :value="item._id"
            name="shop"
          >{{item.name}}</a-checkbox>
        </a-checkbox-group>
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
import shopService from "../../../service/shop";
import uploadFile from "../../../components/upload/index";
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
        desc: "", // 服务描述
        shopIdArr: [],
        images: []
      },
      allShops: [],
      imgs: new FormData()
    };
  },
  components: {
    uploadFile
  },
  computed: {
    adminId() {
      return this.$store.state.currentAdmin._id;
    },
    baseUrl() {
      return /http/.test(this.form.images[0]) ? "" : "/api/";
    }
  },
  methods: {
    async onSubmit() {
      const { patharr } = await myseverService.upload(this.imgs);
      const { statu, msg } = await myseverService.update({
        ...this.form,
        images: patharr
      });
      this.$notification.open({
        message: "backServer",
        description: msg
      });
      if (statu) {
        this.$router.replace("/info/mysever/list");
      }
    }
  },
  async created() {
    this.form = {
      ...this.$route.params,
      shopIdArr: this.$route.params.shop.map(item => item._id)
    };
    delete this.form.shop;
    const { rows: allShops } = await shopService.getShops({
      adminId: this.adminId,
      page: 1,
      limit: 100
    });
    this.allShops = allShops;
  }
};
</script>

<style scoped>
.myseverFormBox {
  width: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
}
.myseverForm {
  width: 45%;
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