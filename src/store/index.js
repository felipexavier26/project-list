import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    todos: [],
  },
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload
    },
    storeTodo(state, payload) {
      state.todos.push(payload)
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    }
  },
  actions: {
    getTodos({ commit }) {
      return this.todos = axios.get('http://localhost:3000/todos')
        .then((response) => {
          commit('storeTodos', response.data)
        })
    },

    addTodo({ commit }, data) {
      axios.post('http://localhost:3000/todos', data).then((response) => {
        console.log(response.data);
        commit('storeTodo', response.data)
      })
    },

    updateTodo(context, { id, data }) {
      return axios.put(`http://localhost:3000/todos/${id}`, data)

    },
    deleteTodo({ commit }, id) {
      return axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
        commit('deleteTodo', id) 

      })
    }
  },

  getters: {
  },
  modules: {
  }
})
