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
        v-for="item in shop.images"
        :key="item"
        :src="/http/.test(src) ? src : '/api/' + item"
        style="width:100px;height:100px; margin: 0 10px"
      />
    </div>
    <a-divider />

    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="goods" />商品管理
        </span>
        <Good />
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="service" />服务管理
        </span>
        <MySever />
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          <a-icon type="put" />宠物管理
        </span>
        <Pets />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Pets from "../pet/petList";
import MySever from "../mysever/myseverList";
import Good from "../good/goodList";
import { Empty } from 'ant-design-vue';
export default {
  components: { Good, MySever, Pets },
  created() {
    this.shop = this.$router.currentRoute.params;
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  },
  data() {
    return {
      shop: {},
      src: "",
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    }
  }
};
</script>

<style>
.detail {
  text-align: left;
}
</style>