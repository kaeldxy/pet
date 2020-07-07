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
      <img
        v-for="item in shop.images"
        :key="item"
        :src="`/api/${item}`"
        style="width:100px;height:100px; margin: 0 10px"
      />
    </div>
    <a-divider />

    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="goods" />商品管理
        </span>
        Tab 1
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="service" />服务管理
        </span>
        Tab 2
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
import Pets from '../pet/petList'
export default {
  components:{Pets},
  mounted() {
    this.shop = this.$router.currentRoute.params;
  },
  data() {
    return {
      shop: {},
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    },
  }
};
</script>

<style>
.detail {
  text-align: left;
}
</style>