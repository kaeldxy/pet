<template>
  <div>
    <a-list :grid="{ gutter: 6, xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }" :data-source="rows">
      <a-list-item
        slot="renderItem"
        slot-scope="item"
        class="text"
        style="width: 200px; height: 340px;margin-bottom:20px;"
      >
        <a-card :title="item.name" @click="detail(item)" style="height:360px;">
          <p style="display: flex;overflow: hidden;">
            <a-empty v-if="!item.images[0]" style="height: 100px;width: 115px;margin: 0px 10px;line-height: 50px;" :image="simpleImage" />
            <img
          v-for="(src, index) of item.images"
          :key="index"
          :src="/http/.test(src) ? src : '/api/' + src"
          style="height:100px; margin: 0 10px"
        />
          </p>
          <p>地址：</p>
          <p class="indentation">{{item.address}}</p>
          <p>电话：</p>
          <p class="indentation">{{item.telephone}}</p>
        </a-card>
        <a-button
          type="link"
          @click="updata(item)"
          size="small"
          style=" position: absolute;top: 15px;right:5px;"
        >修改</a-button>
        <a-button
          type="link"
          @click="del(item)"
          size="small"
          style=" position: absolute;bottom: -15px;right:0;"
        >删除</a-button>
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
import { Empty } from 'ant-design-vue';
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("shop");
export default {
  methods: {
    ...mapActions(["getShops", "delShop"]),
    toogle(page, limit) {
      this.getShops({ page, limit });
    },
    updata(record) {
      this.$router.replace({ name: "ShopUpdate", params: record });
    },
    detail(record) {
      this.$router.replace({ name: "ShopDetail", params: record });
    },
    del(item) {
      const _id = item._id;
      this.delShop({ _id });
      this.getShops({});
      this.$message.info("删除成功！");
    }
  },
  created(){
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
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