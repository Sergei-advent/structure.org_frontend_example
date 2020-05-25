import Vue from 'vue'
import Router from 'vue-router'

import Test from '@components/test'
import Structure from '@pages/structure'
import NotFound from '@pages/notFound'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/404',
            name: '404',
            component: NotFound,
        }, {
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
            component: Test,
            children: [
                {
                    path: ':id',
                    name: 'department',
                    component: Test
                },
                {
                    path: 'create',
                    name: 'createDepartment',
                    component: Test
                },
            ]
        },
        {
            path: '/employees',
            name: 'employees',
            component: Test,
            children: [
                {
                    path: ':id',
                    name: 'employee',
                    component: Test
                },
                {
                    path: 'create',
                    name: 'createEmployee',
                    component: Test
                },
            ]
        },
        {
            path: '/positions',
            name: 'positions',
            component: Test,
            children: [
                {
                    path: ':id',
                    name: 'position',
                    component: Test
                },
                {
                    path: 'create',
                    name: 'createPosition',
                    component: Test
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