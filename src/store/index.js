import { createStore } from 'vuex'
import axios from 'axios'

const SERVER_URL = "http://127.0.0.1:8080";

// Create a new store instance.
const store = createStore({
  state () {
    return {
      files: [],
      pipelines: [],
      pipelineEditingId: 1,
      area: null,
      pt: null,
      virtualTool: null,
      moveableFile: null,
      newConnectEdge: null,
      virtualFileInfo: null,
      moveableTaskInfo: null,
      connectablePortInfo: null,
      totalTools: [],
      // totalTools: [
      //   {
      //     "id": 1,
      //     "name": "BWA MEM Bundle",
      //     "command": "",
      //     "image": "",
      //     "circleR": 37,
      //     "inputPorts": [
      //       {
      //         "id": 1,
      //         "label": "Reference Index fasta",
      //         "varName": "reference_fasta",
      //         "posX": -37,
      //         "posY": -17
      //       },
      //       {
      //         "id": 2,
      //         "label": "Input read 1",
      //         "varName": "input_read_1",
      //         "posX": -37,
      //         "posY": 0
      //       },
      //       {
      //         "id": 3,
      //         "label": "Input read 2",
      //         "varName": "input_read_2",
      //         "posX": -37,
      //         "posY": 17
      //       },
      //     ],
      //     "outputPorts": [
      //       {
      //         "id": 1,
      //         "label": "Aligned SAM",
      //         "outputName": "",
      //         "inheritProperty": true,
      //         "posX": 37,
      //         "posY": 0
      //       }
      //     ]
      //   },
      //   {
      //     "id": 2,
      //     "name": "Samtools View",
      //     "command": "",
      //     "image": "",
      //     "circleR": 37,
      //     "inputPorts": [
      //       {
      //         "id": 1,
      //         "label": "Aligned SAM",
      //         "varName": "aligned_sam",
      //         "posX": -37,
      //         "posY": 0
      //       },
      //     ],
      //     "outputPorts": [
      //       {
      //         "id": 1,
      //         "label": "Output BAM",
      //         "outputName": "",
      //         "posX": 37,
      //         "posY": 0
      //       }
      //     ]
      //   }
      // ],
      editingPipeline: {
        "tasks": [
          // {
          //   "id": 1,
          //   "toolId": 1,
          //   "posX": 10,
          //   "posY": 200,
          // },
          // {
          //   "id": 2,
          //   "toolId": 2,
          //   "posX": 400,
          //   "posY": 400,
          // },
        ],
        "inputFiles": [],
        "outputFiles": [],
        "inputEdges": [],
        "outputEdges": [],
        "connectEdges": []
        // "inputFiles": [
        //   {
        //     "id": 1,
        //     "taskId": 1,
        //     "portId": 1,
        //     "posX": 50,
        //     "posY": 50
        //   }
        // ],
        // "outputFiles": [
        //   {
        //     "id": 1,
        //     "taskId": 1,
        //     "portId": 1,
        //     "posX": 500,
        //     "posY": 550
        //   }
        // ],
        // "inputEdges": [
        //   {
        //     "id": 1,
        //     "sourceFileId": 1,
        //     "desTaskId": 1,
        //     "desPortId": 1
        //   }
        // ],
        // "connectEdges": [
        //   {
        //     "id": 1,
        //     "sourceTaskId": 1,
        //     "sourceOutputPortId": 1,
        //     "desTaskId": 2,
        //     "desInputPortId": 1,
        //   }
        // ],
        // "outputEdges": [
        //   {
        //     "id": 1,
        //     "sourceTaskId": 1,
        //     "sourcePortId": 1,
        //     "desFileId": 1
        //   }
        // ]
      },
    }
  },
  getters: {
    totalTools(state) {
      return state.totalTools;
    },
    editingPipeline(state) {
      return state.editingPipeline;
    },
    connectablePortInfo(state) {
      return state.connectablePortInfo;
    },
    virtualFileInfo(state) {
      return state.virtualFileInfo;
    },
    moveableFile(state) {
      return state.moveableFile;
    },
    virtualTool(state) {
      return state.virtualTool;
    },
    area(state) {
      return state.area;
    },
    pt(state) {
      return state.pt;
    },
    files: (state) => state.files,
    pipelines: (state) => state.pipelines,
    tools: (state) => state.totalTools,
    editingPipeline: state => state.editingPipeline,
  },
  mutations: {
    setFiles(state, files) {
      state.files = files;
    },
    setPipelines(state, pipelines) {
      state.pipelines = pipelines;
    },
    setTools(state, tools) {
      state.totalTools = tools;
    },
    setArea(state, area) {
      state.area = area;
      state.pt = state.area.createSVGPoint();
    },
    addNewTool(state, info) {
      state.editingPipeline.tasks.push({
        id: state.pipelineEditingId++,
        toolId: info.toolId,
        posX: info.svgPosX,
        posY: info.svgPosY,
      });
    },
    setVirtualTool(state, virtualToolInfo) {
      state.virtualTool = {
        toolId: virtualToolInfo.toolId,
        posX: virtualToolInfo.posX,
        posY: virtualToolInfo.posY
      }
    },
    unsetVirtualTool(state) {
      state.virtualTool = null;
    },
    unsetVirtualFile(state) {
      state.virtualFileInfo = null;
    },
    setMoveableFile(state, moveableFileInfo) {
      let idx;
      if (moveableFileInfo.fileType == 'INPUT') {
        idx = state.editingPipeline.inputFiles.findIndex(o => o.id == moveableFileInfo.fileId);
      } else {
        idx = state.editingPipeline.outputFiles.findIndex(o => o.id == moveableFileInfo.fileId);
      }
      state.moveableFile = {
        fileId: moveableFileInfo.fileId,
        fileIdx: idx,
        taskId: moveableFileInfo.taskId,
        portId: moveableFileInfo.portId,
        originPosX: moveableFileInfo.originPosX,
        originPosY: moveableFileInfo.originPosY,
        mousePosX: moveableFileInfo.mousePosX,
        mousePosY: moveableFileInfo.mousePosY,
      }
    },
    unsetMoveableFile(state) {
      state.moveableFile = null;
    },
    setConnectablePort(state, clickPortInfo) {
      state.connectablePortInfo = {
        taskId: clickPortInfo.taskId,
        portId: clickPortInfo.portId,
        portPosX: clickPortInfo.portPosX,
        portPosY: clickPortInfo.portPosY,
        portType: clickPortInfo.portType,
        mousePosX: clickPortInfo.mousePosX,
        mousePosY: clickPortInfo.mousePosY,
        label: clickPortInfo.label,
      }
    },
    unsetConnectablePort(state) {
      if (state.newConnectEdge != null) {
        state.newConnectEdge.id = state.pipelineEditingId++;
        state.editingPipeline.connectEdges.push(state.newConnectEdge);
      }

      if (state.virtualFileInfo != null) {
        let dataId = state.pipelineEditingId++;
        let pushData = {
          id: dataId,
          taskId: state.virtualFileInfo.taskId,
          portId: state.virtualFileInfo.portId,
          posX: state.virtualFileInfo.posX,
          posY: state.virtualFileInfo.posY,
          label: state.virtualFileInfo.label,
        }

        if (state.virtualFileInfo.portType == 'INPUT') {
          state.editingPipeline.inputFiles.push(pushData);
          state.editingPipeline.inputEdges.push({
            id: state.pipelineEditingId++,
            sourceFileId: dataId,
            desTaskId: state.virtualFileInfo.taskId,
            desPortId: state.virtualFileInfo.portId
          });
        } else {
          state.editingPipeline.outputFiles.push(pushData);
          state.editingPipeline.outputEdges.push({
            id: state.pipelineEditingId++,
            sourceTaskId: state.virtualFileInfo.taskId,
            sourcePortId: state.virtualFileInfo.portId,
            desFileId: dataId
          });
        }
      }

      state.connectablePortInfo = null;
      state.virtuaFileInfo = null;
    },
    setMoveableTool(state, clickInfo) {
      let idx = state.editingPipeline.tasks.findIndex(o => o.id == clickInfo.taskId);
      state.moveableTaskInfo = {
        taskId: clickInfo.taskId,
        taskIdx: idx,
        toolId: state.editingPipeline.tasks[idx].toolId,
        originPosX: state.editingPipeline.tasks[idx].posX,
        originPosY: state.editingPipeline.tasks[idx].posY,
        clickedPosX: clickInfo.posX,
        clickedPosY: clickInfo.posY
      };
    },
    unsetMoveableTool(state) {
      state.moveableTaskInfo = null;
    },
    toolMove(state, position) {
      if (state.moveableTaskInfo != null) {
        let moved = {
          "id": state.moveableTaskInfo.taskId,
          "toolId": state.moveableTaskInfo.toolId,
          "posX": state.moveableTaskInfo.originPosX + (position.posX - state.moveableTaskInfo.clickedPosX),
          "posY": state.moveableTaskInfo.originPosY + (position.posY - state.moveableTaskInfo.clickedPosY),
        };
        state.editingPipeline.tasks.splice(state.moveableTaskInfo.taskIdx, 1, moved);
      } else if(state.moveableFile != null) {
        let moved = {
          "id": state.moveableFile.fileId,
          "taskId": state.moveableFile.taskId,
          "portId": state.moveableFile.portId,
          "posX": state.moveableFile.originPosX + (position.posX - state.moveableFile.mousePosX),
          "posY": state.moveableFile.originPosY + (position.posY - state.moveableFile.mousePosY),
        }
        if (state.moveableFile.fileType == 'INPUT') {
          state.editingPipeline.inputFiles.splice(state.moveableFile.fileIdx, 1, moved);
        } else {
          state.editingPipeline.outputFiles.splice(state.moveableFile.fileIdx, 1, moved);
        }
      } else if (state.connectablePortInfo != null) {
        let getDistance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

        let distance = getDistance(
          state.connectablePortInfo.portPosX, state.connectablePortInfo.portPosY,
          position.posX, position.posY);

        let near1 = distance < 30;

        let near2 = false;
        let allOtherTasks = state.editingPipeline.tasks.filter(o => o.id != state.connectablePortInfo.taskId);
        for (let t of allOtherTasks) {
          let foundTool = state.totalTools.find(o => o.id == t.toolId);
          if (state.connectablePortInfo.portType == 'INPUT') {
            for (let p of foundTool.outputPorts) {
              let dist2 = getDistance(
                state.connectablePortInfo.posX, state.connectablePortInfo.posY,
                t.posX + p.posX, t.posY + p.posY
              );
              if (dist2 < 30) {
                state.newConnectEdge = {
                  "sourceTaskId": t.id,
                  "sourceOutputPortId": p.id,
                  "desTaskId": state.connectablePortInfo.taskId,
                  "desInputPortId": state.connectablePortInfo.portId,
                }
                near2 = true;
                break;
              }
            }
          } else {
            for (let p of foundTool.inputPorts) {
              let dist2 = getDistance(
                state.connectablePortInfo.mousePosX, state.connectablePortInfo.mousePosY,
                t.posX + p.posX, t.posY + p.posY
              );
              if (dist2 < 30) {
                state.newConnectEdge = {
                  "sourceTaskId": state.connectablePortInfo.taskId,
                  "sourceOutputPortId": state.connectablePortInfo.portId,
                  "desTaskId": t.id,
                  "desInputPortId": p.id,
                }
                near2 = true;
                break;
              }
            }
          }
        }

        if (near1 == true || near2 == true) {
          state.virtualFileInfo = null;
        } else {
          state.newConnectEdge = null;
          state.virtualFileInfo = {
            taskId: state.connectablePortInfo.taskId,
            portId: state.connectablePortInfo.portId,
            portType: state.connectablePortInfo.portType,
            posX: position.posX,
            posY: position.posY,
            label: state.connectablePortInfo.label,
          }
        }

        state.connectablePortInfo = {
          taskId: state.connectablePortInfo.taskId,
          portId: state.connectablePortInfo.portId,
          portPosX: state.connectablePortInfo.portPosX,
          portPosY: state.connectablePortInfo.portPosY,
          portType: state.connectablePortInfo.portType,
          mousePosX: position.posX,
          mousePosY: position.posY,
          label: state.connectablePortInfo.label,
        }
      }
    },
  },
  actions: {
    getFiles({ commit }) {
      axios.get(SERVER_URL + "/files").then(function(response) {
        commit('setFiles', response.data.files);
      });
    },
    getPipelines({ commit }) {
      axios.get(SERVER_URL + "/pipelines").then(function(response) {
        commit('setPipelines', response.data.pipelines);
      });
    },
    getTools({ commit }) {
      axios.get(SERVER_URL + "/tools").then(function(response) {
        commit('setTools', response.data.tools);
      });
    },
    savePipeline({ commit, state, dispatch }, name) {
      axios.post(SERVER_URL + "/pipeline", {name: name, pipeline: state.editingPipeline}).then(function(response) {
        console.log(response.data);
      });
    }
  }
})
export default store;