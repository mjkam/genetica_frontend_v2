<template>
  <div @mousemove="moveMan($event)">
    <svg width="1000" height="1000">
      
      <Tool v-for="(tool, idx) in allTools" :key="idx" :toolData="tool" />
      <!-- <File :posX="300" :posY="300"/> -->
      <!-- <path :d="d"/> -->
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapMutations, mapGetters } from 'vuex'

import Tool from "./Tool.vue";
import File from "./File.vue";

export default {
    computed: {
      ...mapGetters([
        'allTools'
      ]),
        d() {
            const link = d3.linkHorizontal()({
                source: [100, 100],
                target: [400, 500]
            });
            return link;
        }
    },
    methods: {
      ...mapMutations([
        'toolMove'
      ]),
      moveMan(e) {
        e.preventDefault();
        this.toolMove(e);
      },
    },
    components: { Tool, File }
}
</script>

<style>
</style>