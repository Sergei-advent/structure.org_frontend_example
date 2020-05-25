import Vue from 'vue'
import Vuex from 'vuex'

import VueAxios from './vueAxios'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state: {
        showMainNav: true,
        structure: []
    },
    getters: {

    },
    actions: {
        toggleMainNav({commit, state}) {
            commit('setShowMainNav', !state.showMainNav)
        },
        getStructure({commit}) {
            return VueAxios.get('/structure')
                .then((response) => {
                    return commit('setStructure', response.data)
                })
        }
    },
    mutations: {
        setShowMainNav(state, payload) {
            state.showMainNav = payload;
        },
        setStructure(state, payload) {
            state.structure = payload;
        }
    },
    strict: debug
})