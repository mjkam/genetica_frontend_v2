<template>
  <g
    @mouseup="toolMouseUp($event, task.id)"
    tabIndex="100"
    :transform="`matrix(1, 0, 0, 1, ${task.posX}, ${task.posY})`">
    <g 
      @mousedown="toolMouseDown($event, task.id)" 
      transform="matrix(1, 0, 0, 1, 0, 0)">
      <circle cx="0" cy="0" r="37" :fill="bigCircleFill" :stroke="bigCircleStroke" :stroke-width="bigCircleStrokeWidth"></circle>
      <circle cx="0" cy="0" r="27.75" :fill="smallCircleFill"></circle>

      <svg class="node-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.39 397.78" x="-10" y="-8" width="20" height="15">
        <polygon points="38.77 397.57 0 366 136.15 198.78 0 31.57 38.77 0 200.63 198.78 38.77 397.57"></polygon>
        <rect x="198.39" y="347.78" width="200" height="50"></rect>
      </svg>
    </g>
    <text class="label" transform="matrix(1.30067 0 0 1.30067 0 67)">{{ toolName }}</text>

    <g
      @mousedown="portMouseDown($event, p, 'INPUT')" 
      v-for="(p, idx) in inputPorts"
      :key="idx" 
      fill="#9a9a9a" :transform="`matrix(1, 0, 0, 1, ${p.posX}, ${p.posY})`">
      <g class="io-port">
        <circle cx="0" cy="0" r="7" class="port-handle"></circle>
      </g>
      <text class="input-port" x="0" y="0" transform="matrix(1.30067 0 0 1.30067 0 0)">{{ p.label }}</text>
    </g>

    <g
      @mousedown="portMouseDown($event, p, 'OUTPUT')" 
      v-for="(p, idx) in outputPorts"
      :key="idx" 
      fill="#9a9a9a" :transform="`matrix(1, 0, 0, 1, ${p.posX}, ${p.posY})`">
      <g class="io-port">
        <circle cx="0" cy="0" r="7" class="port-handle"></circle>
      </g>
      <text class="output-port" x="0" y="0" transform="matrix(1.30067 0 0 1.30067 0 0)">{{ p.label }}</text>
    </g>
  </g>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: ['totalTools', 'task'],
  data() {
    return {
      bigCircleFill: "#ffffff",
      bigCircleStroke: "#9a9a9a",
      bigCircleStrokeWidth: 2,
      smallCircleFill: "#11a7a7",
    }
  },
  computed: {
    toolName() {
      let foundTool = this.totalTools.find(o => o.id == this.task.toolId);
      return foundTool.name;
    },
    inputPorts() {
      let foundTool = this.totalTools.find(o => o.id == this.task.toolId);
      return foundTool.inputPorts;
    },
    outputPorts() {
      let foundTool = this.totalTools.find(o => o.id == this.task.toolId);
      return foundTool.outputPorts;
    }
  },
  methods: {
    ...mapMutations([
      'setMoveableTool',
      'unsetMoveableTool',
      'setConnectablePort'
    ]),
    toolMouseDown(e, taskId) {
      this.setMoveableTool({taskId: this.task.id, posX: e.offsetX, posY: e.offsetY});
    },
    toolMouseUp(e) {
      this.unsetMoveableTool();
    },
    portMouseDown(e, port, portType) {
      this.setConnectablePort({
        taskId: this.task.id,
        portId: port.id,
        portPosX: this.task.posX + port.posX,
        portPosY: this.task.posY + port.posY,
        portType: portType,
        mousePosX: e.offsetX,
        mousePosY: e.offsetY
      });
    }
  },
}
</script>


<style scoped>

.input-port {
  text-anchor: end;
  transform: translate(-10px,0);
  font-size: 10px;
  fill: #333;
}

.output-port {
  text-anchor: start;
  transform: translate(10px,0);
  font-size: 10px;
  fill: #333;
}

.label {
  fill: #333;
  stroke: #fff;
  stroke-width: 4px;
  text-anchor: middle;
  paint-order: stroke;
  stroke-linecap: butt;
  stroke-linejoin: miter;
}
</style>