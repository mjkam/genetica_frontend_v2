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
  name: 'Edge',
  props: ['totalTools', 'totalTasks', 'edge'],
  computed: {
    pathData() {
      let sourceTask = this.totalTasks.find(o => o.id == this.edge.sourceTaskId);
      let sourceTool = this.totalTools.find(o => o.id == sourceTask.toolId);
      let sourcePort = sourceTool.outputPorts.find(o => o.id == this.edge.sourceOutputPortId);

      let sourceTaskPosX = sourceTask.posX + sourcePort.posX;
      let sourceTaskPosY = sourceTask.posY + sourcePort.posY;

      let desTask = this.totalTasks.find(o => o.id == this.edge.desTaskId);
      let desTool = this.totalTools.find(o => o.id == desTask.toolId);
      let desPort = desTool.inputPorts.find(o => o.id == this.edge.desInputPortId);

      let desTaskPosX = desTask.posX + desPort.posX;
      let desTaskPosY = desTask.posY + desPort.posY;

      const link = d3.linkHorizontal()({
        source: [sourceTaskPosX, sourceTaskPosY],
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