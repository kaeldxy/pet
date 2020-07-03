<template>
  <div>
    <a-list
      :grid="{ gutter: 6, xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }"
      :data-source="data.rows"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :title="item.name" class="text">
          <p>地址：</p>
          <p class="indentation">{{item.address}}</p>
          <p>电话：</p>
          <p class="indentation">{{item.telephone}}</p>
          <p>门店信息：</p>
          <p class="indentation">{{item.desc}}</p>
        </a-card>
      </a-list-item>
    </a-list>
    <a-pagination
      v-model="page"
      :total="data.count"
      show-less-items
      :defaultPageSize="3"
      @change="toogle"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers("shop");
export default {
  data() {
    return {
      page:1,
    };
  },
  methods: {
    ...mapActions(["getShops"]),
    ...mapMutations(["change"]),
    itemRender(current, type, originalElement) {    
      if (type === "prev") {
        return <a>上一页</a>;
      } else if (type === "next") {
        return <a>下一页</a>;
      }
      return originalElement;
    },
    toogle(pageNumber){
      this.change(pageNumber)
      this.getShops()
    }
  },
  mounted() {
    this.getShops();
    this.$data.page=this.data.page    
  },
  computed: mapGetters(["data"])
};
</script>

<style>
.text {
  text-align: left;
  width: 300px;
  height: 400px;
}
.indentation {
  text-indent: 2rem;
}
</style>