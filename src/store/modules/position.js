import VueAxios from "@store/vueAxios";

const namespaced = true;

const state = {
    position: null,
    positionList: []
};

const actions = {
    getPosition({commit}, id) {
        return VueAxios.get('/position/' + id)
            .then((response) => {
                return commit('setPosition', response.data)
            })
    },
    getPositionsList({commit}) {
        return VueAxios.get('/position')
            .then((response) => {
                return commit('setPositionsList', response.data)
            })
    }
};

const mutations = {
    setPosition(state, payload) {
        state.position = payload;
    },
    setPositionsList(state, payload) {
        state.positionList = payload;
    }
};

export default {
    namespaced,
    state,
    actions,
    mutations
}
