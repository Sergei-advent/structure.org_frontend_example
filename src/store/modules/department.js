import VueAxios from '../vueAxios'

const namespaced = true;

const state = {
    department: null,
    departmentList: []
};

const getters = {
    departmentListWithoutCurrent: state => id => {
        return state.departmentList.filter((department) => department.id !== id && department.parent_department_id !== id);
    }
};

const actions = {
    getDepartment({commit}, id) {
        return VueAxios.get('/department/' + id)
            .then((response) => {
                return commit('setDepartment', response.data)
            })
    },
    getDepartmentsList({commit}, search) {
        return VueAxios.get('/department', {params: {search}})
            .then((response) => {
                return commit('setDepartmentsList', response.data)
            })
    },
    deleteDepartment({commit}, id) {
        return VueAxios.delete('/department/' + id)
            .then(() => {
                return commit('setDepartment', null)
            })
    },
    editDepartment({commit}, department) {
        let request = 'post';
        let url = 'department';

        if (department.id ) {
            request = 'patch';
            url = 'department/' + department.id;
        }

        return VueAxios[request](url, department)
            .then((response) => {
                return commit('setDepartment', response.data)
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
    getters,
    actions,
    mutations
}
