<template>
    <div v-if="employee">
        <v-card class="mx-auto mt-10" raised max-width="500">
            <v-card-title class="headline mb-1 justify-center">{{ employee.name }}</v-card-title>
            <v-card-text>
                <template v-if="employee.other_information">
                    <div>Other information:</div>
                    <v-list dense>
                        <v-list-item v-for="(item, key) in department.other_information" :key="key">
                            {{ key }} : {{ item }}
                        </v-list-item>
                    </v-list>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-btn class="mx-auto" color="primary" link to="/employees/edit">Edit</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: 'employee',
        computed: {
            ...mapState('employee', ['employee'])
        },
        methods: {
            ...mapActions('employee', ['getEmployee'])
        },
        mounted() {
            this.getEmployee(this.$route.params.id);
        }
    }
</script>