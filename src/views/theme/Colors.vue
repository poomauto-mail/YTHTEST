<template>
  <div align="center">
    <!-- <input type="checkbox" v-model="show" /> -->
    <!-- <select v-model="src" style="width: 30em">
            <option v-for="item in pdfList" :value="item" v-text="item"></option>
    </select>-->
    <input v-model.number="page" type="number" style="width: 5em" max="numPages" min="1" />
    /{{numPages}}
    <button @click="rotate += 90">&#x27F3;</button>
    <button @click="rotate -= 90">&#x27F2;</button>
    <button @click="$refs.pdf.print()">print</button>
    <div
      class="parent"
      style="overflow: hidden; position: relative; backgroundColor: #62637a;width:60%; max-width:60%; max-height: 50%;height: 50%; "
    >
      <panZoom
        style="  max-width:50%; max-height: 40%;height: 40%;"
        :options="{minZoom: 0.2, maxZoom: 5}"
        @init="onInit"
        @mousedown="wheel"
      >
        <pdf
          v-if="show"
          ref="pdf"
          style="border: 1px solid #62637a;"
          :src="src"
          :page="page"
          :rotate="rotate"
          @progress="loadedRatio = $event"
          @error="error"
          @num-pages="numPages = $event"
          @link-clicked="page = $event"
        ></pdf>
      </panZoom>
      <!-- <div
        v-if="loadedRatio > 0 && loadedRatio < 1"
        style="background-color: green; color: white; text-align: center"
        :style="{ width: loadedRatio * 100 + '%' }"
      >{{ Math.floor(loadedRatio * 100) }}%</div>-->
    </div>
  </div>
</template>

<script>
import ColorTheme from "./ColorTheme";
import { get } from "vuex-pathify";
import pdf from "vue-pdf";

export default {
  name: "colors",
  components: { ColorTheme, pdf },
  data() {
    return {
      show: true,
      pdfList: ["https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS"],
      src: "https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS",
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0,
      parentStyle: {}
    };
  },
  computed: {
    firstName: get("hello/firstName")
  },
  methods: {
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
