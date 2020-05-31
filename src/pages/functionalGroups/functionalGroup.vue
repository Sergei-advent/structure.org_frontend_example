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
                <template v-if="functionalGroup.employees && functionalGroup.employees.length">
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
                <v-btn class="mx-auto" v-if="permissionUpdate" color="primary" link :to="'/functional_groups/edit/' + functionalGroup.id">Edit</v-btn>
                <v-btn class="mx-auto" v-if="permissionDelete" color="error" @click="removeFunctionalGroup">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: 'functionalGroup',
        computed: {
            ...mapState('functionalGroup', ['functionalGroup']),
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
            ...mapActions('functionalGroup', ['getFunctionalGroup', 'deleteFunctionalGroup']),
            removeFunctionalGroup() {
                this.deleteFunctionalGroup(this.$route.params.id)
                    .then(() => this.$router.push({path: '/functional_groups'}));
            }
        },
        mounted() {
            this.getFunctionalGroup(this.$route.params.id);
        }
    }
</script>