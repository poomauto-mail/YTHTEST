import { make } from "vuex-pathify";
import { uploadFile } from "../../api/uploadfile.api";

var state = {
  file: "",
  status: ""
};

const mutations = {
  ...make.mutations(state)
};

const actions = {
  uploadAction({ commit }, payload) {debugger
    console.log(payload.values())
    uploadFile(payload).then(res => {
      commit("SET_STATUS", "OK");
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
