import axios from "axios";
import Vue from "vue";
import join from "url-join";
import router from "@/router";
import configs from '../../public/config/index';

//add headers
axios.interceptors.request.use(
  config => {
    return Vue.prototype.$getItem("CREDENTIAL").then(res => {
      if (res != null) {
        config.headers["Authorization"] = "Bearer " + res.access_token;
      }
      config.url = join(configs.ROOT_API, config.url);
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
      case 400: 
      alert("Bad Request: "+ error)
        break;
      case 401:
        alert("Unauthrorized!");
        router.push({name: 'Login', url:"pages/login"})
        Vue.prototype.$removeItem("CREDENTIAL");
        break;
      case 404: //....
        break;
      case 500:
        router.push({name: 'Page500', url:"pages/500"})
        // alert(error.response);
        break;
    }
  }
);

export const httpClient = axios;
