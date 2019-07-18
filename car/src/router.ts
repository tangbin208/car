import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home.vue';
const Picture=()=>import("./views/picture.vue")
const Color=()=>import("./views/color.vue")
const Type=()=>import("./views/type.vue")

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/picture',
      name: 'picture',
      component: Picture,
    },
    {
      path: '/color',
      name: 'color',
      component: Color,
    },
    {
      path: '/type',
      name: 'type',
      component: Type,
    },
  ],
});
