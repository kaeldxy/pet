<template>
  <div>
    <a-table :columns="columns" :data-source="data" :rowKey="item => item._id" :pagination="false">
      <div slot="Action" class="actions" slot-scope="record">
        <a @click="() => {handleDelete(record)}">删除</a>
        <a @click="() => {handleUpdate(record)}">修改</a>
      </div>
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
  {
    title: "Action",
    scopedSlots: { customRender: "Action" }
  }
];

import myseverService from "../../../service/mysever";
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
    async getMyseverData(page = 1, limit = 10) {
      const { data, total } = await myseverService.get({
        page,
        limit,
        adminId: this.adminId
      });
      this.data = data;
      this.total = total;
    },
    pageChange(page, limit) {
      this.getMyseverData(page, limit);
    },
    onShowSizeChange(page, limit) {
      this.getMyseverData(page, limit);
    },
    handleDelete(record) {
      this.$confirm({
        title: "你真的要删除这一项吗",
        onOk: async () => {
          const {statu,  msg } = await myseverService.del(record._id);
          this.$message.info(msg, 0.7);
          if(statu){
            this.data = this.data.filter(item => item._id !== record._id)
          }
        }
      });
    },
    handleUpdate(record) {
      this.$router.push({name: 'MyseverUpdate', params: record})
    }
  },
  created() {
    this.getMyseverData();
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