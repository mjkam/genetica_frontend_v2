<template>
  <div class="w-full h-[50px] bg-[#0e4b8f]">
    <div class="flex h-full">
      <div class="flex items-center p-[10px]" :class="filesTabColor">
        <a href="/">Files</a>
      </div>
      <div class="flex items-center p-[10px]" :class="pipelinesTabColor">
        <a href="/pipelines">Pipelines</a>
      </div>
      <div class="flex items-center p-[10px]" :class="tasksTabColor">
        <a href="/tasks">Tasks</a>
      </div>
      <div class="flex items-center p-[10px]" :class="pipelineEditorTabColor">
        <a href="/pipeline-editor">Pipeline Editor</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentRouteName() {
        return this.$route.name;
    },
    filesTabColor() {
      return this.currentRouteName == 'FileList' ? 
        ['text-white'] : ['text-[#AEBECB]'];
    },
    pipelinesTabColor() {
      return this.currentRouteName == 'PipelineList' ? 
      ['text-white'] : ['text-[#AEBECB]'];
    },
    tasksTabColor() {
      return this.currentRouteName == 'TaskList' ? 
      ['text-white'] : ['text-[#AEBECB]'];
    },
    pipelineEditorTabColor() {
      return this.currentRouteName == 'PipelineEditor' ? 
      ['text-white'] : ['text-[#AEBECB]'];
    }
  }
}
</script>

<style>

</style>