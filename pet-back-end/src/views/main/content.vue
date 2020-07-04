<template>
  <div class="mycontent">
    <div class="nav-top">
      <a-menu v-model="current" class="insidenav" mode="horizontal">
        <a-menu-item key="list">
          <span class="navItem">
            <a-icon type="mail" />
            <router-link :to="oneRoute">{{'NavgateTo ' + firstName + ' 数据展示'}}</router-link>
          </span>
        </a-menu-item>
        <a-menu-item key="add">
          <span class="navItem">
            <a-icon type="appstore" />
            <router-link :to="secondRoute">{{'NavgateTo ' + firstName + ' 新增功能'}}</router-link>
          </span>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="mycontent-box">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: ["mail"]
    };
  },
  computed: {
    firstName() {
      return this.$route.matched[1].name;
    },
    oneRoute() {
      return `/info/${this.firstName}/list`;
    },
    secondRoute() {
      return `/info/${this.firstName}/add`;
    }
  },
  mounted() {}
};
</script>

<style>
.navItem {
  display: block;
  width: 100%;
  height: 100%;
}
.mycontent {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 48px;
  background-color: #fff;
  position: relative;
}
.nav-top {
  width: 100%;
  position: absolute;
  top: 0;
  left: 20px;
  display: flex;
}

.mycontent-box {
  background: padding-box #fff;
  width: calc(100% + 20px);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 40px;
  margin-top: 20px;
  padding-left: 20px;
}
</style>