import VueAxios from '../vueAxios'

const namespaced = true;

const state = {
    structure: []
};

const actions = {
    getStructure({commit}) {
        return VueAxios.get('/structure')
            .then((response) => {
                return commit('setStructure', response.data)
            })
    },
    setStructure({commit}, file) {
        return VueAxios.post(
            '/structure',
            file,
            {
                headers: {
                    'Content-Type': 'text/xml'
                }
            })
            .then((response) => {
                return commit('setStructure', response.data)
            })
    }
};

const mutations = {
    setStructure(state, payload) {
        state.structure = payload;
    }
};

export default {
    namespaced,
    state,
    actions,
    mutations
}
