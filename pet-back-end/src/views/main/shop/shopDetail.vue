<template>
  <div>
    <a-descriptions title="门店详情" class="detail">
      <a-descriptions-item label="门店名称">{{shop.name}}</a-descriptions-item>
      <a-descriptions-item label="联系电话">{{shop.telephone}}</a-descriptions-item>
      <a-descriptions-item label="门店地址">{{shop.address}}</a-descriptions-item>
      <a-descriptions-item label="门店简介">{{shop.desc}}</a-descriptions-item>
    </a-descriptions>
    <a-divider />

    <a-tabs default-active-key="1" @change="callback">
    <a-tab-pane key="1">
      <span slot="tab">
        <a-icon type="goods" />
        商品管理
      </span>
      Tab 1
    </a-tab-pane>
    <a-tab-pane key="2">
      <span slot="tab">
        <a-icon type="service" />
        服务管理
      </span>
      Tab 2
    </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          <a-icon type="put" />宠物管理
        </span>
        <a-table :columns="columns" :data-source="data">
          <a slot="action" slot-scope="" href="javascript:;">Delete</a>
          <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{ record.description }}</p>
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("Pet");
const columns = [
  { title: "名称", dataIndex: "name", key: "name" },
  { title: "宠物品种", dataIndex: "classify", key: "classify" },
  { title: "价格", dataIndex: "price", key: "price" },
  { title: "重量", dataIndex: "weight", key: "weight" },
  { title: "年龄", dataIndex: "age", key: "age" },
  { title: "宠物描述", dataIndex: "desc", key: "address", ellipsis:"true"},
  {
    title: "操作",
    dataIndex: "",
    key: "x",
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];
export default {
  mounted() {
    this.shop = this.$router.currentRoute.params;
  },
    created() {
    this.petall({limit:5,page:1});
  },
  computed: mapState(["limit", "page", "rows", "count"]),
  data() {
    return {
      shop: {},
      data,
      columns,
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