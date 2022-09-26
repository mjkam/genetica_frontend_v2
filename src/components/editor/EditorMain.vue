<template>
  <div>
    <svg width="1000" height="1000">
      <path stroke="#aabbcc" stroke-width="2" d="M386.06,0H175V58.29l50,50V50H337.81V163.38h25l86.19.24V412.86H225V353.71l-50,50v59.15H499V112.94Zm1.75,113.45v-41l41.1,41.1Z"></path>
      <Tool />
      <File />
      <path :d="d"/>
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
  path {
  stroke-width: 2px;
  stroke: #9a9a9a;
  fill: none;
}

</style>