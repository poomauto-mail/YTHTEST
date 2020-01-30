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
          <b-form-group
            label="Per page"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
          </b-form-group>
          <b-table
            show-empty
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            sort-icon-left
            responsive="sm"
            @sort-changed="sortingChanged"
          ></b-table>
          <b-pagination size="md" :total-rows="totalPage" v-model="currentPage" :per-page="perPage"></b-pagination>
          <b-col sm="5" md="6" class="my-1"></b-col>
          <div>
            Sorting By:
            <b>{{ sortBy }}</b>, Sort Direction:
            <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
          </div>
          <p>Developer mode : {{mode}}</p>
          <!-- {{getDemo}} -->
        </div>
        <!-- </form> -->

        <Breadcrumb :list="list" />
        <div class="container-fluid">
          <!-- <router-view></router-view> -->
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
      sortBy: "supplier name",
      sortDesc: false,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      items: [],
      fields: [
        {
          key: "id",
          label: "job id",
          sortable: false,
          orderable: false
        },
        {
          key: "name",
          label: "supplier name",
          sortable: true
        },
        // { key: "fileName", label: "file name" },
        { key: "creationDate", label: "creation date", sortable: true }
      ],
      json: {}
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
    totalPage: get("alllist/jobList@total")
  },
  methods: {
    sortingChanged(ctx) {
      if (ctx.sortBy != "") {
        //not important
        this.json.orderproperty =
          ctx.sortBy.toUpperCase() == "CREATIONDATE"
            ? "CREATEDATE"
            : ctx.sortBy.toUpperCase();
        this.json.orderbydescending = ctx.sortDesc; //
        this.jobListAction(this.json);
        this.items = get("alllist/jobList@jobs");
      }
    },
    checkForm: function(e) {},
    saveName() {
      window.sessionStorage.setItem("SESSION", "SESSION SAVE");
      this.$store.set("hello/firstName", this.firstName);
    },
    loadDemo: call("hello/loadDemo"),
    listAction: call("alllist/allListAction"),
    jobListAction: call("alllist/listPaginationAction")
  },
  watch: {
    currentPage: {
      handler: function(value) {
        //debugger;
        this.json.pagesize = this.perPage;
        this.json.pagenumber = parseInt(value) || 1;
        this.jobListAction(this.json);
      }
    },
      perPage: {
        handler: function(value) {//debugger
          this.json.pagesize = value;
          this.json.pagenumber =this.currentPage;
          this.jobListAction(this.json);
        }
      }
  },
  beforeMount: function() {
    this.json = {
      pagesize: this.perPage,
      pagenumber: this.currentPage,
      orderproperty: "CREATEDATE",
      orderbydescending: true,
      search: []
    };
    this.jobListAction(this.json);
    this.items = get("alllist/jobList@jobs");
    this.listAction();
    this.$getItem("CREDENTIAL").then(res => (this.creadential = res));
  },
  beforeUpdate: function() {
    this.items = get("alllist/jobList@jobs");
  }
};
</script>
