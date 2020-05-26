import VueAxios from "@store/vueAxios";

const namespaced = true;

const state = {
    employee: null,
    employeeList: []
};

const actions = {
    getEmployee({commit}, id) {
        return VueAxios.get('/employee/' + id)
            .then((response) => {
                return commit('setEmployee', response.data)
            })
    },
    getEmployeesList({commit}) {
        return VueAxios.get('/employee')
            .then((response) => {
                return commit('setEmployeesList', response.data)
            })
    }
};

const mutations = {
    setEmployee(state, payload) {
        state.employee = payload;
    },
    setEmployeesList(state, payload) {
        state.employeeList = payload;
    }
};

export default {
    namespaced,
    state,
    actions,
    mutations
}
