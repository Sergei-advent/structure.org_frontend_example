<template>
    <div v-if="functionalGroup">
        <v-card class="mx-auto mt-10" raised max-width="500">
            <v-card-title class="headline mb-1 justify-center">{{ functionalGroup.name }}</v-card-title>
            <v-card-subtitle class="text-center">{{ functionalGroup.description }}</v-card-subtitle>
            <v-card-text>
                <template v-if="functionalGroup.other_information">
                    <div>Other information:</div>
                    <v-list dense>
                        <v-list-item v-for="(item, key) in functionalGroup.other_information" :key="key">
                            {{ key }} : {{ item }}
                        </v-list-item>
                    </v-list>
                </template>
                <template v-if="functionalGroup.employees">
                    <div>Employees:</div>
                    <v-list dense>
                        <v-list-item
                                v-for="(employee, key) in functionalGroup.employees"
                                :key="key"
                                :to="'/employees/' + employee.id"
                                link>
                            {{ employee.name }} {{ employee.position && '- ' + employee.position.name }}
                        </v-list-item>
                    </v-list>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-btn class="mx-auto" color="primary" link to="/functional_groups/edit">Edit</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: 'functionalGroup',
        computed: {
            ...mapState('functionalGroup', ['functionalGroup'])
        },
        methods: {
            ...mapActions('functionalGroup', ['getFunctionalGroup'])
        },
        mounted() {
            this.getFunctionalGroup(this.$route.params.id);
        }
    }
</script>