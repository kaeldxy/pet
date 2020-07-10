<template>
  <div class="mycontent">
    <div class="nav-top">
      <a-menu :select="handleSelect" v-model="currentKey" class="insidenav" mode="horizontal">
        <a-menu-item key="list" v-if="isShowList">
          <router-link class="navItem" :to="listPath">
            <a-icon type="mail" />
            <span class="keyWord1">{{keyWords[currentPath[0]]}}</span>
            <span class="keyWord2">  {{  keyWords['list']}}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="add" v-if="isShowAdd">
          <router-link class="navItem" :to="addPath">
            <a-icon type="appstore" />
            <span class="keyWord2">  {{  keyWords['add']}}</span>
            <span class="keyWord1">{{keyWords[currentPath[0]]}}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="update" v-if="isShowUpdate">
          <router-link class="navItem" :to="updatePath">
            <a-icon type="appstore" />
            <span class="keyWord2">  {{  keyWords['update']}}</span>
            <span class="keyWord1">{{keyWords[currentPath[0]]}}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="detail" v-if="isShowDetail">
          <router-link class="navItem" :to="detailPath">
            <a-icon type="appstore" />
            <span class="keyWord1">{{keyWords[currentPath[0]]}}</span>
            <span class="keyWord2">  {{  keyWords['detail']}}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="order" v-if="isShowStatistic">
          <router-link class="navItem" to="/info/statistic/order">
            <a-icon type="appstore" />
            <span class="keyWord1">年度销量分析</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="user" v-if="isShowStatistic">
          <router-link class="navItem" to="/info/statistic/user">
            <a-icon type="appstore" />
            <span class="keyWord1">用户产品分析</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="shop" v-if="isShowStatistic">
          <router-link class="navItem" to="/info/statistic/shop">
            <a-icon type="appstore" />
            <span class="keyWord1">门店分布图</span>
          </router-link>
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
      basePath: "/info/",
      percent: 0,
      showLoading: true
    };
  },
  computed: {
    keyWords() {
      return this.$store.state.keyWords;
    },
    currentPath() {
      const Path = this.$route.path.split("/");
      const currentPath = Path.filter(item => item && item !== "info");
      return currentPath
    },
    currentKey() {
      return [this.currentPath[1]];
    },
    currentPosition(){
      return this.$store.state.currentAdmin.position
    },
    listPath(){
      return this.basePath + this.currentPath[0] + '/list'
    },
    addPath(){
      return this.basePath + this.currentPath[0] + '/add'
    },
    updatePath(){
      return this.basePath + this.currentPath[0] + '/update'
    },
    detailPath(){
      return this.basePath + this.currentPath[0] + '/detail'
    },
    isShowList(){
      return this.currentPath[0] !== 'statistic'
    },
    isShowUpdate(){
      if(this.currentPath[0] === 'user'){
        return false
      }else{
        return this.currentPath[1] === 'update'
      }
    },
    isShowStatistic(){
      return this.currentPath[0] === 'statistic'
    },
    isShowAdd(){
      if(this.currentPosition === 'shop'){
        return !/(order)/.test(this.currentPath[0])
      }else{
        return /(admin)/.test(this.currentPath[0])
      }
    },
    isShowDetail(){
      if(/(order|user|shop)/.test(this.currentPath[0])){
        return this.currentPath[1] === 'detail'
      }
      return false
    }
  },
  methods:{
    handleSelect(ss){
      console.log(ss);
      
    }
  }
};
</script>

<style scoped>
.keyWord2{
  font-weight: bolder;
  font-size: 14px;
  color: rgb(134, 31, 31);
  margin: 0 3px;
}
.keyWord1{
  color: rgb(17, 81, 97);
}
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
  padding-bottom: 100px;
}
</style>