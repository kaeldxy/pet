<template>
  <div class="shopListBox">
    <a-menu v-if="isShowMenu" style="width: 100px;" mode="inline" @click="changeItem" v-model="currentKey">
      <a-menu-item :key="item._id" v-for="item of admins">{{item.name}}</a-menu-item>
    </a-menu>
    <div class="shopListContent">
      <div class="cardBox">
        <a-card hoverable v-for="item of shops" :key="item._id" style="width: 246px">
          <img
            slot="cover"
            alt="example"
            :src="baseUrl(item) + item.images[0]"
            style="width:100%; height: 170px;"
          />
          <template slot="actions" class="ant-card-actions">
            <a-icon v-if="!isShowMenu" key="edit" type="edit" @click="updata(item)"/>
            <a-icon v-if="!isShowMenu" key="delete" type="delete" @click="del(item)" />
            <a-icon key="ellipsis" type="ellipsis" @click="shopInfo(item)" />
          </template>
          <div>
            <h1 style="text-align: left;">{{item.name}}</h1>
            <p>{{item.address}}</p >
          </div>
        </a-card>
      </div>
      <a-pagination v-model="currentPage" :defaultPageSize="4" @change="pageChange"  :total="total" />
    </div>
  </div>
</template>

<script>
import getAllAdminsService from "../../../service/related";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      admins: [],
      currentKey: [],
      currentPage: 1,
    };
  },
  computed: {
    shops() {
      return this.$store.state.shop.rows;
    },
    total() {
      return this.$store.state.shop.count;
    },
    currentPosition() {
      return this.$store.state.currentAdmin.position;
    },
    isShowMenu() {
      return this.currentPosition === "plat";
    },
  },
  async created() {
    if (this.isShowMenu) {
      const { admins } = await getAllAdminsService.getAdmins();
      this.admins = admins;
      this["shop/getShops"]({ adminId: admins[0]._id, page: 1, limit: 4 });
      this.currentKey = [admins[0]._id]
    } else {
      this["shop/getShops"]({ page: 1, limit: 4 });
    }
  },
  methods: {
    ...mapActions(["shop/getShops","shop/delShop"]),
    changeItem({ key }) {
      this.currentKey = [key]
      this.currentPage = 1
      this["shop/getShops"]({ adminId: key, page: 1, limit: 4 });
    },
    pageChange(page, limit){
      this["shop/getShops"]({ adminId: this.currentKey[0], page, limit });
    },
    baseUrl(item){
      return /http/.test(item.images[0]) ? '' : '/api/'
    },
    updata(item){
      this.$router.replace({ name: "ShopUpdate" , params: item});  
    },
    del({_id}){
      this['shop/delShop']({_id});
      this.$message.success({ content: '删除成功！!'});
      this['shop/getShops']({page: 1, limit: 4});      
    },
    shopInfo(item){
      this.$router.replace({ name: "ShopDetail" , params: item});  
    }
  }
};
</script>

<style>
.shopListBox {
  display: flex;
}
.shopListContent {
  flex: 1;
}
.cardBox {
  display: flex;
  flex-wrap: wrap;
  
}
.cardBox>*{
  margin: 50px 20px !important;
}
</style>