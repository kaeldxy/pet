<template>
  <div>
    <a-list :grid="{ gutter: 6, xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }" :data-source="rows">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :title="item.name" class="text">
          <p>地址：</p>
          <p class="indentation">{{item.address}}</p>
          <p>电话：</p>
          <p class="indentation">{{item.telephone}}</p>
          <p>门店信息：</p>
          <p class="indentation">{{item.desc}}</p>
          <a-button
            type="primary"
            @click="updata(item)"
            style=" position: absolute;bottom: 10px;"
          >修改</a-button>
        </a-card>
      </a-list-item>
    </a-list>
    <a-pagination :total="count" :defaultCurrent="1" :defaultPageSize="6" show-less-items @change="toogle" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("shop");
export default {
  methods: {
    ...mapActions(["getShops"]),
    toogle(page, limit) {
      this.getShops({ page, limit });
    },
    updata(record) {
      this.$router.replace({ name: "ShopUpdate", params: record });
    }
  },
  mounted() {
    this.getShops({});
  },
  computed: mapState(["rows", "count"])
};
</script>

<style>
.text {
  text-align: left;
  width: 300px;
  height: 400px;
  position: relative;
}
.indentation {
  text-indent: 2rem;
}
</style>