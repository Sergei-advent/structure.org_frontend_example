import Vue from 'vue'
import Router from 'vue-router'

import Structure from '@pages/structure'
import NotFound from '@pages/notFound'

import Departments from '@pages/departments/departments'
import DepartmentsList from '@pages/departments/departmentsList'
import Department from '@pages/departments/department'
import DepartmentEdit from '@pages/departments/edit'

import Employees from '@pages/employees/employees'
import EmployeesList from '@pages/employees/employeesList'
import Employee from '@pages/employees/employee'
import EmployeeEdit from '@pages/employees/edit'

import Positions from '@pages/position/positions'
import PositionsList from '@pages/position/positionsList'
import Position from '@pages/position/position'
import PositionEdit from '@pages/position/edit'

import FunctionalGroups from '@pages/functionalGroups/functionalGroups'
import FunctionalGroupsList from '@pages/functionalGroups/functionalGroupsList'
import FunctionalGroup from '@pages/functionalGroups/functionalGroup'
import FunctionalGroupEdit from '@pages/functionalGroups/edit'

/*import store from '../store/store'*/

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/404',
            name: '404',
            component: NotFound,
        },
        {
            path: '*',
            redirect: '/404'
        },
        {
            path: '/',
            alias: '/structure',
            name: 'structure',
            component: Structure
        },
        {
            path: '/departments',
            name: 'departments',
            component: Departments,
            children: [
                {
                    path: '',
                    name: 'departmentsList',
                    component: DepartmentsList
                },
                {
                    path: 'create',
                    name: 'createDepartment',
                    component: DepartmentEdit,
                    meta: {
                        permission: {
                            name: 'create',
                            entity: 'department'
                        },
                    }
                },
                {
                    path: 'edit/:id',
                    name: 'editDepartment',
                    component: DepartmentEdit,
                    meta: {
                        permission: {
                            name: 'update',
                            entity: 'department'
                        },
                    }
                },
                {
                    path: ':id',
                    name: 'department',
                    component: Department
                }
            ]
        },
        {
            path: '/employees',
            name: 'employees',
            component: Employees,
            children: [
                {
                    path: '',
                    name: 'employeesList',
                    component: EmployeesList
                },
                {
                    path: 'create',
                    name: 'createEmployee',
                    component: EmployeeEdit,
                    meta: {
                        permission: {
                            name: 'create',
                            entity: 'employee'
                        },
                    }
                },
                {
                    path: 'edit/:id',
                    name: 'editEmployee',
                    component: EmployeeEdit,
                    meta: {
                        permission: {
                            name: 'update',
                            entity: 'employee'
                        },
                    }
                },
                {
                    path: ':id',
                    name: 'employee',
                    component: Employee
                }
            ]
        },
        {
            path: '/positions',
            name: 'positions',
            component: Positions,
            children: [
                {
                    path: '',
                    name: 'positionsList',
                    component: PositionsList
                },
                {
                    path: 'create',
                    name: 'createPosition',
                    component: PositionEdit,
                    meta: {
                        permission: {
                            name: 'create',
                            entity: 'position'
                        },
                    }
                },
                {
                    path: 'edit/:id',
                    name: 'editPosition',
                    component: PositionEdit,
                    meta: {
                        permission: {
                            name: 'update',
                            entity: 'position'
                        },
                    }
                },
                {
                    path: ':id',
                    name: 'position',
                    component: Position
                }
            ]
        },
        {
            path: '/functional_groups',
            name: 'functionalGroups',
            component: FunctionalGroups,
            children: [
                {
                    path: '',
                    name: 'functionalGroupsList',
                    component: FunctionalGroupsList
                },
                {
                    path: 'create',
                    name: 'createFunctionalGroup',
                    component: FunctionalGroupEdit,
                    meta: {
                        permission: {
                            name: 'create',
                            entity: 'functionalGroup'
                        },
                    }
                },
                {
                    path: 'edit/:id',
                    name: 'editFunctionalGroup',
                    component: FunctionalGroupEdit,
                    meta: {
                        permission: {
                            name: 'update',
                            entity: 'functionalGroup'
                        },
                    }
                },
                {
                    path: ':id',
                    name: 'functionalGroup',
                    component: FunctionalGroup
                }
            ]
        },
    ]
});

/*
const permission = {
    getPermission() {
        return store.getters["permissionList"];
    },
    async loadPermission(page) {
        await store.dispatch("getPermission", page);
    }
}
*/

router.beforeEach(async (to, from, next) => {
    /*@TODO check permissions
    if (to.meta.permission) {
        console.log(to);
        console.log(from);

        let access = false;

        await permission.loadPermission(to.meta.permission.page);

        console.log(permission.loadPermission().then((sasd) => console.log(sasd)));

        permission.loadPermission(to.meta.permission.page)
            .then((permissions) => {
                console.log(permissions);
                permissions.forEach((permission) => {
                    if (permission === to.meta.permission.name) {
                        access = true;
                    }
                });

                console.log(access);
            });
    }*/

    next()
});

export default router;