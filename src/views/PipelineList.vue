<template>
  <div class="mt-[30px] px-[20px] font-[14px] font-sans">
    <a href="/pipeline-editor" class="bg-[#E6EBEF] text-[#222C35] p-[5px] rounded-[3px] overflow-hidden">Create Pipeline</a>
    <div class="w-full flex border-b-[1px] border-grey h-[50px] items-center font-bold">
      <div class="flex items-center h-full w-[30px]"></div>
      <div class="flex items-center h-full w-[350px]">Name</div>
      <div class="flex items-center h-full w-[300px]">Created On</div>
      <div class="flex items-center h-full w-[50px]"></div>
    </div>
    <div v-for="(pipeline, idx) in pipelines" :key="idx" class="w-full flex border-b-[1px] border-grey h-[50px] items-center">
      <div class="flex items-center h-full w-[30px]">
      </div>
      <div class="flex items-center h-full w-[350px] text-[#1479CC]">{{ pipeline.name }}</div>
      <div class="flex items-center h-full w-[300px]">Sept. 13, 2022 22:24</div>
      <div class="flex items-center h-full w-[200px]">
        <button class="overflow-hidden w-[50px] px-[10px] bg-[#10927A] rounded-[3px] text-white">Run</button> 
        <button class="overflow-hidden w-[50px] px-[10px] bg-[#927A] rounded-[3px] text-white">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['pipelines'])
  },
  methods: {
    ...mapActions(['getPipelines'])
  },
  mounted() {
    this.getPipelines();
  }
}
</script>

<style>

</style>