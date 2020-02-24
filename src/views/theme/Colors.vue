<template>
  <div id="app">
    <div
      id="overlay"
      v-if="showVuePdf"
      class="d-inline-block"
      @mouseleave="mouseleaveMiddleToolBar()"
      @mouseover="mouseOverMiddleToolBar()"
    >
      <div id="top">
        <input class="form-controlx text-white" v-model.number="page" type="number" min="1" max="numPages" value="page" style="backgroundColor: black;width: 5em" />
        /{{numPages}}
        <button
          @click="showVuePdf = false;"
          type="button"
          class="close text-white"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div id="textLeftArrow">
        <button class="btn btn-lg text-white" :disabled="page == 1" @click="--page">
          <i style="color:white;" class="icon-arrow-left"></i>
        </button>
      </div>

      <div
        id="text"
        class="pdf-viewer-wrapper"
        :class="{'zoom-active': zoom > 100 }"
      >
        <pdf
          ref="viewpdf"
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
      <div  id="middle" class="w3-animate-fading">
        <button class="btn text-white" @click="rotate -= 90">
          <i class="icon-reload"></i>
        </button>
        <button class="btn text-white" @click="rotate += 90">
          <i class="icon-reload icon-flipped"></i>
        </button>
        <button class="btn text-white" :disabled="zoom == 100" @click="zoomOut()">
          <i class="icon-magnifier-remove"></i>
        </button>
        <button class="btn text-white" :disabled="zoom == 400" @click="zoomIn()">
          <i class="icon-magnifier-add"></i>
        </button>
        <button class="btn text-white">Download</button>
        <!-- <button class="btn text-white" @click="$refs.viewpdf.print()">print</button> -->
        <button class="btn text-white" >print</button>
      </div>
      <div id="textRightArrow">
        <button
          id="nextBtn"
          class="btn btn-lg text-white"
          :disabled="page == numPages"
          @click="++page"
        >
          <i style="color:white;" class="icon-arrow-right icons"></i>
        </button>
      </div>
    </div>

    <div style="padding:20px">
      <button @click="showVuePdf = true;">Turn on overlay effect</button>
    </div>
  </div>
</template>

<script>
import ColorTheme from "./ColorTheme";
import { get } from "vuex-pathify";
import pdf from "vue-pdf";
import { dragscroll } from "vue-dragscroll";
export default {
  directives: { dragscroll },
  name: "colors",
  components: { ColorTheme, pdf },
  data() {
    return {
      // src: "https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS",
      // src: "pdf/vue-js.pdf",
      // src: "pdf/yota-pdf.pdf",
      src: "pdf/start-website.pdf",
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0,
      mouseOverMiddleToolShow: false,
      zoom: 100,
      showVuePdf: false
    };
  },
  computed: {
    firstName: get("hello/firstName")
  },
  methods: {
    // mouseOverLeftArrow() {
    //   document.getElementById("textLeftArrow").style.backgroundColor = "#000";
    // },
    // mouseLeaveLeftArrow() {
    //   document.getElementById("textLeftArrow").style.backgroundColor = "";
    // },
    // mouseOverRightArrow() {
    //   document.getElementById("textRightArrow").style.backgroundColor = "#000";
    // },

    // mouseLeaveRightArrow() {
    //   document.getElementById("textRightArrow").style.backgroundColor = "";
    // },
    zoomIn() {
      document.getElementById("text").style.width = (this.zoom += 20) + "%";
      // document.getElementById("vuepdf").style.width = (this.zoom += 20) + "%";
      console.log(this.zoom);
    },
    zoomOut() {
      document.getElementById("text").style.width = (this.zoom -= 20) + "%";
      // document.getElementById("vuepdf").style.width = (this.zoom += 20) + "%";
      console.log(this.zoom);
    },

    mouseOverMiddleToolBar() {
      this.mouseOverMiddleToolShow = true;
    },
    mouseleaveMiddleToolBar() {
      this.mouseOverMiddleToolShow = false;
    },
    password: function(updatePassword, reason) {
      updatePassword(prompt('password is "test"'));
    },
    error: function(err) {
      console.log(err);
    }
  },
  beforeMount() {
    window.devicePixelRatio = 0;
  }
};
</script>
<style scoped lang='scss'>

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
  background-color: rgba(0, 0, 0, 0.281);
  z-index: 5000;
  cursor: pointer;
}




#text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  // transform: translate(-50%, -50%);
  // -ms-transform: translate(-50%, -50%);
}
#textLeftArrow {
  position: fixed;
  top: 50%;
  left: 0;
  /* transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%); */
}
#textLeftArrow:hover{
   background-color: #000;
}

#textRightArrow {
  position: fixed;
  top: 50%;
  right: 0;
  /* transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%); */
}

#textRightArrow:hover{
   background-color: #000;
}


#middle {
  display: block;
  text-align: center;
  border-radius: 7px;
  background-color: #000;
  position: relative;
  width: 370px;
  top: 90%;
  left: 50%;
  color: white;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}



#top {
  text-align: center;
  padding: 13.5px 0;
  margin-right: 15px;
  // border-radius: 2px;
  z-index: 1000;
  background-color: #000;
  position: fixed;
  width: 100%;
  height: 54.8px;
  // bottom: 50%;
  // left: 50%;
  color: white;
  // transform: translate(-50%, -50%);
  // -ms-transform: translate(-50%, -50%);
}
.icon-flipped {
  transform: scaleX(-1);
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -ms-transform: scaleX(-1);
}

.pdf-viewer-wrapper {
  overflow: hidden;
  max-height: 90vh;
  // transition:all 1s ease;
  &.zoom-active {
    cursor: grab;
  }

  
}
</style>
