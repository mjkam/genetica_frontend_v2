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
  props: ['info'],
  computed: {
    pathData() {
      const link = d3.linkHorizontal()({
        source: [this.info.portPosX, this.info.portPosY],
        target: [this.info.mousePosX, this.info.mousePosY],
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