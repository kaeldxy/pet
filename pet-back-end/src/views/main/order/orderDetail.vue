<template>
  <a-descriptions title="" layout="vertical" :column="5" bordered>
    <a-descriptions-item label="订单编号">
      {{order._id}}
    </a-descriptions-item>
    <a-descriptions-item label="下单时间">
      {{order.time}}
    </a-descriptions-item>
    <a-descriptions-item label="货物数量">
      {{order.num}}
    </a-descriptions-item>
    <a-descriptions-item label="订单状态">
      {{order.status}}
    </a-descriptions-item>
    <a-descriptions-item label="下单用户编号">
      {{order.userId._id}}
    </a-descriptions-item>
    <a-descriptions-item label="店主编号">
      {{order.adminId._id}}
    </a-descriptions-item>
    <a-descriptions-item label="店主姓名">
      {{order.adminId.name}}
    </a-descriptions-item>
    <a-descriptions-item label="下单用户姓名">
      {{order.userId.name}}
    </a-descriptions-item>
    <a-descriptions-item label="下单用户电话">
     {{order.userId.phone}}
    </a-descriptions-item>
    <a-descriptions-item label="收货地址">
      {{order.addrId.address}}
    </a-descriptions-item>
    <a-descriptions-item label="收货人">
      {{order.addrId.name}}
    </a-descriptions-item>
    <a-descriptions-item label="收货人电话">
      {{order.addrId.phone}}
    </a-descriptions-item>
    <a-descriptions-item label="货物名称">
      {{orderType.name}}
    </a-descriptions-item>
    <a-descriptions-item label="货物编号">
      {{orderType._id}}
    </a-descriptions-item>
    <a-descriptions-item label="货物重量">
      {{orderType.weight ? orderType.weight : '无'}}
    </a-descriptions-item>
    <a-descriptions-item label="货物种类">
      {{orderType.classify}}
    </a-descriptions-item>
    <a-descriptions-item label="货物图片" :span="4">
      <img :src="baseUrl + item" style="width: 150px; height: 100px; margin: 0 5px;" v-for="(item,index) of orderType.images" :key="index" alt="">
    </a-descriptions-item>
    <a-descriptions-item label="货物单价">
      {{orderType.price}}
    </a-descriptions-item>
    <a-descriptions-item label="货物描述">
      {{orderType.desc}}
    </a-descriptions-item>
    <a-descriptions-item label="下单店铺">
      {{order.shopId.name}}
    </a-descriptions-item>
    <a-descriptions-item label="店铺编号">
      {{order.shopId._id}}
    </a-descriptions-item>
    <a-descriptions-item label="店铺地址">
      {{order.shopId.address}}
    </a-descriptions-item>
    <a-descriptions-item label="店铺电话">
      {{order.shopId.telephone}}
    </a-descriptions-item>
  </a-descriptions>
</template>
<script>
export default {
  data(){
    return {
      order: {},
       type: ''
    }
  },
  computed:{
    orderType(){
      return this.order[`${this.type}Id`]
    },
    baseUrl(){
      return /http/.test(this.orderType.images[0]) ? '' : '/api/'
    }
  },
  created() {
    this.order = this.$route.params.orderItem
    this.type = this.$route.params.type
  }
};
</script>

<style>
.ant-descriptions-title{
  text-align: left;
}
</style>