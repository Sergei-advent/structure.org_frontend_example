<template>
    <div>
        <div class="ma-5">
            <v-btn v-if="permissionCreate" color="primary" link to="/employees/create">Create new</v-btn>
        </div>
        <v-text-field outlined v-model="search" label="Search" class="px-5"/>
        <v-card class="mx-5" raised v-if="employeeList.length">
            <v-card-text>
                <v-list dense>
                    <v-list-item
                            v-for="(employee, key) in employeeList"
                            :key="key"
                            :to="'/employees/' + employee.id"
                            link>
                        {{ employee.name }}
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
        <v-card v-else class="mx-5" raised>
            <v-card-text>
                Not found employees
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapState, mapMutations} from 'vuex'
    export default {
        name: 'employeesList',
        data() {
            return {
                search: null
            }
        },
        computed: {
            ...mapState('employee', ['employeeList']),
            ...mapState(['permissions']),
            permissionCreate() {
                return this.permissions.length ?
                    (this.permissions.find((permission) => permission === 'create')) :
                    false;
            }
        },
        watch: {
            search(value) {
                this.getEmployeesList(value);
            }
        },
        methods: {
            ...mapActions('employee', ['getEmployeesList']),
            ...mapMutations('employee', ['setEmployee'])
        },
        mounted() {
            this.getEmployeesList();
            this.setEmployee(null);
        }
    }
</script>