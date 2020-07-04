<template>
  <div class="adminBox">
    <div class="boxLeft">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240); margin: 0 0 10px 0;"
        title="Title"
        sub-title="平台管理员"
      />
      <a-table
        :pagination="false"
        :columns="columns"
        :rowKey="row => row._id"
        :data-source="platAdminData.data"
      >
        <template slot="operation" slot-scope="text">
          <div class="actions">
            <a href="javascript:;" @click="handleUpdate(text)">更新</a>
            <a href="javascript:;" @click="handleDelete(text)">删除</a>
          </div>
        </template>
      </a-table>
      <a-pagination
        @change="(page, limit) => {pageChange(page, limit, 'plat')}"
        style="margin-top: 10px"
        :total="platAdminData.total"
        show-quick-jumper
      />
    </div>
    <div class="boxRight">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240); margin: 0 0 10px 0;"
        title="Title"
        sub-title="门店管理员"
      />
      <a-table
        :pagination="false"
        :ellipsis="true"
        :rowKey="row => row._id"
        :columns="columns"
        :data-source="shopAdminData.data"
      >
        <template slot="operation" slot-scope="text">
          <div class="actions">
            <a href="javascript:;" @click="handleUpdate(text)">更新</a>
            <a href="javascript:;" @click="handleDelete(text)">删除</a>
          </div>
        </template>
      </a-table>
      <a-pagination
        @change="(page, limit) => {pageChange(page, limit, 'shop')}"
        style="margin-top: 10px"
        :total="shopAdminData.total"
        show-quick-jumper
      />
    </div>
  </div>
</template>

<script>
const columns = [
  { title: "编号", width: 70, dataIndex: "_id", key: "_id", ellipsis: true },
  {
    title: "账号",
    width: 70,
    dataIndex: "account",
    key: "account",
    ellipsis: true
  },
  { title: "姓名", width: 70, dataIndex: "name", key: "name", ellipsis: true },
  {
    title: "电话",
    width: 70,
    dataIndex: "phone",
    key: "phone",
    ellipsis: true
  },
  {
    title: "性别",
    width: 70,
    dataIndex: "gender",
    key: "gender",
    ellipsis: true
  },
  { title: "年龄", width: 70, dataIndex: "age", key: "age", ellipsis: true },
  {
    title: "状态",
    width: 70,
    dataIndex: "status",
    key: "status",
    ellipsis: true
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    scopedSlots: { customRender: "operation" }
  }
];

import adminService from "../../../service/admin";
export default {
  data() {
    return {
      columns,
      platAdminData: {
        total: 0,
        data: []
      },
      shopAdminData: {
        total: 0,
        data: []
      },
    };
  },
  methods: {
    async getAdminData({ position = "shop", limit = 10, page = 1 }) {
      const data = await adminService.get({ page, limit, position });
      Object.assign(this[`${position}AdminData`], data);
    },
    pageChange(page, limit, position) {
      this.getAdminData({ page, limit, position });
    },
    async handleDelete(record) {
      this.$confirm({
        title: "你真的要删除这一项吗",
        onOk: async () => {
          await adminService.del(record._id);
          const data = this[`${record.position}AdminData`].data.filter(
            item => item._id !== record._id
          );
          Object.assign(this.shopAdminData, { data, total: this.shopAdminData.total - 1 });
        }
      });
    },
    handleUpdate(record) {
      Object.assign(this.currentUpdate, record)
      this.visible = true;
      console.log(record);
    }
  },
  created() {
    this.getAdminData({});
    this.getAdminData({ position: "plat" });
  }
};
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
}
.adminBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  height: 3000px;
  /* background-color: red; */
}
.boxLeft {
  flex: 1;
  padding-right: 5px;
}
.boxRight {
  flex: 1;
  padding-left: 5px;
}
</style>>
