<template>
  <!-- style="width:100%;height:100%" class="container-fluid" -->
  <div>
    <div @mouseleave="mouseleaveLeftArrow()" @mouseover="mouseOverLeftArrow()">
          <div class="row">
            <div class="col-12">
              <p>Page {{page}} of {{numPages}}</p>
              <input v-model.number="page" type="number" style="width: 5em" max="numPages" min="1" />
              /{{numPages}}
              <button @click="rotate += 90">&#x27F3;</button>
              <button @click="rotate -= 90">&#x27F2;</button>
              <button @click="$refs.pdf.print()">print</button>
            </div>
          </div>
          <div class="row">
            <div id="leftArrow" class="col-2 text-center text-white">
              <div v-if="mouseOverLeftArrowShow">
                <i class="icon-arrow-left icons font-2xl d-block mt-4" @click="--page"></i>
                Previous
              </div>
            </div>
            <div
              class="col-8 parent"
              style="overflow: hidden; position: relative; backgroundColor: #62637a;width:60%; max-width:60%; max-height: 50%;height: 50%; "
            >
              <!-- <panZoom
          style="  max-width:50%; max-height: 40%;height: 40%;"
          :options="{minZoom: 0.2, maxZoom: 5}"
          @init="onInit"
          @mousedown="wheel"
              >-->
              <pdf
                v-if="show"
                ref="pdf"
                style=" #62637a;"
                :rotate="rotate"
                :src="src"
                :page="page"
                @progress="loadedRatio = $event"
                @error="error"
                @num-pages="numPages = $event"
                @link-clicked="page = $event"
              ></pdf>
              <!-- </panZoom> -->
            </div>
            <div
              id="rightArrow"
              class="col-2 text-center text-white"
              @mouseleave="mouseleaveLeftArrow()"
              @mouseover="mouseOverLeftArrow()"
            >
              <div v-if="mouseOverLeftArrowShow">
                <i class="icon-arrow-right icons font-2xl d-block mt-4" @click="++page"></i>Next
              </div>
            </div>
          </div>
    </div>
  </div>
</template>

<script>
import ColorTheme from "./ColorTheme";
import { get } from "vuex-pathify";
import pdf from "vue-pdf";
import fullscreen from "vue-fullscreen";
import Vue from "vue";
import ModalFullScreenVue from "modal-fullscreen-vue";
Vue.use(fullscreen);
export default {
  name: "colors",
  components: { ColorTheme, pdf, ModalFullScreenVue },
  data() {
    return {
      show: true,
      pdfList: ["https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS"],
      // src: "https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS",
      src: "pdf/vue-js.pdf",
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0,
      parentStyle: {},
      mouseOverLeftArrowShow: false,
      fullscreen: false
    };
  },
  computed: {
    firstName: get("hello/firstName")
  },
  methods: {
    handleShow(show) {
      alert(`show: ${show}`);
    },
    toggle() {
      this.$refs["fullscreen"].toggle(); // recommended
      // this.fullscreen = !this.fullscreen // deprecated
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    mouseOverLeftArrow() {
      this.mouseOverLeftArrowShow = true;
    },
    mouseleaveLeftArrow() {
      this.mouseOverLeftArrowShow = false;
    },
    password: function(updatePassword, reason) {
      updatePassword(prompt('password is "test"'));
    },
    error: function(err) {
      console.log(err);
    },
    onInit: function(panzoomInstance, id) {
      // panzoomInstance.dispose();
      panzoomInstance.on("pan", function(e) {
        // if(e.alts){
        // }
      });
    },
    wheel: function(e) {
      debugger;
    }
  }
};
</script>
<style scoped>
#leftArrow {
  background-color: #000;
}
#rightArrow {
  background-color: #000;
}
.center {
  padding: 70px 0;
  border: 3px solid green;
  text-align: center;
}
/* #outerContainer {
  width: 100%;
  height: 100%;
  position: relative;
}
#mainContainer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-width: 320px;
}
#mainContainer,
#viewerContainer,
.page,
.page canvas {
  position: static;
  padding: 0;
  margin: 0;
}
.toolbar {
  position: relative;
  left: 0;
  right: 0;
  z-index: 9999;
  cursor: default;
  background-color: #000;
}

#toolbarContainer {
  width: 100%;
}
#toolbarViewer {
  height: 32px;
  background-color: #000;
}
html[dir="ltr"] #toolbarViewerLeft,
html[dir="rtl"] #toolbarViewerRight {
  float: left;
}
html[dir="ltr"] #toolbarViewerRight,
html[dir="rtl"] #toolbarViewerLeft {
  float: right;
}
html[dir="ltr"] #toolbarViewerLeft > *,
html[dir="ltr"] #toolbarViewerMiddle > *,
html[dir="ltr"] #toolbarViewerRight > *,
html[dir="ltr"] .findbar * {
  position: relative;
  float: left;
}
html[dir="rtl"] #toolbarViewerLeft > *,
html[dir="rtl"] #toolbarViewerMiddle > *,
html[dir="rtl"] #toolbarViewerRight > *,
html[dir="rtl"] .findbar * {
  position: relative;
  float: right;
}

#toolbarViewerMiddle {
  background-color: #000;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
} */
</style>
