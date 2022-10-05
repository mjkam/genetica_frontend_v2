<template>
  <div>
    <div v-if="activeFirst" class="mt-[30px] px-[20px] font-[14px] font-sans">
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
          <button @click="selectPipeline(pipeline)" class="overflow-hidden w-[50px] px-[10px] bg-[#10927A] rounded-[3px] text-white">Run</button> 
          <button class="overflow-hidden w-[50px] px-[10px] bg-[#927A] rounded-[3px] text-white">Edit</button>
        </div>
      </div>
    </div>

    <div v-if="activeSecond">
      <div class=" bg-blue-300">{{ selectedPipeline.name }}</div>
      <div v-for="(d, idx) in selectedPipeline.inputFiles" :key="idx" class="flex bg-slate-300">
        <div class="w-[200px]">{{ d.label }}</div>
        <button class="ml-[20px] w-[100px]" @click="turnOnSelectFilePage(idx)">select File</button>
        <div class="w-[100px] ml-[20px]"> {{ d.selectedFileName }}</div>
      </div>
      <button @click="cancelSelectedPipeline">cancel</button>
    </div>

    <div v-if="activeThird">
      <div v-for="(f, idx) in files" :key="idx" class="bg-green-300">
        <!-- <input type="checkbox" :value="aa"/> ㅊㅔ크박스해야됌 -->
        {{ f.name }}
      </div>
      <button @click="closeSelectFilePage">close</button>
    </div>
  </div>
  
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      activeFirst: true,
      activeSecond: false,
      activeThird: false,

      selectedPipeline: null,
      selectInputFileIdx: -1,
    }
  },
  computed: {
    ...mapGetters(['pipelines', 'totalTools', 'files'])
  },
  methods: {
    ...mapActions(['getPipelines', 'getTools', 'getFiles']),
    selectPipeline(pipeline) {
      let inputFiles = [];
      for (let inputFile of pipeline.inputFiles) {
        let task = pipeline.tasks.find(o => o.id == inputFile.taskId)
        let tool = this.totalTools.find(o => o.id == task.toolId);
        let port = tool.inputPorts.find(o => o.id == inputFile.portId);
        inputFiles.push({
          fileId: inputFile.id,
          label: port.label,
          selectedFileName: '',
        });
      }
      this.selectedPipeline = {id: pipeline.id, name: pipeline.name, inputFiles: inputFiles};
      this.turnOnSecond();
    },
    cancelSelectedPipeline() {
      this.readyToRun = null;
      this.turnOnFirst();
    },
    selectInputFile(idx) {
      this.selectInputFileIdx = idx;
    },
    turnOnSelectFilePage(inputFileIdx) {
      this.selectInputFileIdx = inputFileIdx;
      this.turnOnThird();
    },
    closeSelectFilePage() {
      this.selectInputFileIdx = -1;
      this.turnOnSecond();
    },
    turnOnFirst() {
      this.activeFirst = true;
      this.activeSecond = false;
      this.activeThird = false;
    },
    turnOnSecond() {
      this.activeFirst = false;
      this.activeSecond = true;
      this.activeThird = false;
    },
    turnOnThird() {
      this.activeFirst = false;
      this.activeSecond = false;
      this.activeThird = true;
    }
  },
  mounted() {
    this.getPipelines();
    this.getTools();
    this.getFiles();
  }
}
</script>

<style>

</style>