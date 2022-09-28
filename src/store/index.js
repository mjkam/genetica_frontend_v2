import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      moveableTool: null,
      tools: [
        {
          "id": 1,
          "posX": 100,
          "posY": 100
        },
        {
          "id": 2,
          "posX": 300,
          "posY": 300
        }
      ]
    }
  },
  getters: {
    allTools(state) {
      return state.tools;
    }
  },
  mutations: {
    setMoveableTool(state, tool) {
      this.state.moveableTool = tool;
    },
    unsetMoveableTool(state, tool) {
      this.state.moveableTool = null;
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
    increment (state) {
      state.count++
    }
  }
})
export default store;