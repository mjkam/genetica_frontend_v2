<template>
  <div class="mt-[30px] px-[20px] font-[14px] font-sans">
    <button class="bg-[#E6EBEF] text-[#222C35] p-[5px] rounded-[3px] overflow-hidden">DELETE</button>

    <div class="w-full flex border-b-[1px] border-grey h-[50px] items-center font-bold">
      <div class="flex items-center h-full w-[30px]"></div>
      <div class="flex items-center h-full w-[350px]">Name</div>
      <div class="flex items-center h-full w-[150px]">Extension</div>
      <div class="flex items-center h-full w-[100px]">Size</div>
      <div class="flex items-center h-full w-[150px]">Sample ID</div>
      <div class="flex items-center h-full w-[300px]">Created On</div>
    </div>
    <div v-for="(file, idx) in files" :key="idx" class="w-full flex border-b-[1px] border-grey h-[50px] items-center">
      <div class="flex items-center h-full w-[30px]">
        <input type="checkbox" />
      </div>
      <div class="flex items-center h-full w-[350px] text-[#1479CC]">{{ file.name }}</div>
      <div class="flex items-center h-full w-[150px]">FASTQ.GZ</div>
      <div class="flex items-center h-full w-[100px]">160MiB</div>
      <div class="flex items-center h-full w-[150px]">{{ file.sampleId }}</div>
      <div class="flex items-center h-full w-[300px]">Sept. 13, 2022 22:24</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['files'])
  },
  methods: {
    ...mapActions(['getFiles'])
  },
  mounted() {
    this.getFiles();
  }
}
</script>

<style>

</style>