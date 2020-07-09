<template>
  <div>
    <a-table
      :columns="columns"
      :rowKey="item => item._id"
      :data-source="this.rows"
      :pagination="false"
    >
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
  </div>
</template>
<script>
const columns = [
  { title: "名称", dataIndex: "name", key: "name" },
  { title: "宠物品种", dataIndex: "classify", key: "classify" },
  { title: "价格", dataIndex: "price", key: "price" },
  { title: "重量", dataIndex: "weight", key: "weight" },
  { title: "年龄", dataIndex: "age", key: "age" },
  { title: "宠物描述", dataIndex: "desc", key: "address", ellipsis: "true" }
];

export default {
  props: {
    rows: Array
  },

  data() {
    return {
      columns
    };
  }
};
</script>
<style scoped>
.ant-table-pagination {
  display: none;
}
.actions {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
}
</style>
