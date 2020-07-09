<template>
  <div>
    <a-table :columns="columns" :data-source="this.rows" :rowKey="item => item._id" :pagination="false">
      
      <template
        slot="shopTab"
        class="actions"
        slot-scope="shop"
      >{{shop.length === 0 ? '无' : shop.map(item => item.name).join('、')}}</template>
      <div slot="expandedRowRender" slot-scope="record">
        商品图片
        <img
          v-for="(item, index) of record.images"
          :key="index"
          :src="/http/.test(item) ? item : '/api/' + item"
          style="width: 100px; height: 70px; margin-right: 6px;"
        />
      </div>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "编号",
    dataIndex: "_id",
    ellipsis: true
  },
  {
    title: "name",
    dataIndex: "name",
    ellipsis: true
  },
  {
    title: "服务内容",
    dataIndex: "classify",
    ellipsis: true
  },
  {
    title: "适用宠物",
    dataIndex: "pet",
    ellipsis: true
  },
  {
    title: "价格",
    dataIndex: "price",
    ellipsis: true
  },
  {
    title: "服务描述",
    dataIndex: "desc",
    ellipsis: true
  },
  
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
.actions {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
}
</style>