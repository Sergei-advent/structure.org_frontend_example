<template>
    <div v-if="department">
        <v-card class="mx-auto mt-10" raised max-width="500">
            <v-card-title class="headline mb-1 justify-center">{{ department.name }}</v-card-title>
            <v-card-subtitle class="text-center">{{ department.description }}</v-card-subtitle>
            <v-card-text>
                <template v-if="department.other_information">
                    <div>Other information:</div>
                    <v-list dense>
                        <v-list-item v-for="(item, key) in department.other_information" :key="key">
                            {{ key }} : {{ item }}
                        </v-list-item>
                    </v-list>
                </template>
                <template v-if="department.employees">
                    <div>Employees:</div>
                    <v-list dense>
                        <v-list-item
                                v-for="(employee, key) in department.employees"
                                :key="key"
                                :to="'/employees/' + employee.id"
                                link>
                            {{ employee.name }} {{ employee.position && '- ' + employee.position.name }}
                        </v-list-item>
                    </v-list>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-btn class="mx-auto" color="primary" link to="/departments/edit">Edit</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: 'department',
        computed: {
          ...mapState('department', ['department'])
        },
        methods: {
          ...mapActions('department', ['getDepartment'])
        },
        mounted() {
            this.getDepartment(this.$route.params.id);
        }
    }
</script>