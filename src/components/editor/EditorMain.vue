<template>
  <div @mousemove="moveMan($event)">
    <svg width="1000" height="1000">
      
      <Tool v-for="(task, idx) in editingPipeline.tasks" :key="idx" :totalTools="totalTools" :task="task" />
      <Edge v-for="(edge, idx) in editingPipeline.connectEdges" :key="idx" :totalTools="totalTools" :totalTasks="editingPipeline.tasks" :edge="edge"/>
      <!-- <File :posX="300" :posY="300"/> -->
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapMutations, mapGetters } from 'vuex'

import Tool from "./Tool.vue";
import File from "./File.vue";
import Edge from "./Edge.vue";

export default {
    computed: {
      ...mapGetters([
        'totalTools',
        'editingPipeline',
      ]),
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
    components: { Tool, File, Edge }
}
</script>

<style>
</style>