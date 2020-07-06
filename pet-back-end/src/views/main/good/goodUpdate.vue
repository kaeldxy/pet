<template>
  <div class="goodFormBox">
    <a-form-model class="goodForm" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="商品名称">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="商品种类">
        <a-input v-model="form.classify" />
      </a-form-model-item>
      <a-form-model-item label="适用宠物">
        <a-input v-model="form.pet" />
      </a-form-model-item>
      <a-form-model-item label="商品价格">
        <a-input v-model="form.price" />
      </a-form-model-item>
      <a-form-model-item label="商品重量">
        <a-input v-model="form.weight" />
      </a-form-model-item>
      <a-form-model-item label="生产日期">
        <a-date-picker
          v-model="form.production"
          show-time
          type="date"
          placeholder="Pick a date"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item label="保质期">
        <a-input v-model="form.shelfLife" />
      </a-form-model-item>
      <a-form-model-item label="产地">
        <a-input v-model="form.producer" />
      </a-form-model-item>
      <a-form-model-item label="商品描述">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item label="商品图片">
        <uploadFile
          :images="form.images"
          :baseUrl="isHaveBaseUrl"
          :multe="true"
          v-model="myImgFile"
          style="width: 100%;"
          fileName="goodImgs"
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
import goodService from "../../../service/good";
import uploadFile from "../../../components/upload/index";
import shopService from '../../../service/shop'
import moment from "moment";
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: "", // 名称
        classify: "", // 商品种类（主粮/零食/玩具/日常用品/药品...）
        pet: "", // 适用宠物（全部/猫/狗/其他）
        price: "", // 价格
        weight: "", // 重量
        production: null, // 生产日期
        shelfLife: "", // 保质期
        producer: "", // 产地
        images: [""], // 商品图片（列表图/详情图...）
        desc: "", // 商品描述
        shopIdArr: []
      },
      allShops: [],
      myImgFile: new FormData()
    };
  },
  components: {
    uploadFile
  },
  computed: {
    isHaveBaseUrl() {
      return /http/.test(this.form.images[0]) ? "" : "/api/";
    },
    adminId(){
      return this.$store.state.currentAdmin._id
    }
  },
  methods: {
    async onSubmit() {
      const { patharr } = await goodService.upload(this.myImgFile);
      
      let { production } = this.form
      production = production.format('YYYY-MM-DD HH:mm:ss')
      const updateData = Object.assign({}, {...this.form, production, images: patharr})
      console.log(updateData);
      const { statu, msg } = await goodService.update(updateData);
      this.$notification.open({
        message: "backServer",
        description: msg
      });
      if (statu) {
        this.$router.replace("/info/good/list");
      }
    }
  },
  async created() {
    this.$route.params.production = moment(this.$route.params.production,"YYYY-MM-DD HH:mm:ss");
    this.form = {...this.$route.params, shopIdArr: this.$route.params.shop.map(item => item._id)};
    delete this.form.shop
    const {rows} = await shopService.getShops({page: 1, limit: 100, adminId: this.adminId})
    this.allShops = rows
  }
};
</script>

<style scoped>
.goodFormBox {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.goodForm {
  width: 45%;
}
.shopArr{
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
}
.shopArr>*{
  margin: 0 !important;
}
</style>