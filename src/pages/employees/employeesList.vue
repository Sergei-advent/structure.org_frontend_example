<template>
    <div>
        <v-btn class="ma-5" color="primary" link to="/employees/edit">Create new</v-btn>
        <v-list dense>
            <v-list-item
                    v-for="(employee, key) in employeeList"
                    :key="key"
                    :to="'/employees/' + employee.id"
                    link>
                {{ employee.name }}
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: 'employeesList',
        computed: {
            ...mapState('employee', ['employeeList'])
        },
        methods: {
            ...mapActions('employee', ['getEmployeesList'])
        },
        mounted() {
            this.getEmployeesList();
        }
    }
</script>