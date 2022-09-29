import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      moveableTaskId: null,
      connectablePortInfo: null,
      totalTools: [
        {
          "id": 1,
          "name": "BWA MEM Bundle",
          "command": "",
          "image": "",
          "circleR": 37,
          "inputPorts": [
            {
              "id": 1,
              "label": "Reference Index fasta",
              "varName": "reference_fasta",
              "posX": -37,
              "posY": -17
            },
            {
              "id": 2,
              "label": "Input read 1",
              "varName": "input_read_1",
              "posX": -37,
              "posY": 0
            },
            {
              "id": 3,
              "label": "Input read 2",
              "varName": "input_read_2",
              "posX": -37,
              "posY": 17
            },
          ],
          "outputPorts": [
            {
              "id": 1,
              "label": "Aligned SAM",
              "outputName": "",
              "inheritProperty": true,
              "posX": 37,
              "posY": 0
            }
          ]
        },
        {
          "id": 2,
          "name": "Samtools View",
          "command": "",
          "image": "",
          "circleR": 37,
          "inputPorts": [
            {
              "id": 1,
              "label": "Aligned SAM",
              "varName": "aligned_sam",
              "posX": -37,
              "posY": 0
            },
          ],
          "outputPorts": [
            {
              "id": 1,
              "label": "Output BAM",
              "outputName": "",
              "posX": 37,
              "posY": 0
            }
          ]
        }
      ],
      editingPipeline: {
        "tasks": [
          {
            "id": 1,
            "toolId": 1,
            "posX": 100,
            "posY": 100,
          },
          {
            "id": 2,
            "toolId": 2,
            "posX": 200,
            "posY": 200,
          },
        ],
        "inputFiles": [
          {
            "id": 1,
            "posX": 50,
            "posY": 50
          }
        ],
        "outputFiles": [
          {
            "id": 1,
            "posX": 250,
            "posY": 250
          }
        ],
        "inputEdges": [
          {
            "id": 1,
            "sourceFileId": 1,
            "desToolId": 1,
            "desToolPortId": 1
          }
        ],
        "connectEdges": [
          {
            "id": 1,
            "sourceTaskId": 1,
            "sourceOutputPortId": 1,
            "desTaskId": 2,
            "desInputPortId": 1,
          }
        ],
        "outputEdges": [
          {
            "id": 1,
            "sourceTaskId": 1,
            "sourcePortId": 1,
            "desFileId": 1
          }
        ]
      },
    }
  },
  getters: {
    totalTools(state) {
      return state.totalTools;
    },
    editingPipeline(state) {
      return state.editingPipeline;
    }
  },
  mutations: {
    setConnectablePort(state, port) {
      state.connectablePort = port;
    },
    unsetConnectablePort(state) {
      state.connectablePort = null;
    },
    setMoveableTool(state, tool) {
      state.moveableTool = tool;
    },
    unsetMoveableTool(state, tool) {
      state.moveableTool = null;
    },
    toolMove(state, position) {
      if (state.moveableTool != null) {
        let idx = state.tools.findIndex(o => o.id == state.moveableTool.id);
        let d ={
          "id": state.moveableTool.id,
          "posX": position.offsetX,
          "posY": position.offsetY
        };
        state.tools.splice(idx, 1, d);
      }
    },
  }
})
export default store;