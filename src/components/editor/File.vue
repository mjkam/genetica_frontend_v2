<template>
  <g
    @mousedown="readyMove($event)" 
    :transform="`matrix(1, 0, 0, 1, ${fileInfo.posX}, ${fileInfo.posY})`">
    <g transform="matrix(1, 0, 0, 1, 0, 0)">
      <circle cx="0" cy="0" r="37" :fill="bigCircleFill" :stroke="bigCircleStroke" :stroke-width="bigCircleStrokeWidth"></circle>
      <circle cx="0" cy="0" r="27.75" :fill="smallCircleFill"></circle>
      <svg class="node-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 499 462.86" y="-10" x="-11" width="20" height="20">
        <path d="M386.06,0H175V58.29l50,50V50H337.81V163.38h25l86.19.24V412.86H225V353.71l-50,50v59.15H499V112.94Zm1.75,113.45v-41l41.1,41.1Z"></path>
        <polygon points="387.81 1.06 387.81 1.75 387.12 1.06 387.81 1.06"></polygon>
        <polygon points="290.36 231 176.68 344.68 141.32 309.32 194.64 256 0 256 0 206 194.64 206 142.32 153.68 177.68 118.32 290.36 231"></polygon>
      </svg>
    </g>           
    <text class="label" transform="matrix(1.75219 0 0 1.75219 0 67)"> {{ fileInfo.label }}</text>   

    <g v-if="ioType == 'INPUT'" fill="#9a9a9a" transform="matrix(1, 0, 0, 1, 37, 0)">
      <g class="io-port">
        <circle cx="0" cy="0" r="7" class="port-handle"></circle>
      </g>
      <text class="output-port" x="0" y="0" transform="matrix(1.30067 0 0 1.30067 0 0)">{{ fileInfo.label }}</text>
    </g>
    <g v-if="ioType == 'OUTPUT'" fill="#9a9a9a" transform="matrix(1, 0, 0, 1, -37, 0)">
      <g class="io-port">
        <circle cx="0" cy="0" r="7" class="port-handle"></circle>
      </g>
      <text class="input-port" x="0" y="0" transform="matrix(1.30067 0 0 1.30067 0 0)">{{ fileInfo.label }}</text>
    </g>
  </g>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'


export default {
  props: ['fileInfo', 'ioType'],  
  data() {
    return {
      bigCircleFill: "#ffffff",
      bigCircleStroke: "#9a9a9a",
      bigCircleStrokeWidth: 2,
      smallCircleFill: "#c3c3c3",
      pathFill: "#333",
      pathWidth: "3px"
    }
  },
  methods: {
    ...mapMutations(['setMoveableFile']),
    readyMove(e) {
      let d = {
        fileId: this.fileInfo.id,
        taskId: this.fileInfo.taskId,
        portId: this.fileInfo.portId,
        originPosX: this.fileInfo.posX,
        originPosY: this.fileInfo.posY,
        mousePosX: e.offsetX,
        mousePosY: e.offsetY
      };
      this.setMoveableFile(d);
    }
  }
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
  font-size: 9px;
}

</style>