<template>
  <div>
    <a-table :columns="columns" :data-source="data" :rowKey="item => item._id" :pagination="false">
      <div slot="Action" class="actions" slot-scope="record">
        <a @click="() => {handleDelete(record)}">删除</a>
        <a @click="() => {handleUpdate(record)}">修改</a>
      </div>
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
      >{{shopArr.length === 0 ? '无' : shopArr.map(item => item ? item.name : '').join('、')}}</template>
    </a-table>
    <a-pagination
      show-size-changer
      :total="this.total"
      @change="pageChange"
      @showSizeChange="onShowSizeChange"
      style="margin-top: 10px;"
    />
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
  {
    title: "所属门店",
    dataIndex: "shop",
    ellipsis: true,
    scopedSlots: { customRender: "shop" }
  },
  {
    title: "Action",
    scopedSlots: { customRender: "Action" }
  }
];

import goodService from "../../../service/good";

export default {
  data() {
    return {
      data: [],
      columns,
      total: 0
    };
  },
  computed: {
    adminId() {
      return this.$store.state.currentAdmin._id;
    }
  },
  methods: {
    async getGoodData(page = 1, limit = 10) {
      const { data, total } = await goodService.get({
        page,
        limit,
        adminId: this.adminId
      });
      this.data = data;
      this.total = total;
    },
    pageChange(page, limit) {
      this.getGoodData(page, limit);
    },
    onShowSizeChange(page, limit) {
      this.getGoodData(page, limit);
    },
    handleDelete(record) {
      this.$confirm({
        title: "你真的要删除这一项吗",
        onOk: async () => {
          const { statu, msg } = await goodService.del(record._id);
          this.$message.info(msg, 0.7);
          if (statu) {
            this.data = this.data.filter(item => item._id !== record._id);
          }
        }
      });
    },
    handleUpdate(record) {
      this.$router.push({ name: "GoodUpdate", params: record });
    }
  },
  created() {
    this.getGoodData();
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