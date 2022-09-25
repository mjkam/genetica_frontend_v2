import { createWebHistory, createRouter } from "vue-router";
import FileList from "../views/FileList.vue";
import PipelineList from "../views/PipelineList.vue";
import TaskList from "../views/TaskList.vue";

const routes = [
  {
    path: "/",
    name: "FileList",
    component: FileList
  },
  {
    path: "/pipelines",
    name: "PipelineList",
    component: PipelineList
  },
  {
    path: "/tasks",
    name: "TaskList",
    component: TaskList
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;