<template>
    <div class="p-container">
        <div class="swiper-container">
            <swiper :options="swiperOption">
                <swiper-slide v-for="swiperItem in swiperList" :key="swiperItem.imageUrl"><img :src="swiperItem.imageUrl" width="100%"></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <!--推荐歌单-->
        <div>
            <div class="recommendSongs-con">
                <div class="title">
                    <div class="title-left">
                        <img src="../../static/aei.png" width="30%" style="margin-right:5px;">
                        <h4>推荐歌单</h4>
                    </div>
                </div>
                <div>
                    <h4>更多></h4>
                </div>
            </div>
            <div class="itemList-con">
                <c-songItem v-for="songItem in recommendSongs" :key="songItem.picUrl" :songItem="songItem" class="itemS"></c-songItem>
            </div>
        </div>
        <router-view/>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import api from '../api/index'
import {swiper,swiperSlide} from 'vue-awesome-swiper';
import SongItem from './songItme';
export default {
    //需要渲染的数据
    data () {
        return {
            swiperList : [],
            //推荐歌单
            recommendSongs : [],
            //推荐mv
            recommendMvs : [],
            //是否正在加载
            isLoading : true,
            swiperOption : {
                pagination : {
                    el : '.swiper-pagination'
                }
            }
        }
    },
    created() {
        console.log("popular组件被加载");
        console.log("htis.$http is ",this.$http);
        let self = this;
        console.log(api.getBannerList());
        let swiperList = this.$http.get(api.getBannerList());
        let recommendSongs = this.$http.get(api.getPersonalized());
        let recommendMvs = this.$http.get(api.getPersonalizedMv());
        Promise.all([swiperList,recommendSongs,recommendMvs]).then(function(data){
            console.log("data is ",data);
            self.swiperList = data[0].body.banners;
            self.recommendSongs = data[1].body.result;
            self.recommendMvs = data[2].body.result;
            console.log("swiperList is ",self.swiperList);
            console.log("recommendSongs is ",self.recommendSongs);
            console.log("recommendMvs is ",self.recommendMvs);
            self.isLoading = false;
        })
    },
    // beforeRouteEnter (to, from, next) {
    //     // ...
    //     console.log("进入首页");
    // },
    mounted() {
        
    },
    //方法的集合体
    methods : {
        callback : function(e){
            console.log("in callback e is ",e);
        }
    },
    //组件
    components:{
        swiper,
        swiperSlide,
        "c-songItem" : SongItem
    }
}
</script>
<style lang="less" scoped>
    .p-container{
        padding-top: 2.35rem;
        width: 100%;
    }
    .recommendSongs-con,.title,.title-left,.itemList-con{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-grow: nowrap;
    }
    .recommendSongs-con,.itemList-con{
        width:96%;
        justify-content: space-between;
        padding: 0px 2%;
    }
    .itemS{
        margin-right:5%;
        margin-bottom: 5%;
    }
    .itemS:nth-child(3n+0){
        margin-right: 0%;
    }
    .itemList-con{
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 96%;
    }
    .title{
        justify-content: space-between;
        .title-left{
            justify-content: flex-start;
        }
    }
</style>