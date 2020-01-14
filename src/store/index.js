import Vue from 'vue'
import Vuex from 'vuex'
//import pathify from 'vuex-pathify'
import pathify from './pathify' // <-- note the ./ denoting a local file!
import hello from './modules/helloworld'
import authentication from './modules/authentication.module'
import alllist from './modules/alllist.module'
import createPersistedState from "vuex-persistedstate";

pathify.debug()
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        hello,
        authentication,
        alllist
    },
    plugins:[pathify.plugin, createPersistedState({ storage: window.sessionStorage })],
})

export default store
window.store = store