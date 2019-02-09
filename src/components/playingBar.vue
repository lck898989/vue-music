<template>
    <div class="playing-wrapper">
        <audio id="audioLocation" :src="playingMusic.url" @timeupdate="updateTime" @canplay="canPlay"></audio>
        <div class="customAudio" v-if="!!currentPlaying && !!playingMusic">
            <div class="left-con">
                <img :src="currentPlaying.al.picUrl" class="audioImg">
                <div class="songName">
                    <div class="singer">{{currentPlaying.name}}</div>    
                    <div class="song-name">{{currentPlaying.ar[0].name}}</div>    
                </div>
            </div>
            <div class="right-con">
                <img src="../../static/playbar_btn_playlist.png" class="controllIcon" @click="playList">
                <img v-if='!isPlaying' src="../../static/playbar_btn_play.png" class="controllIcon" @click="MusicController('play')">
                <img v-else src="../../static/playbar_btn_pause.png" class="controllIcon" @click="MusicController('pause')">
                <img src="../../static/playbar_btn_next.png" class="controllIcon" @click="nextMusic">
            </div>
        </div>
        <div class="progress">
            <!-- {{(currentTimeValue *100 / durationValue).toFixed(0) + '%'}} -->
            <div class="progressBar"></div>
        </div>
    </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex';
export default {
    data(){
        return {
            audio : null,
            duration : 0,
        }
    },
    beforeRouteEnter (to, from, next) {
        // ...
        console.log("进入正在播放的显示栏");
    },
    created() {
        //现在还不能访问文档元素还没有绑定完成重要的事情说三遍，说三遍，说三遍
        console.log("in playingBar songList is ",this.musicList);
    },
    updated() {
        
    },
    //监听属性
    watch : {
        
    },
    mounted() {
        this.audio = document.getElementById('audioLocation');
        console.log("audio is ",this.audio);
        this.$nextTick(function(){
            
        }.bind(this))
    },
    computed: {
        ...mapGetters(['musicList','playingMusic','isPlaying','durationValue','currentTimeValue']),
        ...mapMutations(['addMusicList']),
        //当前播放的音乐
        currentPlaying(){
            console.log("this.musicList is ",this.musicList);
            return this.musicList[this.musicList.length - 1];
        }
    },
    methods : {
        //显示播放列表
        playList(){
            
        },
        nextMusic(){

        },
        //控制音乐的播放和暂停
        MusicController(params){
            switch(params){
                case "play":
                    this.audio.play();
                    //播放音乐
                    //获取音乐的时间
                    console.log("audio's length is ",this.audio.duration);
                    this.$store.commit('musicController',params);
                    break;
                case "pause":
                    this.audio.pause();
                    this.$store.commit('musicController',params);
                    break;
            }
        },
        //音乐已经准备好了可以开始播放了
        canPlay(){
            console.log("音乐已经准备好了可以开始播放了");
            console.log("this.audio.duration is ",this.audio.duration);
            this.$store.commit('resetDuration',this.audio.duration);
            this.$store.commit('resetCurrentTime',0);
            this.progressBar = document.getElementsByClassName('progressBar')[0];
        },
        //播放的音乐时间和位置发生变化时候出发
        updateTime(){
            console.log("currentTime is ",typeof this.audio.currentTime);
            console.log("进度是：",(this.audio.currentTime / this.audio.duration) * 100 + '%');
            this.$store.commit('resetCurrentTime',this.audio.currentTime);
            console.log("this.progressBar is ",this.progressBar.style);
            this.progressBar.style.left = '' + (-100 + (this.currentTimeValue *100 / this.durationValue)) + '%'
            console.log("after setLeft this.progressBar is ",this.progressBar.style);
            // :style="{'left': (-100 + (currentTimeValue *100 / durationValue)) + '%'}"
        }

    },
}
</script>
<style lang="less" scoped>
    audio{
        display: block;
    }
    .customAudio,.left-con,.right-con,.playing-wrapper{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
    }
    .playing-wrapper{
        width: 100%;
        position: fixed;
        line-height: 0.5rem;
        bottom: 0rem;
        background: #fff;
        z-index: 20;
        flex-direction: column;
    }
    .customAudio{
        width: 94%;
        padding: 0.3rem 3%;
        justify-content: space-between;
        .left-con{
            .songName{
                margin-left: 0.4rem;
                .singer{
                    font-size: 0.3rem;
                }
                .song-name{
                    color: gray;
                }
            }
        }
        .right-con{
            .controllIcon{
                width: 1rem;
                cursor: pointer;
            }
        }
    }
    .audioImg{
        width: 1.2rem;
    }
    .progress{
        width: 100%;
        background: #f2f2f2;
        position: relative;
        height:0.1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: nowrap;
        .progressBar{
            width: 100%;
            position: absolute;
            left: -100%;
            background: #ec0023;
            height: 0.1rem;
        }
    }
</style>


