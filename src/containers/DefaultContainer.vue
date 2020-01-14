<template>
  <div class="app">
    <DefaultHeader />
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader />
        <SidebarForm />
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter />
        <SidebarMinimizer />
      </AppSidebar>
      <main class="main">
        <!-- <p>Click to <a href="#" @click.prevent="setData">Counter: {{ data }}</a></p> -->
        <form id="app" @submit="checkForm" action="" method="post">
          <div id="app">
            <p>Store {{getUserData}}</p>
            <p>Store {{getAllUsers}}</p>
            <p>Developer mode : {{mode}}
            <h2>Your Name Is: {{firstName}} {{lastName}}</h2>

            <label>
              First Name
              <input type="text" v-model="firstName" />
            </label>
            <label>
              Last Name
              <input type="text" v-model="lastName" />
            </label>
            <button type="button" @click="saveName()">Save</button>
            <button type="button" @click="loadDemo()">GetDemo</button>
            <button type="button" @click="clearDemo('demox')">ClearDemo</button>
            
            {{getDemo}}
          </div>
        </form>
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside />
      </AppAside>
    </div>
    <DefaultFooter />
  </div>
</template>

<script>
import nav from "@/_nav";
import {
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  Breadcrumb
} from "@coreui/vue";
import DefaultAside from "./DefaultAside";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";
import DefaultHeader from "./DefaultHeader";
import DefaultFooter from "./DefaultFooter";
import { get ,set ,call } from "vuex-pathify";
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "DefaultContainer",
  components: {
    AppSidebar,
    AppAside,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    DefaultFooter,
    DefaultHeader
  },
  data() {
    return {
      nav: nav.items,
      mode: process.env.NODE_ENVx+" API: "+ process.env.ROOT_API,
      firstName: "",
      lastName: ""
    };
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    },
    getDemo: get('hello/demo'),
    getUserData: get('authentication/userdata'),
    getAllUsers: get("alllist/sortDataGettersSearch",2)// sortDataGetters
  },
  methods: {
    checkForm:  function (e) {

    },
    saveName(){
      window.sessionStorage.setItem("SESSION","SESSION SAVE");
      this.$store.set("hello/firstName",this.firstName);
    }
    ,
    loadDemo: call("hello/loadDemo"),
    listact: call("alllist/allListAction"),
  },
  created : function() {
     this.listact();
    // alert(this.$store.)
  }
};
</script>
