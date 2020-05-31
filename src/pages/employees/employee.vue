<template>
    <div v-if="employee">
        <v-card class="mx-auto mt-10" raised max-width="500">
            <v-card-title class="headline mb-1 justify-center">{{ employee.name }}</v-card-title>
            <v-card-text>
                <template v-if="employee.other_information">
                    <div>Other information:</div>
                    <v-list dense>
                        <v-list-item v-for="(item, key) in employee.other_information" :key="key">
                            {{ key }} : {{ item }}
                        </v-list-item>
                    </v-list>
                </template>
                <template v-if="employee.position && employee.position.length">
                    <div>Departments:</div>
                    <v-list dense>
                        <v-list-item v-for="(item, index) in employee.position" :key="index">
                             {{ getDepartmentName(item.department_id) + (item.position ? ' - ' + item.position.name : '') }}
                        </v-list-item>
                    </v-list>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-btn class="mx-auto" v-if="permissionUpdate" color="primary" link :to="'/employees/edit/' + employee.id">Edit</v-btn>
                <v-btn class="mx-auto" v-if="permissionDelete" color="error" @click="removeEmployee">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: 'employee',
        computed: {
            ...mapState('employee', ['employee']),
            ...mapState('department', ['departmentList']),
            ...mapState(['permissions']),
            permissionDelete() {
                return this.permissions.length ?
                    (this.permissions.find((permission) => permission === 'delete')) :
                    false;
            },
            permissionUpdate() {
                return this.permissions.length ?
                    (this.permissions.find((permission) => permission === 'update')) :
                    false;
            }
        },
        methods: {
            ...mapActions('employee', ['getEmployee', 'deleteEmployee']),
            ...mapActions('department', ['getDepartmentsList']),
            getDepartmentName(id) {
                return this.departmentList.find((department) => department.id === id).name;
            },
            removeEmployee() {
                this.deleteEmployee(this.$route.params.id)
                    .then(() => this.$router.push({path: '/employees'}));
            }
        },
        mounted() {
            this.getEmployee(this.$route.params.id);
            this.getDepartmentsList();
        }
    }
</script>