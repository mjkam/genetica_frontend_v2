<template>
  <g :transform="`matrix(1, 0, 0, 1, ${posX}, ${posY})`">
    <g transform="matrix(1, 0, 0, 1, 0, 0)">
      <circle cx="0" cy="0" r="37" :fill="bigCircleFill" :stroke="bigCircleStroke" :stroke-width="bigCircleStrokeWidth"></circle>
      <circle cx="0" cy="0" r="27.75" :fill="smallCircleFill"></circle>

      <svg class="node-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 398.39 397.78" x="-10" y="-8" width="20" height="15">
        <polygon points="38.77 397.57 0 366 136.15 198.78 0 31.57 38.77 0 200.63 198.78 38.77 397.57"></polygon>
        <rect x="198.39" y="347.78" width="200" height="50"></rect>
      </svg>
    </g>
    <text class="label" transform="matrix(1.30067 0 0 1.30067 0 67)">Sambamba Merge</text>

    <g fill="#9a9a9a" transform="matrix(1, 0, 0, 1, -37, 0)">
      <g class="io-port">
        <circle cx="0" cy="0" r="7" class="port-handle"></circle>
      </g>
      <text class="input-port" x="0" y="0" transform="matrix(1.30067 0 0 1.30067 0 0)">BAM files</text>
    </g>

    <g fill="#9a9a9a" transform="matrix(1, 0, 0, 1, 37, 0)">
      <g class="io-port">
        <circle cx="0" cy="0" r="7" class="port-handle"></circle>
      </g>
      <text class="output-port" x="0" y="0" transform="matrix(1.30067 0 0 1.30067 0 0)">BAM files</text>
    </g>
  </g>
</template>

<script>
export default {
  props: ['posX', 'posY'],
  data() {
    return {
      bigCircleFill: "#ffffff",
      bigCircleStroke: "#9a9a9a",
      bigCircleStrokeWidth: 2,
      smallCircleFill: "#11a7a7"
    }
  },
  computed: {
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