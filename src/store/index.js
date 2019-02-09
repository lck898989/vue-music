import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import api from '../api/index.js';
Vue.use(Vuex);
const state = {
    //是否进入音乐详情
    isDetail : false,
    //正在播放的音乐列表，
    playingMusicList : [],
    //当前播放的歌曲的位置
    currentIndex : 0,
    //是否正在播放，
    playing : false,
    //音频对象
    audio : {},
    //当前音乐播放所需要的总时长
    duration : 0,
    //当前播放到哪个位置了
    currentTime : 0,
}
//必须是同步的方法
const mutations = {
    setDetail(state,stateObj){
        console.log("进入state and stateObj is ",stateObj);
        let willChangeState = stateObj.state;
        let stateValue = stateObj.value;
        state[willChangeState] = stateValue;
        console.log("state.isDetail is ",state.isDetail);
    },
    addMusicList(state,music){
        let added = false;
        for(let i = 0,len = state.playingMusicList.length;i < len;i++){
            if(state.playingMusicList[i].id === music.id){
                added = true;
            }
        }
        if(!added){
            state.playingMusicList.push(music);
        }
        console.log("in store music is ",state.playingMusicList);
    },
    //控制播放音乐的状态
    musicController(state,controlString){
        switch(controlString){
            case "play":
                state.playing = true;
                break;
            case "pause":
                state.playing = false;
                break;
        }
    },
    //设置该歌曲的总时长
    resetDuration(satte,duration){
        console.log("这首歌的总时长是：",duration);
        state.duration = duration;
    },
    //设置该歌曲现在播放到哪了
    resetCurrentTime(state,currentTime){
        state.currentTime = currentTime;
    }
}
//属性改变的时候就会改变state中的值
const getters = {
    detailValue(state){
        console.log("state is changed and state is ",state);
        return state.isDetail;
    },
    //获得正在播放的列表
    musicList(state){
        return state.playingMusicList;
    },
    //获取正在播放的音乐
    playingMusic(state){
        return state.audio;
    },
    isPlaying(state){
        return state.playing;
    },
    durationValue(state){
        return state.duration;
    },
    currentTimeValue(state){
        return state.currentTime;   
    }
}
//包括异步操作
const actions = {
    setDetail({commit}){
        commit('setDetail');
    },
    //根据各区id获取音频url
    getSongs({commit,state},id){
        console.log("id is ",id);
        Axios.get(api.getSong(id)).then(data=>{
            console.log("data is ",data);
            let audio = data.data.data[0];
            state.audio = audio;
        })
    }
}
const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});
export default store;