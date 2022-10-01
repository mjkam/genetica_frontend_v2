<template>
  <g :transform="`matrix(1, 0, 0, 1, ${info.posX}, ${info.posY})`">
    <circle fill="#ffffff" stroke="#9a9a9a" stroke-dasharray="3" stroke-width="2" cx="0" cy="0" r="20"></circle>
  </g>
</template>

<script>
export default {
  props: ['info'],
  data() {
    return {
      bigCircleFill: "#ffffff",
      bigCircleStroke: "#9a9a9a",
      bigCircleStrokeWidth: 2,
      smallCircleFill: "#c3c3c3",
      pathFill: "#333",
      pathWidth: "3px"
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
}

</style>