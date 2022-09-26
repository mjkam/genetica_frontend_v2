<template>
  <div class="flex">
    <div class="w-1/5 h-full border-r-[1px]">
      <div class="border-b-[1px]">Pipeline List</div>
      <div>bwa-index</div>
      <div>bwa-mem</div>
      <div>samtools-view</div>
      <div>samtools-sort</div>
      <div>samtools-index</div>
      <div>gatk-bqsr</div>
    </div>
    <div class="w-1/5">
      <EditorMain />
    </div>
  </div>
</template>

<script>
import EditorMain from '../components/editor/EditorMain.vue';
export default {
    components: { EditorMain }
}
</script>

<style>

</style>