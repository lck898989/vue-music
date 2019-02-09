import Vue from 'vue'
import Router from 'vue-router'
import Popular from '@/components/popular.vue'
import SongList from '@/components/songList.vue'
import Ranks from '@/components/ranks.vue'
import HotSong from '@/components/hotSong.vue'
import PlayerListDetail from '@/components/playerListDetail.vue'
import Index from '@/components/index.vue'
Vue.use(Router)
export default new Router({
  routes : [
    {
      path: '/popular',
      name: 'popular',
      component : Popular,
      props:true,
    },
    {
      path: '/songList',
      name: 'songList',
      component : SongList,
      props:true
    },
    {
      path: '/ranks',
      name: 'ranks',
      component : Ranks,
      props : true
    },
    {
      path: '/hotSong',
      name: 'hotSong',
      component : HotSong,
      props : true
    },
    {
      path: '/playerListDetail',
      name: 'playerListDetail',
      component : PlayerListDetail,
      props : true
    },
  ]
})
