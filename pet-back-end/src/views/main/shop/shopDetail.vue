<template>
  <div>
    <a-descriptions title="门店详情" class="detail">
      <a-descriptions-item label="门店名称">{{shop.name}}</a-descriptions-item>
      <a-descriptions-item label="联系电话">{{shop.telephone}}</a-descriptions-item>
      <a-descriptions-item label="门店地址">{{shop.address}}</a-descriptions-item>
      <a-descriptions-item label="门店简介">{{shop.desc}}</a-descriptions-item>
    </a-descriptions>
    <div style="text-align:left">
      <p>门店图片:</p>
      <a-empty v-if="!shop.images[0]" style="height: 100px;width: 115px;margin: 0px 10px;line-height: 50px;" :image="simpleImage" />
      <img
        v-for="(item,index) in shop.images"
        :key="index"
        :src="/http/.test(item) ? item : '/api/' + item"
        style="width:100px;height:100px; margin: 0 10px"
      />
    </div>
    <a-divider />

    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="goods" />商品管理
        </span>
        <Goods :rows="this.rows"/>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="service" />服务管理
        </span>
        <MySever :rows="this.rows"/>
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          <a-icon type="put" />宠物管理
        </span>
        <Pets :rows="this.rows"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Pets from "../../../components/shop/petList";
import MySever from "../../../components/shop/myseverList";
import Goods from "../../../components/shop/goodList";
import { Empty } from 'ant-design-vue';
import relatedService from "../../../service/related";
export default {
  components: { Pets,Goods,MySever },
  created() {
    this.shop = this.$router.currentRoute.params;
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  },
  async mounted(){
    const shopId=this.shop._id
    const {data} = await relatedService.get({type:'good',shopId})
    this.rows = data.map((item)=>item[`goodId`])
    console.log(this.rows);
    
  },
  data() {
    return {
      shop: {},
      rows:[],
    };
  },
  methods: {
   async callback(key) {
    let type;
    key==1?type='good':key==2?type='mysever':type="pet";
    const shopId=this.shop._id
    const {data} = await relatedService.get({type,shopId})
    this.rows = data.map((item)=>item[`${type}Id`])
    console.log(this.rows);
    }
  }
};
</script>

<style>
.detail {
  text-align: left;
}
</style>