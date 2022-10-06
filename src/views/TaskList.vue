<template>
  <div class="mt-[30px] px-[20px] font-[14px] font-sans">
    <div class="w-full flex border-b-[1px] border-grey h-[50px] items-center font-bold">
      <div class="flex items-center h-full w-[30px]"></div>
      <div class="flex items-center h-full w-[200px]">Name</div>
      <div class="flex items-center h-full w-[200px]">Pipeline</div>
      <div class="flex items-center h-full w-[200px]">Status</div>
      <div class="flex items-center h-full w-[200px]">Created On</div>
    </div>

    <div @click="toggleSubFunc(t)" v-for="(t, idx) in tasks" :key="idx">
      <div class="w-full flex border-b-[1px] border-grey h-[50px] items-center">
        <div class="flex items-center h-full w-[30px]"></div>
        <div class="flex items-center h-full w-[200px]">{{ t.id }}</div>
        <div class="flex items-center h-full w-[200px]">{{ t.pipelineName }}</div>
        <div class="flex items-center h-full w-[200px]">
          <div class="text-center w-[60px] text-[10px] p-[2px] rounded-[5px] overflow-hidden" :class="jobStatusColor(t.taskStatus)">{{ t.taskStatus }}</div>
        </div>
        <div class="flex items-center h-full w-[200px]">Sept. 13, 2022 22:24</div>
      </div>

      <div v-if="isShowSub(t)">
        <div v-for="(tool, idx) in t.tools" :key="idx" class="w-full flex border-b-[1px] border-grey h-[50px] items-center">
          <div class="flex items-center h-full w-[30px]"></div>
          <div class="flex items-center h-full w-[200px]">{{ tool.id }}</div>
          <div class="flex items-center h-full w-[200px]">{{ tool.toolName }}</div>
          <div class="flex items-center h-full w-[200px]">
            <div class="text-center w-[60px] text-[10px] p-[2px] rounded-[5px] overflow-hidden" :class="jobStatusColor(tool.jobStatus)">{{ tool.jobStatus }}</div>
          </div>
          <div class="flex items-center h-full w-[200px]">Sept. 13, 2022 22:24</div>
        </div>
      </div>
      
    </div>
    <!-- <div class="w-full flex border-b-[1px] border-grey h-[50px] items-center">
      <div class="flex items-center h-full w-[30px]"></div>
      <div class="flex items-center h-full w-[200px]">Task Name</div>
      <div class="flex items-center h-full w-[200px]">Pipeline name</div>
      <div class="flex items-center h-full w-[200px]">
        <div class="text-center w-[60px] text-[10px] p-[2px] text-white rounded-[5px] bg-blue-500 overflow-hidden">RUNNING</div>
      </div>
      <div class="flex items-center h-full w-[200px]">Sept. 13, 2022 22:24</div>
    </div>
    <div class="w-full flex border-b-[1px] border-grey h-[50px] items-center">
      <div class="flex items-center h-full w-[30px]"></div>
      <div class="flex items-center h-full w-[200px]">Task Name</div>
      <div class="flex items-center h-full w-[200px]">Pipeline name</div>
      <div class="flex items-center h-full w-[200px]">
        <div class="text-center w-[60px] text-[10px] p-[2px] text-white rounded-[5px] bg-red-500 overflow-hidden">FAILED</div>
      </div>
      <div class="flex items-center h-full w-[200px]">Sept. 13, 2022 22:24</div>
    </div> -->
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      toggleSub: []
    }
  },
  computed: {
    ...mapGetters(['tasks']),
  },
  methods: {
    ...mapMutations(['setTasks']),
    ...mapActions(['getTasks']),
    isShowSub(t) {
      let idx = this.toggleSub.findIndex(o => o == t.id);

      if (idx == -1) {
        return false;
      } 
      return true;
    },
    toggleSubFunc(t) {
      let idx = this.toggleSub.findIndex(o => o == t.id);
      if (idx == -1) {
        this.toggleSub.push(t.id);
      } else {
        this.toggleSub.splice(idx, 1);
      }
    },  
    jobStatusColor(jobStatus) {
      if(jobStatus == 'SUCCESS') {
        return 'bg-green-500 text-white';
      } else if(jobStatus == 'PENDING') {
        return 'bg-[#E0E6EB] text-black';
      } else if(jobStatus == 'RUNNING') {
        return 'bg-blue-500 text-white';
      } else if(jobStatus == 'FAILED') {
        return 'bg-red-500 text-white';
      }
    },
    createDateTimeFormat(arr) {
      return `${arr[1]}.${arr[2]}, ${arr[0]} ${arr[3]}:${arr[4]}`;
    }
  },
  mounted() {
    this.getTasks();
  }
}
</script>

<style>

</style>