<template>
  <div id="app">
    <div v-if="!detailValue" class="nav">
      <div class="head">
          <img src="../static/logo.png" class="logo">
          <img src="../static/search.png" class="search">
      </div>
      <div class="menu">
          <div v-for="(menuitem,index) in menu" v-bind:key="index" :class='menuitem.active ? "menu-active" : "menu-normal"' @click='activeMenu' :data-id="menuitem.text">{{menuitem.text}}</div>
      </div>
      
    </div>
    <!--切换过程中将状态保留在内存中，防止重复渲染DOM-->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <PlayingBar v-if="musicList.length > 0"></PlayingBar>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import PlayingBar from '@/components/playingBar.vue'
export default {
  name: 'App',
  data(){
    return {
      menu : [{
          text : "时下流行",
          active : true,
          route  : '/popular'
      },
      {
          text : "歌单",
          active : false,
          route  : '/songList'
      },
      {
          text : "排行榜",
          active : false,
          route  : '/ranks'
      },
      {
          text : "热门歌手",
          active : false,
          route  : '/hotSong'
      }],
    }
  },
  components : {
    PlayingBar
  },
  created() {
    console.log("store is ",this.store);
    this.$router.push({path:'/popular'});
  },
  beforeRouteEnter (to, from, next) {
    // ...
    console.log("-->musicList is ",this.musicList);
  },
  computed : {
    ...mapGetters(['detailValue','musicList','playingMusic'])
  },
  mounted() {
    console.log("detailValue is ",this.detailValue);
    console.log("musicList is ",this.musicList);
  },
  methods : {
    activeMenu : function(e){
      let target = e.target;
      let params = target.dataset;
      console.log("e is ",params.id);
      for(let i = 0,len = this.menu.length;i < len;i++){
          if(this.menu[i].text === params.id){
              this.menu[i].active =true;
              let router = this.menu[i].route;
              let name = router.split('/')[1];
              //跳转路由  path ---> query(object)   name ---> params(object)
              // this.$router.push({path:'/'+router,query:{id:6}});
              this.$router.push({path : router});
              console.log("this.$router is ",this.$router);
          }else{
              if(this.menu[i].active){
                  this.menu[i].active = false;
              }
          }
      }
    }
  }
}
</script>

<style>
a{
  text-decoration: none;
}
div {
  /* -webkit-tab-highlight-color: rgba(0,0,0,0.3);   */
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  
}
.head,.menu,nav,#app{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;

  }
  #app{
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .nav{
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  position: fixed;
  z-index: 10000;
  }
  .menu{
  justify-content: space-around;
  font-size: 0.4rem;
  padding: 0px 10px;
  white-space: nowrap;
  background: #fff;
  }
  .menu-normal:hover{
  cursor: pointer;
  /* width: 25%; */
  }
  .menu-normal{
  padding: 5px 10px;
  }
  .menu-active{
  padding: 5px 10px;
  color: #d81e06;
  border-bottom: 2px solid #d81e06;
  }
  .head{
  width: 90%;
  height: 1.5rem;
  background: #d81e06;
  padding: 0px 5%;
  }
  .logo{
  width:3rem;
  height:1rem;
  }
  .search{
  width: 1rem;
  height:1rem;
  }
</style>
