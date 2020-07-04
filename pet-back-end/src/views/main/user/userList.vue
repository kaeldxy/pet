<template>
  <div>
    <a-table :columns="columns" :data-source="data" :rowKey="item => item._id" :pagination="false">
      <a slot="text">详细..</a>
      <img
        slot="img"
        slot-scope="text"
        style="display: block; width: 40px; height: 40px;"
        :src="text"
      />
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
    dataIndex: "_id"
  },
  {
    title: "账号",
    dataIndex: "username"
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "手机号码",
    dataIndex: "phone",
    key: "address 1",
    ellipsis: true
  },
  {
    title: "头像",
    dataIndex: "image",
    ellipsis: true,
    scopedSlots: { customRender: "img" }
  },
  {
    title: "Action",
    dataIndex: "address",
    key: "address 4",
    scopedSlots: { customRender: "text" }
  }
];

import userService from "../../../service/user";
export default {
  data() {
    return {
      data: [],
      columns,
      total: 0
    };
  },
  methods: {
    async getUserData(page = 1, limit = 10) {
      const { data, total } = await userService.get({ page, limit });
      this.data = data;
      this.total = total;
    },
    pageChange(page, limit) {
        this.getUserData(page, limit)
    },
    onShowSizeChange(page, limit){
        this.getUserData(page, limit)
    }
  },
  created() {
    this.getUserData();
  }
};
</script>