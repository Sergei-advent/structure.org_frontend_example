import VueAxios from "@store/vueAxios";

const namespaced = true;

const state = {
    functionalGroup: null,
    functionalGroupList: []
};

const actions = {
    getFunctionalGroup({commit}, id) {
        return VueAxios.get('/group/' + id)
            .then((response) => {
                return commit('setFunctionalGroup', response.data)
            })
    },
    getFunctionalGroupsList({commit}) {
        return VueAxios.get('/group')
            .then((response) => {
                return commit('setFunctionalGroupsList', response.data)
            })
    }
};

const mutations = {
    setFunctionalGroup(state, payload) {
        state.functionalGroup = payload;
    },
    setFunctionalGroupsList(state, payload) {
        state.functionalGroupList = payload;
    }
};

export default {
    namespaced,
    state,
    actions,
    mutations
}
