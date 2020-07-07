<template>
  <div>
    <a-table
      :columns="columns"
      :rowKey="item => item._id"
      :data-source="this.rows"
      :pagination="false"
    >
      <div class="actions" slot="action" slot-scope="text,record">
        <a slot="action" href="javascript:;" @click="delet(record)">删除</a>
        <a slot="action" href="javascript:;" @click="Modify(record)">修改</a>
      </div>
      <template
        slot="shop"
        slot-scope="arr"
      >{{arr.length === 0 ? '无' : arr.map(item => item.name).join('、')}}</template>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <img
          style="width: 110px; height: 70px;margin-right:6px;"
          v-for="(item, index) of record.images"
          :key="index"
          :src="`${/http/.test(item) ? item: '/api/' + item }`"
        />
      </p>
    </a-table>
    <a-pagination
      style="margin-top: 10px;"
      :total="count"
      :show-total="count => `总条数 ${count}`"
      @change="change"
    />
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("pet");
const columns = [
  { title: "名称", dataIndex: "name", key: "name" },
  { title: "宠物品种", dataIndex: "classify", key: "classify" },
  { title: "价格", dataIndex: "price", key: "price" },
  { title: "重量", dataIndex: "weight", key: "weight" },
  { title: "年龄", dataIndex: "age", key: "age" },
  {
    title: "所属门店",
    dataIndex: "shop",
    key: "shop",
    ellipsis: "true",
    scopedSlots: { customRender: "shop" }
  },
  { title: "宠物描述", dataIndex: "desc", key: "address", ellipsis: "true" },
  {
    title: "操作",
    dataIndex: "",
    key: "x",
    align: 'center',
    scopedSlots: { customRender: "action" }
  }
];

export default {
  computed: mapState(["rows", "count"]),
  methods: {
    change(current, pageSize) {
      this.getPets({ limit: pageSize, page: current });
    },
    ...mapActions(["getPets", "delPet"]),
    async delet(value) {
      const msg = await this.delPet(value._id);
      this.$message.info(msg, 0.7);
    },
    Modify(record) {
      this.$router.push({ name: 'PetUpdate',params: record });
    }
  },
  data() {
    return {
      columns
    };
  },
  created() {
    this.getPets({ limit: 10, page: 1 });
  }
};
</script>
<style scoped>
.ant-table-pagination {
  display: none;
}
.actions{
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
}
</style>
