import VueAxios from '../vueAxios'

const namespaced = true;

const state = {
    department: null,
    departmentList: []
};

const actions = {
    getDepartment({commit}, id) {
        return VueAxios.get('/department/' + id)
            .then((response) => {
                return commit('setDepartment', response.data)
            })
    },
    getDepartmentsList({commit}) {
        return VueAxios.get('/department')
            .then((response) => {
                return commit('setDepartmentsList', response.data)
            })
    }
};

const mutations = {
    setDepartment(state, payload) {
        state.department = payload;
    },
    setDepartmentsList(state, payload) {
        state.departmentList = payload;
    }
};

export default {
    namespaced,
    state,
    actions,
    mutations
}
