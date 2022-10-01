<template>
  <g>
    <path :d="pathData">
    </path>
  </g>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import * as d3 from 'd3';

export default {
  name: 'OutputEdge',
  props: ['totalTools', 'totalTasks', 'outputFiles', 'edge'],
  computed: {
    pathData() {
      let sourceTask = this.totalTasks.find(o => o.id == this.edge.sourceTaskId);
      let sourceTool = this.totalTools.find(o => o.id == sourceTask.toolId);
      let sourcePort = sourceTool.outputPorts.find(o => o.id == this.edge.sourcePortId);

      let sourceTaskPosX = sourceTask.posX + sourcePort.posX;
      let sourceTaskPosY = sourceTask.posY + sourcePort.posY;
      
      let desFile = this.outputFiles.find(o => o.id == this.edge.desFileId);

      const link = d3.linkHorizontal()({
        source: [sourceTaskPosX, sourceTaskPosY],
        target: [desFile.posX + (-37), desFile.posY],
      });
      return link;
    }
  }
}
</script>

<style scoped>

path {
  stroke-width: 2px;
  stroke: #9a9a9a;
  fill: none;
}

</style>