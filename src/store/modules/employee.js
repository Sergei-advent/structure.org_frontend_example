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
    getEmployeesList({commit}, search) {
        return VueAxios.get('/employee', {params: {search}})
            .then((response) => {
                return commit('setEmployeesList', response.data)
            })
    },
    deleteEmployee({commit}, id) {
        return VueAxios.delete('/employee/' + id)
            .then(() => {
                return commit('setEmployee', null)
            })
    },
    editEmployee({commit}, employee) {
        let request = 'post';
        let url = 'employee';

        if (employee.id ) {
            request = 'patch';
            url = 'employee/' + employee.id;
        }

        return VueAxios[request](url, employee)
            .then((response) => {
                return commit('setEmployee', response.data)
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
