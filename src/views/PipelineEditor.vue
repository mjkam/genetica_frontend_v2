<template>
  <div
    @mousemove="moveEvent($event)"
    @mouseup="unsetVirtualToolData($event)">
    <div class="drag-container" v-if="virtualTool != null" :style="draggingNewToolStyle">
      <div class="drag-image icon-command-line-tool"></div>
      <div class="drag-text">Dragging Tool</div>
    </div>
    <div class="flex">  
      <div class="w-1/5 h-full border-r-[1px]">
        
        <div class="border-b-[1px]">Pipeline List</div>
        
        <div v-for="(t, idx) in totalTools" :key="idx" @mousedown="setVirtualToolData($event, t.id)"> {{ t.name }}</div>
      </div>
      <div class="w-1/5">
        <EditorMain />
      </div>
    </div>
  </div>
  
</template>

<script>
import EditorMain from '../components/editor/EditorMain.vue';
import { mapMutations, mapGetters } from 'vuex'

export default {
    components: { EditorMain },
    computed: {
      ...mapGetters(['virtualTool', 'totalTools', 'area', 'pt']),
      draggingNewToolStyle() {
        if (this.virtualTool != null) {
          let top = this.virtualTool.posY - 65 / 2;
          let left = this.virtualTool.posX - 75 / 2;
          return {top: top + 'px', left: left + 'px'};
        }
        return {}
      },
    },
    methods: {
      ...mapMutations(['setVirtualTool', 'unsetVirtualTool', 'addNewTool']),
      unsetVirtualToolData($event) {
        let top = this.area.getBoundingClientRect().top;
        let left = this.area.getBoundingClientRect().left;
        if ($event.clientX > left) {
          this.pt.x = $event.clientX; this.pt.y = $event.clientY;
          var pos = this.pt.matrixTransform(this.area.getScreenCTM().inverse());
          this.addNewTool({
            toolId: this.virtualTool.toolId,
            svgPosX: pos.x,
            svgPosY: pos.y
          });
        }

        this.unsetVirtualTool();
      },
      moveEvent($event) {
        if (this.virtualTool != null) {
          this.setVirtualTool({
            toolId: this.virtualTool.toolId,
            posX: $event.clientX,
            posY: $event.clientY
          });
        }
      },
      setVirtualToolData($event, toolId) {
        this.setVirtualTool({
          toolId: toolId,
          posX: $event.clientX,
          posY: $event.clientY,
        });
      }
    },
}
</script>

<style scoped>
.drag-container {
  position: absolute;
  border: solid 1px;
  background: red;
}

.icon-command-line-tool {
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTggMTE4Ij48dGl0bGU+dG9vbF9kcmFnPC90aXRsZT48ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIj48ZyBpZD0iTGF5ZXJfNV9jb3B5IiBkYXRhLW5hbWU9IkxheWVyIDUgY29weSI+PGcgaWQ9IkxheWVyXzJfY29weV8zIiBkYXRhLW5hbWU9IkxheWVyIDIgY29weSAzIj48Y2lyY2xlIGN4PSI1OSIgY3k9IjU5IiByPSI0MSIgc3R5bGU9ImZpbGw6IzVlOGViOCIvPjwvZz48ZyBpZD0iTGF5ZXJfMl9jb3B5XzMtMiIgZGF0YS1uYW1lPSJMYXllciAyIGNvcHkgMy0yIj48cGF0aCBkPSJNNTksMTE4YTU5LDU5LDAsMSwxLDU5LTU5aDBBNTkuMDcsNTkuMDcsMCwwLDEsNTksMTE4Wk01OSw2YTUzLDUzLDAsMSwwLDUzLDUzQTUzLDUzLDAsMCwwLDU5LDZaIiBzdHlsZT0iZmlsbDojYzRjNGM0Ii8+PC9nPjwvZz48L2c+PGcgaWQ9InRvb2wiPjxyZWN0IHg9IjYxLjgzIiB5PSI3NS42MiIgd2lkdGg9IjE3Ljk2IiBoZWlnaHQ9IjQuMTYiIHN0eWxlPSJmaWxsOiMyYzJjMmMiLz48cmVjdCB4PSIzNS4zOCIgeT0iNDcuOTgiIHdpZHRoPSIyOS4zOCIgaGVpZ2h0PSI0LjE2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MC4wNiAtMjAuNzQpIHJvdGF0ZSg0NSkiIHN0eWxlPSJmaWxsOiMyYzJjMmMiLz48cmVjdCB4PSIzNS4zOCIgeT0iNjUuODYiIHdpZHRoPSIyOS4zOSIgaGVpZ2h0PSI0LjE2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzMuNTIgODAuNTcpIHJvdGF0ZSgxMzUpIiBzdHlsZT0iZmlsbDojMmMyYzJjIi8+PC9nPjwvc3ZnPg==) no-repeat;
}

.drag-image { 
  position: absolute;
  width: 75px;
  height: 65px;
}
</style>