import Vue from 'vue'
import Vuex from 'vuex'
//import pathify from 'vuex-pathify'
import pathify from './pathify' // <-- note the ./ denoting a local file!
import hello from './modules/helloworld'
import authentication from './modules/authentication.module'
import alllist from './modules/alllist.module'
import createPersistedState from "vuex-persistedstate";
import VueLocalForage from 'vue-localforage'
import * as localforage from 'localforage' 

pathify.debug()
Vue.use(Vuex)
Vue.use(VueLocalForage)

// localforage.config({
//     driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
//     name        : 'myApp',
//     version     : 1.0,
//     size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
//     storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
//     description : 'some description'
//   });
const store = new Vuex.Store({
    modules: {
        hello,
        authentication,
        alllist
    },
    plugins:[pathify.plugin, createPersistedState({ storage: localforage })],
})

export default store
window.store = store