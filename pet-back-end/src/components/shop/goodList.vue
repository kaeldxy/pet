<template>
  <div>
    <a-table :columns="columns" :data-source="this.rows" :rowKey="item => item._id" :pagination="false">
      <div slot="expandedRowRender" slot-scope="record">
        商品图片
        <img
          v-for="(item, index) of record.images"
          :key="index"
          :src="/http/.test(item) ? item : '/api/' + item"
          style="width: 100px; height: 70px; margin-right: 6px;"
        />
      </div>
      <template
        slot="shop"
        slot-scope="shopArr"
      >{{shopArr.length === 0 ? '无' : shopArr.map(item => item.name).join('、')}}</template>
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
    title: "商品名称",
    dataIndex: "name",
    ellipsis: true
  },
  {
    title: "商品类别",
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
    title: "商品重量",
    dataIndex: "weight",
    ellipsis: true
  },
  {
    title: "生产日期",
    dataIndex: "production",
    ellipsis: true
  },
  {
    title: "保质期",
    dataIndex: "shelfLife",
    ellipsis: true
  },
  {
    title: "产地",
    dataIndex: "producer",
    ellipsis: true
  },
  {
    title: "商品描述",
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
}
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
}
</style>