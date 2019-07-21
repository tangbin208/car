import Vue from 'vue';
import router from './router/index';
import store from './store';
import App from './App.vue';
import VueTouch from 'vue-touch'

// 去掉上线切到正式环境提示
Vue.config.productionTip = false;

// 设置v-touch 命令
Vue.use(VueTouch, {name: 'v-touch'})
VueTouch.config.swipe = {

  threshold: 100 //手指左右滑动距离

}
import '@/scss/reset.css';
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
