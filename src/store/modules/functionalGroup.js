import VueAxios from "@store/vueAxios";

const namespaced = true;

const state = {
    functionalGroup: null,
    functionalGroupList: []
};

const getters = {
    functionalGroupsListWithoutCurrent: state => id => {
        return state.functionalGroupList.filter((functionalGroup) => functionalGroup.id !== id && functionalGroup.parent_functional_group_id !== id);
    }
};

const actions = {
    getFunctionalGroup({commit}, id) {
        return VueAxios.get('/group/' + id)
            .then((response) => {
                return commit('setFunctionalGroup', response.data)
            })
    },
    getFunctionalGroupsTree({commit}) {
        return VueAxios.get('/group/tree')
            .then((response) => {
                return commit('setFunctionalGroupsList', response.data)
            })
    },
    getFunctionalGroupsList({commit}, search) {
        return VueAxios.get('/group', {params: {search}})
            .then((response) => {
                return commit('setFunctionalGroupsList', response.data)
            })
    },
    deleteFunctionalGroup({commit}, id) {
        return VueAxios.delete('/group/' + id)
            .then(() => {
                return commit('setFunctionalGroup', null)
            })
    },
    editFunctionalGroup({commit}, functionalGroup) {
        let request = 'post';
        let url = 'group';

        if (functionalGroup.id ) {
            request = 'patch';
            url = 'group/' + functionalGroup.id;
        }

        return VueAxios[request](url, functionalGroup)
            .then((response) => {
                return commit('setFunctionalGroup', response.data)
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
    getters,
    actions,
    mutations
}
