<template>
  <g>
    <circle r="51" cx="125" cy="125" :fill="bigCircleFill" :stroke="bigCircleStroke" :stroke-width="bigCircleStrokeWidth"/>
    <circle r="38" cx="125" cy="125" :fill="smallCircleFill"/>
    <svg x="115" y="117.5" viewBox="0 0 398.39 397.78" width="20" height="15">
      <polygon points="38.77 397.57 0 366 136.15 198.78 0 31.57 38.77 0 200.63 198.78 38.77 397.57"></polygon>
      <rect x="198.39" y="347.78" width="200" height="50"></rect>
    </svg>
  </g>
</template>

<script>
export default {
  data() {
    return {
      bigCircleFill: "#ffffff",
      bigCircleStroke: "#9a9a9a",
      bigCircleStrokeWidth: 2,
      smallCircleFill: "#11a7a7"
    }
  }
}
</script>

<style>

</style>