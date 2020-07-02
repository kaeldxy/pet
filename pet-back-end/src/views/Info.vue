<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu theme="dark" mode="inline">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>
            <router-link to="/">用户管理</router-link>
          </span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="pic-center" />
          <span>
            <router-link to="/info/shop/list">门店管理</router-link>
          </span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="strikethrough" />
          <span>
            <router-link to="/info/good/list">商品管理</router-link>
          </span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="cloud-server" />
          <span>
            <router-link to="/info/mysever/list">服务管理</router-link>
          </span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="yuque" />
          <span>
            <router-link to="/info/pet/list">宠物管理</router-link>
          </span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; dispaly: flex; padding: 0 50px;">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content :style="{ padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false
    };
  }
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  display: block;
  text-align: left;
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
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
}
</style>