import { make } from "vuex-pathify";
import { logIn } from "../../api/authentication.api";
import router from "@/router";

const state = {
  userdata: ""
};

const mutations = {
  ...make.mutations(state)
};

const actions = {
  ...make.actions("authentication"),

  loginAction({ commit }, { username, password }) {
    logIn(username, password).then(res => {
      if (res.data != "") {
        router.push("pages/dashboard");
        commit("SET_USERDATA", res.data);
      } else {
        alert("incorrect credential!");
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
