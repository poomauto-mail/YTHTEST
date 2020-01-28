import { make } from "vuex-pathify";
import { logIn, logOut } from "../../api/authentication.api";
import router from "@/router";
import Vue from 'vue'
import VueJwtDecode from 'vue-jwt-decode'

const state = {
  userdata: "",
  loading: false
};

const mutations = {
  ...make.mutations(state)
};

const actions = {
  ...make.actions("authentication"),

  loginAction({ commit }, { username, password }) {
    commit("SET_LOADING", true)
    logIn(username, password).then( async res => {
      if (res.data != "") {
        res.data.credentialDecrypt = VueJwtDecode.decode(res.data.access_token)
        await Vue.forage.setValue("CREDENTIAL", res.data);
        commit("SET_LOADING", false)
        commit("SET_USERDATA", res.data);
        router.push({name: 'Home', url:"/dashboard"})
      } else {
        alert("incorrect credential!");
      }
    }).catch(error => {
      commit("SET_LOADING", false)
  });
  },

  logOutAction({commit}){
    logOut().then(res => {
      Vue.prototype.$removeItem("CREDENTIAL");
      router.push({name: 'Login', url:"pages/login"})
      alert('logout success')
    }).catch(error => {
      console.log(error);
  });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
