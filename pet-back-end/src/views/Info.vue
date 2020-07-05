<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo"></div>
      <a-menu v-model="currentKey" theme="dark" mode="inline">
        <a-menu-item v-if="showPlat" key="user">
          <router-link to="/info/user/list" class="my-nav">
            <a-icon type="user" />
            <span>用户管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item v-if="showPlat" key="admin">
          <router-link to="/info/admin/list" class="my-nav">
            <a-icon type="user" />
            <span>管理员管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="shop">
          <router-link to="/info/shop/list" class="my-nav">
            <a-icon type="pic-center" />
            <span>门店管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item v-if="showShop" key="good">
          <router-link to="/info/good/list" class="my-nav">
            <a-icon type="strikethrough" />
            <span>商品管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item v-if="showShop" key="server">
          <router-link to="/info/mysever/list" class="my-nav">
            <a-icon type="cloud-server" />
            <span>服务管理</span>
          </router-link>
        </a-menu-item>
        <a-menu-item v-if="showShop" key="pet">
          <router-link to="/info/pet/list" class="my-nav">
            <a-icon type="yuque" />
            <span>宠物管理</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 50px;">
        <div class="headrLayout">
          <a-icon
            class="trigger"
            :type="collapsed ? 'arrow-right' : 'arrow-left'"
            @click="() => (collapsed = !collapsed)"
          />
          <div class="adminInfo">
            <span>
              <a-icon type="user" />
              账号：{{currentAdmin.account}}
            </span>
            <span>姓名：{{currentAdmin.name}}</span>
            <span
              style="fontWeight: 800; color: #876800"
            >身份：{{currentAdmin.position === 'shop' ? '门店管理员' : '平台管理员'}}</span>
            <a-button @click="exitLogin" type="dashed">退出登录</a-button>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ minHeight: '280px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    exitLogin() {
      window.localStorage.removeItem("_k");
      window.localStorage.removeItem("admininfo");
      this.$store.commit("toggleCurrentAdmin", {
        name: "",
        _id: "",
        position: "",
        account: ""
      });
      this.$router.replace("/");
    }
  },
  computed: {
    ...mapState(["currentAdmin"]),
    showShop() {
      return this.currentAdmin.position === "shop";
    },
    showPlat() {
      return this.currentAdmin.position === "plat";
    },
    currentKey(){
      const key = this.$route.path.split('/')[2]
      if(key){
        return [key]
      }
      return ['']
    }
  },
  beforeCreate() {
    this.$store.commit(
      "toggleCurrentAdmin",
      JSON.parse(window.localStorage["admininfo"])
    );
  }
};
</script>
<style>
.adminInfo {
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.showItem {
  display: block !important;
}
.visbItem {
  display: none !important;
}
.headrLayout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
}
#components-layout-demo-custom-trigger {
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>