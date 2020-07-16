
<template>
  <div style="width: 100%">
    <a-tabs tab-position="left">
      <a-tab-pane key="pet" tab="宠物订单">
        <div>
          <a-table
            :columns="petColumns"
            :rowKey="item => item._id"
            :data-source="petOrders"
            :pagination="false"
            defaultActiveKey="pet"
          >
            <div class="actions" slot="action" slot-scope="text,record">
              <a slot="action" href="javascript:;" @click="detail(record, 'pet')">详情</a>
              <a slot="action" href="javascript:;" @click="update(record)">修改</a>
            </div>
          </a-table>
          <a-pagination
            style="margin-top: 10px;"
            :total="petTotal"
            :show-total="petTotal => `总条数 ${petTotal}`"
            @change="changepet"
          />
        </div>
      </a-tab-pane>
      <a-tab-pane key="mysever" tab="服务订单">
        <div>
          <a-table
            :columns="myseverColumns"
            :rowKey="item => item._id"
            :data-source="myseverOrders"
            :pagination="false"
          >
            <div class="actions" slot="action" slot-scope="text,record">
              <a slot="action" href="javascript:;" @click="detail(record, 'mysever')">详情</a>
              <a slot="action" href="javascript:;" @click="update(record)">修改</a>
            </div>
          </a-table>
          <a-pagination
            style="margin-top: 10px;"
            :total="myseverTotal"
            :show-total="myseverTotal => `总条数 ${myseverTotal}`"
            @change="changemysever"
          />
        </div>
      </a-tab-pane>
      <a-tab-pane key="good" tab="商品订单">
        <div>
          <a-table
            :columns="goodColumns"
            :rowKey="item => item._id"
            :data-source="goodOrders"
            :pagination="false"
          >
            <div class="actions" slot="action" slot-scope="text,record">
              <a slot="action" href="javascript:;" @click="detail(record, 'good')">详情</a>
              <a slot="action" href="javascript:;" @click="update(record)">修改</a>
            </div>
          </a-table>
          <a-pagination
            style="margin-top: 10px;"
            :total="goodTotal"
            :show-total="goodTotal => `总条数 ${goodTotal}`"
            @change="changegood"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import orderService from "../../../service/order";
const petColumns = [
  { title: "订单编号", dataIndex: "_id", ellipsis: "true", align: "center" },
  {
    title: "订单用户",
    dataIndex: "userId.name",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "下单时间",
    dataIndex: "time",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "收获地址",
    dataIndex: "addrId.address",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "收货人",
    dataIndex: "addrId.name",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "收货电话",
    dataIndex: "addrId.phone",
    ellipsis: "true",
    align: "center"
  },
  { title: "货物数量", dataIndex: "num", ellipsis: "true", align: "center" },
  {
    title: "宠物种类",
    dataIndex: "petId.classify",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "订单单价",
    dataIndex: "petId.price",
    ellipsis: "true",
    align: "center"
  },
  { title: "所属门店", dataIndex: "shopId.name", ellipsis: "true" },
  {
    title: "Actions",
    key: "x",
    align: "center",
    scopedSlots: { customRender: "action" }
  }
];
const myseverColumns = [
  { title: "订单编号", dataIndex: "_id", ellipsis: "true", align: "center" },
  {
    title: "订单用户",
    dataIndex: "userId.name",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "下单时间",
    dataIndex: "time",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "收获地址",
    dataIndex: "addrId.address",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "收货人",
    dataIndex: "addrId.name",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "收货电话",
    dataIndex: "addrId.phone",
    ellipsis: "true",
    align: "center"
  },
  { title: "货物数量", dataIndex: "num", ellipsis: "true", align: "center" },
  {
    title: "服务种类",
    dataIndex: "myseverId.classify",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "订单单价",
    dataIndex: "myseverId.price",
    ellipsis: "true",
    align: "center"
  },
  { title: "所属门店", dataIndex: "shopId.name", ellipsis: "true" },
  {
    title: "Actions",
    key: "x",
    align: "center",
    scopedSlots: { customRender: "action" }
  }
];
const goodColumns = [
  { title: "订单编号", dataIndex: "_id", ellipsis: "true", align: "center" },
  {
    title: "订单用户",
    dataIndex: "userId.name",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "下单时间",
    dataIndex: "time",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "收获地址",
    dataIndex: "addrId.address",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "收货人",
    dataIndex: "addrId.name",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "收货电话",
    dataIndex: "addrId.phone",
    ellipsis: "true",
    align: "center"
  },
  { title: "货物数量", dataIndex: "num", ellipsis: "true", align: "center" },
  {
    title: "商品种类",
    dataIndex: "goodId.classify",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "商品名",
    dataIndex: "goodId.name",
    ellipsis: "true",
    align: "center"
  },
  {
    title: "商品单价",
    dataIndex: "goodId.price",
    ellipsis: "true",
    align: "center"
  },
  { title: "所属门店", dataIndex: "shopId.name", ellipsis: "true" },
  {
    title: "Actions",
    key: "x",
    align: "center",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  data() {
    return {
      petColumns,
      myseverColumns,
      goodColumns,
      petOrders: [],
      petTotal: 0,
      myseverOrders: [],
      myseverTotal: 0,
      goodOrders: [],
      goodTotal: 0
    };
  },
  computed: {
    adminId() {
      return this.$store.state.currentAdmin._id;
    }
  },
  methods: {
    async getOrder(page, limit, type) {
      const { data, total } = await orderService.get({
        page,
        limit,
        type,
        dependQuery: { adminId: this.adminId }
      });
      this[`${type}Orders`] = data;
      this[`${type}Total`] = total;
    },
    changepet(page, limit) {
      this.getOrder(page, limit, "pet");
    },
    changemysever(page, limit) {
      this.getOrder(page, limit, "mysever");
    },
    changegood(page, limit) {
      this.getOrder(page, limit, "good");
    },
    detail(orderItem, type) {
      this.$router.push({ name: "orderDetail", params: {orderItem, type} });
    },
    update(orderItem) {
      console.log(orderItem);
    }
  },
  created() {
    this.getOrder(1, 10, "pet");
    this.getOrder(1, 10, "mysever");
    this.getOrder(1, 10, "good");
  }
};
</script>

<style>
.actions {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
}
</style>