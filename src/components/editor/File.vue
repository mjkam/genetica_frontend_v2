<template>
  <g class="node step">
    <g class="core" transform="matrix(1, 0, 0, 1, 0, 0)" ref="file">
      <circle cx="50" cy="50" :r="30" class="outer"></circle>
      <circle cx="50" cy="50" :r="30" class="inner"></circle>
      <svg class="node-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 499 462.86" x="50" y="50" width="20" height="20">
        <path :d="'M386.06,0H175V58.29l50,50V50H337.81V163.38h25l86.19.24V412.86H225V353.71l-50,50v59.15H499V112.94Zm1.75,113.45v-41l41.1,41.1Z'"></path>
        <polygon points="387.81 1.06 387.81 1.75 387.12 1.06 387.81 1.06"></polygon>
        <polygon points="290.36 231 176.68 344.68 141.32 309.32 194.64 256 0 256 0 206 194.64 206 142.32 153.68 177.68 118.32 290.36 231"></polygon>
      </svg>
      <svg class="node-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 499 462.86" x="50" y="50" width="20" height="20">
        <polygon points="387.81 1.06 387.81 1.75 387.12 1.06 387.81 1.06"></polygon>
        <polygon points="499 231 385.32 344.68 349.96 309.32 403.28 256 208.64 256 208.64 206 403.28 206 350.96 153.68 386.32 118.32 499 231"></polygon>
        <path d="M187.81,163.38l77.69.22H324V112.94L211.06,0H0V462.86H324V298.5H274V412.86H50V50H162.81V163.38Zm25-90.92,41.1,41.1-41.1-.11Z"></path>
      </svg>
    </g>
  </g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'File',
  components: {
  },
  props: {
    data: Object,
  },
  methods: {
  },
  mounted() {
    const drag = d3.drag().on('start', this.dragStart).on('drag', this.dragging);
    d3.select(this.$refs.file).call(drag);
  }
}
</script>

<style>
.outer {
  fill: #fff;
  stroke: #9a9a9a;
  stroke-width: 2px;
}

.inner {
  fill: #c3c3c3;
  pointer-events: none;
}

.node-icon {
  pointer-events: none;
  fill: #333;
  stroke: #333;
  stroke-width: 3px;
  stroke-linecap: round;
}

.title {
  fill: #333;
  stroke: #fff;
  stroke-width: 4px;
  text-anchor: middle;
  paint-order: stroke;
  stroke-linecap: butt;
  stroke-linejoin: miter;
}

.core:hover ~ .port >>> .label{
  opacity: 1;
}
</style>