import Vue from 'vue'
import Router from 'vue-router'

import Test from '@components/test'
import Structure from '@pages/structure'
import NotFound from '@pages/notFound'

import Departments from '@pages/departments/departments'
import DepartmentsList from '@pages/departments/departmentsList'
import Department from '@pages/departments/department'

import Employees from '@pages/employees/employees'
import EmployeesList from '@pages/employees/employeesList'
import Employee from '@pages/employees/employee'

import Positions from '@pages/position/positions'
import PositionsList from '@pages/position/positionsList'
import Position from '@pages/position/position'

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
                    path: ':id',
                    name: 'department',
                    component: Department
                },
                {
                    path: 'edit',
                    name: 'editDepartment',
                    component: Department
                },
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
                    path: ':id',
                    name: 'employee',
                    component: Employee
                },
                {
                    path: 'create',
                    name: 'createEmployee',
                    component: Employee
                },
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
                    path: ':id',
                    name: 'position',
                    component: Position
                },
                {
                    path: 'edit',
                    name: 'editPosition',
                    component: Position
                },
            ]
        },
        {
            path: '/functional_groups',
            name: 'functionalGroups',
            component: Test,
            children: [
                {
                    path: ':id',
                    name: 'functionalGroup',
                    component: Test
                },
                {
                    path: 'create',
                    name: 'createFunctionalGroup',
                    component: Test
                },
                {
                    path: 'hierarchy',
                    name: 'hierarchy',
                    component: Test
                },
            ]
        },
    ]
});

export default router;