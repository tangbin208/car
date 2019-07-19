import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// 引入子模块
import car from './modules/car';
import Mo from "./modules/mo"
import quotation from "./modules/quotation"
import home from "./modules/home"
import picture from "./modules/picture"

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
       Mo,
       car,
       quotation,
       home,
       picture,
    },
    plugins: [createLogger()]
})

