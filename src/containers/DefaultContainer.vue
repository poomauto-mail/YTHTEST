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
        <!-- <form id="app" @submit="checkForm" action="" method="post"> -->
        <div id="app">
          <data-tables
            :data="getJobs.jobs"
            :total="500"
            :action-col="actionCol"
            :filters="filters"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column
              v-for="title in titles"
              :prop="title.prop"
              :label="title.label"
              :key="title.prop"
              sortable="custom"
            ></el-table-column>
          </data-tables>
          <!-- <p>Store {{creadential}}</p>
            <p>Store  :{{getAllUsers}}</p>
            <p>Developer mode : {{mode}}
            <h2>Your Name Is: {{firstName}} {{lastName}}</h2>

            <label>
              First Name
              <input type="text" v-model="getAllUsersByIndex"/>
            </label>
            <label>
              Last Name
              <input type="text" v-model="lastName" />
            </label>
            <button type="button" @click="saveName()">Save</button>
            <button type="button" @click="loadDemo()">GetDemo</button>
          <button type="button" @click="clearDemo('demox')">ClearDemo</button>-->
          <p>Developer mode : {{mode}}</p>
          {{getDemo}}
        </div>
        <!-- </form> -->

        <Breadcrumb :list="list" />
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
import { get, call } from "vuex-pathify";
import router from "@/router";
import Vue from "vue";

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
      mode: process.env.NODE_ENV,
      firstName: "",
      lastName: "",
      creadential: {},
      currentPage: 1,
      data: [],
      titles: [{
        prop: "id",
        label:"no"
      },
      {
        prop:"name",
        label:"name"
      }
      ],
      filters: [
        {
          prop: "flow_no",
          value: ""
        }
      ],
      actionCol: {
        props: {
          label: "Actionssss"
        },
        buttons: [
          {
            props: {
              type: "primary"
            },
            handler: row => {
              this.$message("Edit clicked");
              row.flow_no = "hello word" + Math.random();
              row.content = Math.random() > 0.5 ? "Water flood" : "Lock broken";
              row.flow_type = Math.random() > 0.5 ? "Repair" : "Help";
            },
            label: "Edit"
          },
          {
            handler: row => {
              this.data.splice(this.data.indexOf(row), 1);
              this.$message("delete success");
            },
            label: "delete"
          }
        ]
      }
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
    getDemo: get("hello/demo"),
    getUserData: get("authentication/userdata"),
    //getAllUsers: get("alllist/sortDataGettersSearch",2)// sortDataGetters
    getAllUsers: get("alllist/supplierlist"),
    getAllUsersByIndex: get("alllist/supplierlist@suppliers[0].name"),
    getJobs: get("alllist/jobList"),
    totalPage: get("alllist/jobList@total")
  },
  methods: {
    checkForm: function(e) {},
    saveName() {
      window.sessionStorage.setItem("SESSION", "SESSION SAVE");
      this.$store.set("hello/firstName", this.firstName);
    },
    loadDemo: call("hello/loadDemo"),
    listAction: call("alllist/allListAction"),
    jobListAction: call("alllist/listPaginationAction"),

    onCreate() {
      this.data.push({
        content: "new created",
        flow_no: "FW201601010003" + Math.floor(Math.random() * 100),
        flow_type: "Help",
        flow_type_code: "help"
      });
    },
    onCreate100() {
      [...new Array(100)].map(_ => {
        this.onCreate();
      });
    },
    handleSelectionChange(val) {
      this.selectedRow = val;
    },
    bulkDelete() {
      this.selectedRow.map(row => {
        this.data.splice(this.data.indexOf(row), 1);
      });
      this.$message("bulk delete success");
    }
  },
  created: function() {
    this.jobListAction("markup");
    this.listAction();
    this.$getItem("CREDENTIAL").then(res => (this.creadential = res));
    // alert(this.$store.)
  },
  mounted() {
    //Vue.prototype.$removeItem("CREDENTIAL");
    //router.push("pages/login");
  }
};
</script>
