<template>
  <div>
    <a-table :columns="columns" :data-source="this.rows" :pagination="false" >
      <template slot="action" slot-scope="text,record">
        <a slot="action" href="javascript:;" @click="delet(record)">删除</a>|
        <a slot="action" href="javascript:;" @click="Modify(record)">修改</a>
      </template>
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <img
          style="width: 200px; height: 100px;margin-right:10px;"
          v-for="(item, index) of record.images"
          :key="index"
          :src="`${item}`"
          alt
        />
      </p>
    </a-table>
      <a-pagination
      :total="count"
      :show-total="count => `总条数 ${count}`"
      :page-size="limit"
      :default-current="page"
      @change="change"
    />
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

export default {
  computed: mapState(["limit", "page", "rows", "count"]),
  methods: {
    change(current, pageSize) {
           this.petall({limit:pageSize,page:current});
      },
    ...mapActions(["petall", "petdelet"]),
    async delet(value) {
      const data = await this.petdelet(value._id);
      if (data.ok === 1) {
        alert("删除成功");
       this.petall({limit:5,page:1});
      } else {
        alert("删除失败");
      }
    },
    Modify(value) {
      localStorage.setItem("updata", JSON.stringify(value));
      this.$router.push("/info/pet/update");
    }
  },
  data() {
    return {
      columns,
    };
  },
  created() {
    this.petall({limit:5,page:1});
  }
};
</script>
<style scoped>
.ant-table-pagination {
  display: none;
}
</style>
