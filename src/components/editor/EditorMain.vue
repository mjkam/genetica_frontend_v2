<template>
  <div 
    @mousemove="moveMan($event)"
    @mouseup="unsetAll()">

    <svg width="1000" height="1000" ref="area">
      <Tool v-for="(task, idx) in editingPipeline.tasks" :key="idx" :totalTools="totalTools" :task="task" />
      <Edge v-for="(edge, idx) in editingPipeline.connectEdges" :key="idx" :totalTools="totalTools" :totalTasks="editingPipeline.tasks" :edge="edge"/>
      <VirtualFile v-if="virtualFileInfo != null" :info="virtualFileInfo"/>
      <VirtualEdge v-if="showVirtualPath" :info="connectablePortInfo"/>
      <InputEdge v-for="(inputEdge, idx) in editingPipeline.inputEdges" :key="idx" :totalTools="totalTools" :totalTasks="editingPipeline.tasks" :edge="inputEdge" :inputFiles="editingPipeline.inputFiles"/>
      <OutputEdge v-for="(outputEdge, idx) in editingPipeline.outputEdges" :key="idx" :totalTools="totalTools" :totalTasks="editingPipeline.tasks" :edge="outputEdge" :outputFiles="editingPipeline.outputFiles"/>
      <File v-for="(inputFile, idx) in editingPipeline.inputFiles" :key="idx" :ioType="'INPUT'" :fileInfo="inputFile"/>
      <File v-for="(outputFile, idx) in editingPipeline.outputFiles" :key="idx" :ioType="'OUTPUT'" :fileInfo="outputFile"/>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapMutations, mapGetters } from 'vuex'

import Tool from "./Tool.vue";
import File from "./File.vue";
import Edge from "./Edge.vue";
import VirtualFile from "./VirtualFile.vue";
import VirtualEdge from "./VirtualEdge.vue";
import InputEdge from "./InputEdge.vue";
import OutputEdge from "./OutputEdge.vue";

export default {
    computed: {
      ...mapGetters([
        'totalTools',
        'editingPipeline',
        'showVirtualFile',
        'connectablePortInfo',
        'virtualFileInfo',
        'inputFiles',
        'outputFiles',
        'inputEdges',
        'outputEdges'
      ]),
      showVirtualPath() {
        if (this.connectablePortInfo != null) {
          if (this.connectablePortInfo.portPosX != this.connectablePortInfo.mousePosX ||
            this.connectablePortInfo.portPosY != this.connectablePortInfo.mousePosY) {
              return true;
          }
        }
        return false;
      }
    },
    methods: {
      ...mapMutations([
        'toolMove',
        'unsetMoveableTool',
        'unsetConnectablePort',
        'unsetMoveableFile',
        'setArea',
      ]),
      unsetAll() {
        this.unsetMoveableTool();
        this.unsetConnectablePort();
        this.unsetMoveableFile();
      },  
      moveMan(e) {
        e.preventDefault();
        this.toolMove({posX: e.offsetX, posY: e.offsetY});
      },
    },
    components: { Tool, File, Edge, VirtualFile, VirtualEdge, InputEdge, OutputEdge },
    mounted() {
      this.setArea(this.$refs.area);
    }
}
</script>

<style>



</style>