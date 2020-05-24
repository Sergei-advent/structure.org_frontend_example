import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state: {
        showMainNav: true
    },
    getters: {

    },
    actions: {
        toggleMainNav({commit, state}) {
            commit('setShowMainNav', !state.showMainNav)
        }
    },
    mutations: {
        setShowMainNav(state, payload) {
            state.showMainNav = payload;
        }
    },
    strict: debug
})