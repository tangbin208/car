import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home.vue';
const Car = () => import('@/views/Car.vue')
const Type = () => import('@/views/type.vue')
const Quotation = () => import('@/views/Quotation.vue')
const Picture=()=>import("@/views/picture.vue")
const Color=()=>import("@/views/color.vue")

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
      path: '/car/:id',
      name: 'car',
      component: Car,
    },
    {
      path: '/picture',
      name: 'picture',
      component: Picture,
    },
    {
      path: '/quotation/:car_id',
      name: 'quotation',
      component: Quotation,
    },
    {
      path: '/type',
      name: 'type',
      component: Type,
    },
    {
      path: '/color',
      name: 'color',
      component: Color,
    },
  ],
});
