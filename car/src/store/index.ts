import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// 引入子模块

Vue.use(Vuex);
 import home from "./modules/home"
export default new Vuex.Store({
    modules: {
       home
    },
    plugins: [createLogger()]
})

