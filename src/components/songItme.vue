<template>
    <div class="songItem-con">
        <router-link :to="target">
            <div>
                <img :src="songItem.picUrl" width="100%" lazy="loading">
                <div>
                    <h4>{{songItem.name}}</h4>
                </div>
                <div class="mask">
                    <!--过滤器接收第一个参数就是songItem.playCount-->
                    <div class="playCount">{{songItem.playCount | formatCount}}</div>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex';
export default {
    props : {
        /**
         * {
         *  copywriter :'',
         *  id         : 432424,
         *  picUrl     : '',
         *  playCount  : 3443434.3
         * }
         * 
         */
        songItem : Object
    },
    data(){
        return {
            target : {name:'playerListDetail',params:{
                id:this.songItem.id,
                copywriter:this.songItem.copywriter,
                picUrl : this.songItem.picUrl,
                playCount : this.songItem.playCount,
                name : this.songItem.name,
                }}
        }
    },
    methods : {
        // goDetail : function(e){
        //     console.log("e is ",e);
        //     console.log("this.store is ",this.$store);
        // }
        ...mapMutations(['setDetail'])
        // setDetail : function(e){
        //     console.log();
        //     this.$store.
        // }
    },
    computed : {
        
    },
    filters : {
        formatCount:function(v){
            if(v < 9999){
                return v;
            }else{
                console.log("palycount is ",v);
                return (v / 10000).toFixed(0) + '万';
            }
        }
    },
    created() {
        console.log("songItem is ",this.songItem);  
    },
    mounted() {
        console.log("setDetail is ",this.setDetail);
    },
}
</script>
<style lang="less" scoped>
    .songItem-con{
        width:30%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        a {
            color: rgba(0, 0, 0, 0.87);
            font-size: 0.3rem;
        }
        a:hover {text-decoration: none; }/* 鼠标移动到链接上 */
    }
    .mask{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 0.6rem;
        background: rgba(0,0,0,0.2);
    }
    .playCount{
        position: absolute;
        top: 0px;
        right: 0.2rem;
        color: #fff;
        font-size: 0.4rem;
        line-height: 0.6rem;
        text-align: center;
    }
</style>

