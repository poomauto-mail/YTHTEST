<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account {{localforageKey}}</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      v-model="username"
                      class="form-control"
                      placeholder="Username"
                      autocomplete="username email"
                    />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      v-model="password"
                      class="form-control"
                      placeholder="Password"
                      autocomplete="current-password"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      {{username+password+" "+ spinner}}
                      <b-button
                        variant="primary"
                        v-on:click="loginAction({username,password})"
                        class="px-4"
                        v-bind:style="styles.loginBtnStyle"
                      >
                        <img
                          class="px-4"
                          v-bind:style="styles.spinnerStyles"
                          v-if="spinner"
                          src="img/spinner.gif"
                        />
                        Login
                      </b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { call, get } from "vuex-pathify";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      localforageKey: "",
      styles: {
        loginBtnStyle: {
        display: "flex",
      },
      spinnerStyles: {
        height: "25px",
        width: "auto"
      }
      }
    };
  },
  computed: {
    spinner: get("authentication/loading")
  },
  methods: {
    //call action in modules name maps in store/index.js
    ...call("authentication/*")
  },

  beforeCreate() {
    //way 1 this.$getItem("POOM",function(err, value) { console.log(value) });
    //way 2 this.$getItem("POOM").then(value => value);
    this.$removeItem("CREDENTIAL");
  }
};
</script>
