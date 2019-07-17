import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import VueTouch from 'vue-touch'

Vue.use(VueTouch, {name: 'v-touch'})
VueTouch.config.swipe = {

  threshold: 100 //手指左右滑动距离

}
//去掉上线切到正式环境提示
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
