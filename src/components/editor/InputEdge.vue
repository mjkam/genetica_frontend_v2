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
  name: 'InputEdge',
  props: ['totalTools', 'totalTasks', 'inputFiles', 'edge'],
  computed: {
    pathData() {
      let desTask = this.totalTasks.find(o => o.id == this.edge.desTaskId);
      let desTool = this.totalTools.find(o => o.id == desTask.toolId);
      let desPort = desTool.inputPorts.find(o => o.id == this.edge.desPortId);

      let desTaskPosX = desTask.posX + desPort.posX;
      let desTaskPosY = desTask.posY + desPort.posY;

      let sourceFile = this.inputFiles.find(o => o.id == this.edge.sourceFileId);

      const link = d3.linkHorizontal()({
        source: [sourceFile.posX + 37, sourceFile.posY],
        target: [desTaskPosX, desTaskPosY],
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