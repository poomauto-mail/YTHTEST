import axios from "axios";
import Vue from "vue";
import join from "url-join";
import router from "@/router";
import configs from "../../public/config/index";

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
  async function(error) {
    try {debugger
      switch (error.response.status) {
        case 400:
          alert("Bad Request: " + error);
          break;
        case 401:
          alert("Unauthrorized!");
          await Vue.forage.removeItem("CREDENTIAL");
          router.push({ name: "Login", url: "pages/login" });
          break;
        case 404: //....
          break;
        case 500:
          router.push({ name: "Page500", url: "pages/500" });
          // alert(error.response);
          break;
      }
    } catch (error) {debugger
      await Vue.forage.removeItem("CREDENTIAL");
      router.push({ name: "Login", url: "pages/login" });
    }
  }
);

export const httpClient = axios;
