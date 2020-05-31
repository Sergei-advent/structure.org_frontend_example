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
    getPositionsList({commit}, search) {
        return VueAxios.get('/position', {params: {search}})
            .then((response) => {
                return commit('setPositionsList', response.data)
            })
    },
    deletePosition({commit}, id) {
        return VueAxios.delete('/position/' + id)
            .then(() => {
                return commit('setPosition', null)
            })
    },
    editPosition({commit}, position) {
        let request = 'post';
        let url = 'position';

        if (position.id ) {
            request = 'patch';
            url = 'position/' + position.id;
        }

        return VueAxios[request](url, position)
            .then((response) => {
                return commit('setPosition', response.data)
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
