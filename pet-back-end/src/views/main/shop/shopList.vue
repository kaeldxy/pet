<template>
  <div>
    <a-list :grid="{ gutter: 6, xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }" :data-source="rows">
      <a-list-item
        slot="renderItem"
        slot-scope="item"
        class="text"
        style="width: 200px; height: 300px;"
      >
        <a-card :title="item.name" @click="detail(item)">
          <p>地址：</p>
          <p class="indentation">{{item.address}}</p>
          <p>电话：</p>
          <p class="indentation">{{item.telephone}}</p>
          <p>门店信息：</p>
          <p class="indentation">{{item.desc}}</p>
        </a-card>
        <a-button
          type="link"
          @click="updata(item)"
          size="small"
          style=" position: absolute;top: 5px;right:5px;z-index:9"
        >修改</a-button>
      </a-list-item>
    </a-list>
    <a-pagination
      :total="count"
      :defaultCurrent="1"
      :defaultPageSize="10"
      show-less-items
      @change="toogle"
      style="margin-top:20px"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("shop");
export default {
  methods: {
    ...mapActions(["getShops","getAll"]),
    toogle(page, limit) {
      this.getShops({ page, limit });
    },
    updata(record) {
      this.$router.replace({ name: "ShopUpdate", params: record });
    },
    detail(record) {
      this.$router.replace({ name: "ShopDetail", params: record });
    }
  },
  mounted() {
    this.getShops({});
    // const adminId = this.$store.state.currentAdmin._id;
    
    // this.getAll({adminId})
  },
  computed: mapState(["rows", "count"])
};
</script>

<style>
.text {
  text-align: left;
  margin: 10px 10px 10px;
  position: relative;
}
.indentation {
  text-indent: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>