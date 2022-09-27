<template>
  <div>
    <svg width="1000" height="1000">
      
      <Tool :posX="150" :posY="100"/>
      <File :posX="300" :posY="300"/>
      <!-- <path :d="d"/> -->
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import Tool from "./Tool.vue";
import File from "./File.vue";

export default {
    computed: {
        d() {
            const link = d3.linkHorizontal()({
                source: [100, 100],
                target: [400, 500]
            });
            return link;
        }
    },
    components: { Tool, File }
}
</script>

<style>
</style>