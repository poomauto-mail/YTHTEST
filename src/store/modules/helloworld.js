import { make } from "vuex-pathify";
import { getDemo, saveDemo } from "../../api/demo.api";

const state = {
  demo: "",
  firstName: "",
  lastName: ""
};

// const getters = {
//     ...make.getters(state),
//     demo: state => {
//       return state.demo
//     }
// };


const mutations = {
  ...make.mutations(state)
};

const actions = {
  ...make.actions("demo"),

  loadDemo({ commit }) {
    //call api here
    getDemo().then(res => {
      console.log("api response "+res)
      commit('SET_DEMO',res.data)
      // dispatch('setDemo',res.data)
    })
  },

  clearDemo({commit}, payload){
    commit("SET_DEMO",payload)
  }

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  
};
