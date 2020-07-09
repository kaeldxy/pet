<template>
  <div>
    <a-descriptions title="用户信息" bordered :column="5" style="margin-bottom:10px;">
      <a-descriptions-item label="用户编号">{{user._id}}</a-descriptions-item>
      <a-descriptions-item label="用户姓名">{{user.name}}</a-descriptions-item>
      <a-descriptions-item label="用户账号">{{user.username}}</a-descriptions-item>
      <a-descriptions-item label="用户手机号码">{{user.phone}}</a-descriptions-item>
      <a-descriptions-item label="用户头像">
        <img :src="baseUrl + user.image" style="width: 50px; height: 50px;" alt />
      </a-descriptions-item>
    </a-descriptions>

    <a-tabs default-active-key="2">
      <a-tab-pane key="2" tab="收货地址列表">
        <div
          style="background-color: #F5F5F5; padding: 24px;"
          v-for="(item, index) of addrs"
          :key="item._id"
        >
          <a-page-header :ghost="false" :title="`Address ${index + 1}`" :sub-title="item._id">
            <template slot="extra">
              <a-button key="3">Operation</a-button>
              <a-button key="2">Operation</a-button>
              <a-button key="1" type="primary">Primary</a-button>
            </template>
            <a-descriptions size="small" :column="3">
              <a-descriptions-item label="收货地址">{{item.address}}</a-descriptions-item>
              <a-descriptions-item label="收货人">{{item.name}}</a-descriptions-item>
              <a-descriptions-item label="收货人电话">{{item.phone}}</a-descriptions-item>
              <a-descriptions-item label="Effective Time">{{nowTime}}</a-descriptions-item>
              <a-descriptions-item
                label="Remarks"
              >Gonghu Road, Xihu District, Hangzhou, Zhejiang, China</a-descriptions-item>
            </a-descriptions>
          </a-page-header>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="订单信息列表">
        <div key="宠物订单">
          <h1 class="orderHead" style="text-align:left;">宠物订单</h1>
          <div
            style="background-color: #F5F5F5; padding: 24px;"
            v-for="(item, index) of allOrders.petOrders.data"
            :key="item._id"
          >
            <a-page-header :ghost="false" :title="`宠物订单 ${index + 1}`" :sub-title="item._id">
              <template slot="extra">
                <a-button key="3">Operation</a-button>
                <a-button key="2">Operation</a-button>
                <a-button key="1" type="primary">Primary</a-button>
              </template>
              <a-descriptions size="small" :column="3">
                <a-descriptions-item label="下单时间">{{item.time}}</a-descriptions-item>
                <a-descriptions-item label="货品数量">{{item.num}}</a-descriptions-item>
                <a-descriptions-item label="订单状态">{{item.status}}</a-descriptions-item>
                <a-descriptions-item label="收货地址">{{item.addrId.address}}</a-descriptions-item>
                <a-descriptions-item label="收货人">{{item.addrId.name}}</a-descriptions-item>
                <a-descriptions-item label="收货人电话">{{item.addrId.phone}}</a-descriptions-item>
                <a-descriptions-item label="购买门店编号">{{item.shopId._id}}</a-descriptions-item>
                <a-descriptions-item label="购买门店">{{item.shopId.name}}</a-descriptions-item>
                <a-descriptions-item label="门店管理员编号">{{item.adminId._id}}</a-descriptions-item>
                <a-descriptions-item label="门店管理员">{{item.adminId.name}}</a-descriptions-item>
                <a-descriptions-item label="购买货品">{{item.petId.name}}</a-descriptions-item>
                <a-descriptions-item label="购买货品种类">{{item.petId.classify}}</a-descriptions-item>
                <a-descriptions-item label="购买货品价格">{{item.petId.price}}</a-descriptions-item>
                <a-descriptions-item label="购买货品编号">{{item.petId._id}}</a-descriptions-item>
              </a-descriptions>
            </a-page-header>
          </div>
        </div>
        <div key="商品订单">
          <h1 class="orderHead" style="text-align:left;">商品订单</h1>
          <div
            style="background-color: #F5F5F5; padding: 24px;"
            v-for="(item, index) of allOrders.goodOrders.data"
            :key="item._id"
          >
            <a-page-header :ghost="false" :title="`商品订单 ${index + 1}`" :sub-title="item._id">
              <template slot="extra">
                <a-button key="3">Operation</a-button>
                <a-button key="2">Operation</a-button>
                <a-button key="1" type="primary">Primary</a-button>
              </template>
              <a-descriptions size="small" :column="3">
                <a-descriptions-item label="下单时间">{{item.time}}</a-descriptions-item>
                <a-descriptions-item label="货品数量">{{item.num}}</a-descriptions-item>
                <a-descriptions-item label="订单状态">{{item.status}}</a-descriptions-item>
                <a-descriptions-item label="收货地址">{{item.addrId.address}}</a-descriptions-item>
                <a-descriptions-item label="收货人">{{item.addrId.name}}</a-descriptions-item>
                <a-descriptions-item label="收货人电话">{{item.addrId.phone}}</a-descriptions-item>
                <a-descriptions-item label="购买门店编号">{{item.shopId._id}}</a-descriptions-item>
                <a-descriptions-item label="购买门店">{{item.shopId.name}}</a-descriptions-item>
                <a-descriptions-item label="门店管理员编号">{{item.adminId._id}}</a-descriptions-item>
                <a-descriptions-item label="门店管理员">{{item.adminId.name}}</a-descriptions-item>
                <a-descriptions-item label="购买货品">{{item.goodId.name}}</a-descriptions-item>
                <a-descriptions-item label="购买货品种类">{{item.goodId.classify}}</a-descriptions-item>
                <a-descriptions-item label="购买货品价格">{{item.goodId.price}}</a-descriptions-item>
                <a-descriptions-item label="购买货品编号">{{item.goodId._id}}</a-descriptions-item>
              </a-descriptions>
            </a-page-header>
          </div>
        </div>
        <div key="服务订单">
          <h1 class="orderHead" style="text-align:left;">服务订单</h1>
          <div
            style="background-color: #F5F5F5; padding: 24px;"
            v-for="(item, index) of allOrders.myseverOrders.data"
            :key="item._id"
          >
            <a-page-header :ghost="false" :title="`服务订单 ${index + 1}`" :sub-title="item._id">
              <template slot="extra">
                <a-button key="3">Operation</a-button>
                <a-button key="2">Operation</a-button>
                <a-button key="1" type="primary">Primary</a-button>
              </template>
              <a-descriptions size="small" :column="3">
                <a-descriptions-item label="下单时间">{{item.time}}</a-descriptions-item>
                <a-descriptions-item label="货品数量">{{item.num}}</a-descriptions-item>
                <a-descriptions-item label="订单状态">{{item.status}}</a-descriptions-item>
                <a-descriptions-item label="收货地址">{{item.addrId.address}}</a-descriptions-item>
                <a-descriptions-item label="收货人">{{item.addrId.name}}</a-descriptions-item>
                <a-descriptions-item label="收货人电话">{{item.addrId.phone}}</a-descriptions-item>
                <a-descriptions-item label="购买门店编号">{{item.shopId._id}}</a-descriptions-item>
                <a-descriptions-item label="购买门店">{{item.shopId.name}}</a-descriptions-item>
                <a-descriptions-item label="门店管理员编号">{{item.adminId._id}}</a-descriptions-item>
                <a-descriptions-item label="门店管理员">{{item.adminId.name}}</a-descriptions-item>
                <a-descriptions-item label="购买货品">{{item.myseverId.name}}</a-descriptions-item>
                <a-descriptions-item label="购买货品种类">{{item.myseverId.classify}}</a-descriptions-item>
                <a-descriptions-item label="购买货品价格">{{item.myseverId.price}}</a-descriptions-item>
                <a-descriptions-item label="购买货品编号">{{item.myseverId._id}}</a-descriptions-item>
              </a-descriptions>
            </a-page-header>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import addrService from "../../../service/addr";
import orderService from "../../../service/order";

import moment from "moment";

export default {
  data() {
    return {
      user: {},
      type: "",
      addrs: [],
      allOrders: {
        petOrders: { data: [], total: 0 },
        myseverOrders: { data: [], total: 0 },
        goodOrders: { data: [], total: 0 }
      }
    };
  },
  computed: {
    baseUrl() {
      return /http/.test(this.user.image) ? "" : "/api/";
    },
    nowTime() {
      return moment.now();
    },
    userId() {
      return this.user._id;
    }
  },
  methods: {
    async getAddr({ userId }) {
      const { addrs } = await addrService.get({ userId });
      this.addrs = addrs;
    }
  },
  async created() {
    this.user = this.$route.params;
    this.getAddr({ userId: this.userId });
    const data = await orderService.get({
      page: 1,
      limit: 10,
      type: "all",
      dependQuery: { userId: this.userId }
    });
    this.allOrders = data;
  console.log(data);
  
  }
};
</script>

<style>
.ant-descriptions-title {
  text-align: left;
}
tr:last-child td {
  padding-bottom: 0;
}
.orderHead{
  height: 60px;
  text-align: left;
  line-height: 60px;
  font-weight: bold;
  color: rgb(48, 46, 49);
}
</style>