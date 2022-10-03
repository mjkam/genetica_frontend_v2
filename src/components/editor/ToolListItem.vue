<template>
  <div @mousedown="setVirtualToolData($event, tool.id)">
    {{ tool.name }}
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: ['tool'],
  methods: {
    ...mapMutations(['setVirtualTool']),
    setVirtualToolData($event, toolId) {
      this.setVirtualTool({
        toolId: toolId,
        posX: $event.clientX,
        posY: $event.clientY,
      })
    }
  }
}
</script>

<style>

</style>