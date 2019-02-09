const baseUrl = 'http://api.javaswing.cn';
const baseUrl2 = 'https://api.imjad.cn/cloudmusic';
export default {
    /**
     * 
     * 获取首页Banner图片数据
     * 
     */
    getBannerList () {
        return `${baseUrl}/banner`
    },
    /***
     * 
     * 获得推荐歌单
     * 
     */
    getPersonalized () {
        return `${baseUrl}/personalized`
    },
    getPersonalizedMv () {
        return `${baseUrl}/personalized/mv`
    },
    getPlayListByWhere (offset,limit){
        return `${baseUrl}/top/playlist?limit=${limit}&order=all&offset=${offset}`
    },
    /**
   * 获取歌词API
   * @param {Number} id
   */
    getLrc (id) {
        return `${baseUrl}/lyric?id=${id}`
    },
    /**
     * 获取歌曲 播放URL
     * @param {Number} id
     */
    getSong (id) {
        return `${baseUrl}/song/url?id=${id}`
    },
    /**
     * 获取歌单详情
     * @param {Number} id
     */
    getPlayListDetail (id) {
        return `${baseUrl}/playlist/detail?id=${id}`
    },
    getMv (id) {
        return baseUrl2 + '?type=mv&id=' + id
    },
    search (words) {
        return baseUrl2 + '?type=search&s=' + words
    }
}