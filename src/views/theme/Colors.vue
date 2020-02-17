<template>
  <div id="app">
    <div id="overlay"  @mouseleave="mouseleaveLeftArrow()" @mouseover="mouseOverLeftArrow()">
      <div id="textLeftArrow">
        <i class="icon-arrow-left icons font-2xl d-block mt-4 text-white" @click="--page"></i>
        <!-- <button class="button" @click="--page">
          <i style="color:white;" class="icon-arrow-left"></i>
        </button>-->
      </div>
      <div id="top">a</div>
      <div id="text">
        <pdf
          v-if="show"
          ref="pdf"
          id="vuepdf"
          :rotate="rotate"
          :src="src"
          :page="page"
          @progress="loadedRatio = $event"
          @error="error"
          @num-pages="numPages = $event"
          @link-clicked="page = $event"
        ></pdf>
      </div>
      <div v-if="mouseOverLeftArrowShow" id="middle" class="w3-animate-fading">
        <button class="btn text-white" @click="rotate += 90">
          <i class="icon-reload"></i>
        </button>
        <button class="btn text-white" @click="rotate -= 90">
          <i class="icon-reload icon-flipped"></i>
        </button>
        <button class="btn text-white" @click="zoomIn()">
          <i class="icon-magnifier-remove"></i>
        </button>
        <button class="btn text-white" @click="zoomOut()">
          <i class="icon-magnifier-add"></i>
        </button>
        <button class="btn text-white">Download</button>
        <button class="btn text-white" @click="$refs.pdf.print()">print</button>
        <!-- <i class="icon-puzzle icons font-2xl h-block" @click="rotate += 90"></i>
        <i class="icon-puzzle icons font-2xl h-block ml-2" @click="rotate -= 90"></i>
        <i class="icon-puzzle icons font-2xl h-block ml-2"></i>
        <i class="icon-puzzle icons font-2xl h-block ml-2"></i>
        <i class="icon-puzzle icons font-2xl h-block ml-2"></i>-->
      </div>
      <div id="textRightArrow">
        <i class="icon-arrow-right icons font-2xl d-block mt-4 text-white" @click="++page"></i>
      </div>
    </div>

    <div style="padding:20px">
      <button @click="on()">Turn on overlay effect</button>
    </div>
  </div>
</template>

<script>
import ColorTheme from "./ColorTheme";
import { get } from "vuex-pathify";
import pdf from "vue-pdf";
import { Overlay } from "vuejs-overlay";

export default {
  name: "colors",
  components: { ColorTheme, pdf, Overlay },
  data() {
    return {
      show: true,
      pdfList: ["https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS"],
      src: "https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS",
      // src: "pdf/vue-js.pdf",
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0,
      parentStyle: {},
      mouseOverLeftArrowShow: false,
      fullscreen: false,
      opened: false,
      visible: false
    };
  },
  computed: {
    firstName: get("hello/firstName")
  },
  methods: {
    zoomIn(){debugger
      var width = document.getElementById("vuepdf").style.width ;
      
    },
    zoomOut(){
      document.getElementById("vuepdf").style.width -= 300;
    },
    on() {
      document.getElementById("overlay").style.display = "block";
    },
    off() {
      document.getElementById("overlay").style.display = "none";
    },
    openOverlay() {
      this.opened = this.visible = !true;
    },
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

#overlay {
  overflow: hidden;
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);

  cursor: pointer;
}
#text {
  position: fixed;
  /* width: 70%;
  height: 70%; */
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
#textLeftArrow {
  position: fixed;
  top: 50%;
  left: 0;
  /* transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%); */
}
#textRightArrow {
  position: fixed;
  top: 50%;
  right: 0;
  /* transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%); */
}
#middle {
  text-align: center;
  border-radius: 7px;
  background-color: #000;
  position: relative;
  width: 22%;
  top: 90%;
  left: 50%;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
#top {
  text-align: center;
  border-radius: 7px;
  background-color: #000;
  position: relative;
  width: 30%;
  bottom: 50%;
  left: 50%;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.button {
  background: rgb(23, 23, 23);
}
.icon-flipped {
    transform: scaleX(-1);
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -ms-transform: scaleX(-1);
}
</style>
