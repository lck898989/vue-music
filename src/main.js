// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui';
import VueRouter from 'vue-router';
import Vconsole from 'vconsole';
const vConsole = new Vconsole();
//发送异步请求
import VueResource from 'vue-resource';
import Store from './store/index'
Vue.use(VueResource);
Vue.use(vConsole);
Vue.config.productionTip = false
Vue.use(MuseUI);
Vue.use(VueRouter);
new Vue({
  el: '#app',
  router,
  store : Store,
  components: { App },
  template: '<App/>'
})
