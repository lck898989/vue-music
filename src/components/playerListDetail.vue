<template>
    <div class="list-con">
        <div class="mohuc">
            <div class="gedan">
                <img src="../../static/back.png" class="back" @click="backIndex" :class="{clickBackStyle:clickBack}">
                <div>歌单</div>
            </div>
            <div class="img-text-con">
                <img :src="picUrl" width="35%" class="ig">
                <div>{{name}}</div>
            </div>
            <img class="backImg" :src="picUrl">
        </div>
        <div class="play-option">
            <div class="play-op">
                <img src="../../static/add.png" class="add">
                <div><h2>播放全部</h2></div>
            </div>
        </div>
        <div class="songListCon">
            <div v-if="loading">Loading...</div>
            <div v-else v-for="(item,index) in songList" :key='item.id' class="songListItem" :class="{backAnimation : item.playing}" @click="play(item,index)">
                <div class="index" :class="{playingStyle : item.playing}">{{index + 1}}</div>
                <div class="song-name">
                    <div class="songName" :class="{playingStyle : item.playing}">{{item.name}}</div>
                    <div class="singerName" :class="{playingStyle : item.playing}">{{item.ar[0].name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex';
import api from '@/api/index.js'
import songItmeVue from './songItme.vue';
export default {
    data(){
        return {
            name : '',
            copywriter : '',
            picUrl : "",
            playCount : 0,
            //点击文字的效果
            clickBack : false,
            songList : [],
            loading : true,
        }
    },
    //接收路由传递进来的参数每次进入该组件时都会触发
    beforeRouteEnter (to, from, next) {
        let self = this;
        next(vm=>{
            console.log("to is ",to);
            let params = to.params;
            vm.name = params.name;
            let id = params.id;
            vm.copywriter = params.copywriter;
            vm.picUrl = params.picUrl;
            vm.playCount = params.playCount;
            vm.clickBack = false;
            vm.loading = true;
            console.log("vm is ",vm);
            vm.$store.commit('setDetail',{state:'isDetail',value:true});
            let detailValue = vm.$http.get(api.getPlayListDetail(id));
            console.log("detailValue is ",detailValue);
            detailValue.then(function(res){
                console.log("res is ",res)
                vm.songList = res.body.playlist.tracks;
                vm.loading = false;
                console.log("songList is ",vm);
            })
        });
        window.onscroll = ()=>{
            // let opa = window.pageYOffset / 150;
        }
    },
    beforeRouteLeave (to, from, next) {
        // ...
        window.onscroll = null;
        next();
    },
    created() {
        this.$store.commit('setDetail',{state:'isDetail',value:true});
        console.log("store is ",this.$store.state);
        console.log("router is ",this.$router);
        console.log("clickBack is ",this.clickBack);
        this.clickBack = false;
        // let id = this.$router.params.id;
        // console.log(id);
        // let detailList = this.$http.get(api.getPlayListDetail(id));
        // console.log("detailList is ",detailList);
    },
    computed: {
        ...mapGetters(['detailValue','isPlaying']),
        ...mapMutations(['setDetail']),
        
    },
    watch: {
        //当songList发生变化该函数就会执行
        songList : function(songItem){
            console.log("songItem is ",songItem);
        },
        deep : true
    },
    mounted() {
        console.log();
    },
    methods : {
        backIndex : function(){
            this.clickBack = true;
            //实现
            let self =this;
            //显示头部信息
            setTimeout(() => {
                self.$store.commit('setDetail',{state:'isDetail',value:false});
                self.$router.go(-1);
            }, 80);
        },
        //播放该音乐
        play : function(songItem,index){
            console.log("songItem is ",songItem);
            this.$store.commit('addMusicList',songItem);
            // songItem.playing = true;
            //搜索列表中该音乐找到该音乐之后将他的名字的颜色改为红色
            //向音乐列表中添加新属性playing = true;
            for(let i = 0,len = this.songList.length;i < len;i++){
                if(this.songList[i].id === songItem.id){
                    this.$set(this.songList[index],'playing',true);
                }else{
                    if(this.songList[i].playing === 'undefined' || this.songList[i].playing === true){
                        this.$set(this.songList[i],'playing',false);
                    }
                }
            }
            //将当前音乐的播放状态转成false
            this.$store.commit('musicController',"pause");
            //获取音频的地址(actions动作)
            this.$store.dispatch('getSongs',songItem.id);
        }
    }
}
</script>
<style lang="less" scoped>
    .list-con,.mohuc,.gedan,.img-text-con,.play-option,.play-op,.songListItem,.song-name{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-wrap: nowrap;
        justify-content: flex-start; 
    }
    .list-con{
        width:100%;
        padding-bottom: 1.5rem;
    }
    .play-option{
        margin-top: 1rem;
        flex-direction: row;
        align-items: center;
        margin-left: 0.46rem;
        border-bottom: 1px solid #f2f2f2;
        cursor: pointer;
    }
    .play-op:hover{
        background: #f2f2f2;
    }
    .play-op{
        flex-direction: row;
        align-items: center;
        padding: 0.2rem 0.2rem;
    }
    .add{
        width:0.4rem;
        margin-right: 0.5rem;
    }
    .mohuc{
        width: 100%;
        // filter: blur(1rem);
        position: relative;
    }
    .backImg{
        width: 100%;
        height: 6rem;
        position: absolute;
        top: 0px;
        left: 0px;
        filter: blur(1rem);
    }
    .clickBackStyle{
        background: rgba(255,255,255,0.3);
        animation: backRes;
        animation-duration: 0.5s;
        animation-iteration-count: 1;
    }
    @keyframes backRes {
        from{
            background: rgba(255,255,255,0.3);
        }to{
            background: transparent;
        }
    }
    .back{
        margin-right: 20px;
        cursor: pointer;
        width: 0.6rem;
        padding: 0.2rem;
        border-radius: 0.8rem;
    }
    .gedan{
        margin-top:0.5rem;
        margin-left: 0.5rem;
        margin-bottom: 0.4rem;
        flex-direction: row;
        font-size: 0.5rem;
        z-index: 1;
        color: #fff;
    }
    .img-text-con{
        flex-direction: row;
        align-items: center;
        z-index: 1;
    }
    .ig{
        margin-left: 0.5rem;
        margin-right: 0.4rem;
    }
    .songListCon{
        width: 100%;
    }
    .songListItem{
        cursor: pointer;
        width:99%;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding-left: 1%;
    }
   
    .songListItem:hover{
        background: #f2f2f2;
    }
    .index{
        font-weight: bolder;
        color: grey;
        font-size: 0.5rem;
        width: 5%;
    }
    .song-name{
        width: 95%;
        margin-left: 0.5rem;
        border-bottom: 1px solid #f2f2f2;
        padding: 0.3rem 0rem;
    }
    .songName{
        font-size:0.4rem;
    }
    .singerName{
        margin-top: 0.2rem;
        font-size: 0.35rem;
        color: gray;
    }
    .playingStyle{
        color: #ec0023;
    }
    .backAnimation{
        animation: backChange 0.4s ease-in-out;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
    }
    @keyframes backChange {
        from{
            background: #f2f2f2;
        }to{
            background: #fff;
        }
    }
</style>


