import Vue from 'vue'
import Vuex from 'vuex'

import department from './modules/department'
import employee from './modules/employee'
import position from './modules/position'
import structure from './modules/structure'
import functionalGroup from './modules/functionalGroup'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        department: department,
        employee: employee,
        position: position,
        structure: structure,
        functionalGroup: functionalGroup
    },
    state: {
        showMainNav: true,
        currentPage: 'Structure'
    },
    actions: {
        toggleMainNav({commit, state}) {
            commit('setShowMainNav', !state.showMainNav)
        }
    },
    mutations: {
        setShowMainNav(state, payload) {
            state.showMainNav = payload;
        },
        setCurrentPage(state, payload) {
            state.currentPage = payload;
        }
    },
    strict: debug
})