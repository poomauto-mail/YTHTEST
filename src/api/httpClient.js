import axios from "axios";
import Vue from "vue";
import join from "url-join";
import router from "@/router";

//add headers
axios.interceptors.request.use(
  config => {
    return Vue.prototype.$getItem("CREDENTIAL").then(res => {
      if (res != null) {
        config.headers["Authorization"] = "Bearer " + res.access_token;
      }
      config.url = join(process.env.VUE_APP_ROOT_API, config.url);
      return config;
    });
  },
  error => {
    Promise.reject(error);
  }
);

//handler response
axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    switch (error.response.status) {
      case 400: //....
        break;
      case 401:
        alert("Unauthrorized!");
        router.replace("pages/login");
        Vue.prototype.$removeItem("CREDENTIAL");
        break;
      case 404: //....
        break;
      case 500:
        alert(error.response);
        break;
    }
  }
);

export const httpClient = axios;
