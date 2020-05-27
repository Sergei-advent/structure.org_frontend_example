<template>
    <v-card class="mx-auto mt-10 mb-10" raised max-width="1200">
        <v-card-title class="justify-center">Create new</v-card-title>
        <v-card-text>
            <v-form ref="form"
                    v-model="valid"
                    lazy-validation
                    class="edit-form">
                <v-text-field outlined v-model="form.name" :rules="rules.name" label="Department Name" required />
                <div>Description: </div>
                <v-textarea outlined v-model="form.description" labale="Description"/>
                <div class="border px-5 pt-5 mb-5">
                    <div class="mb-3">Other Information: </div>
                    <div v-for="(value, key) in form.otherInformation" :key="key" class="flex row ml-0 mb-5 justify-space-between align-center pa-2 border">
                        <div>{{ key }} : {{ value }}</div>
                        <v-btn>Remove</v-btn>
                    </div>
                    <div class="flex row ml-0 align-center">
                        <v-text-field v-model="otherInformationKey.key" outlined label="Name" class="mr-5"/>
                        <v-text-field v-model="otherInformationKey.value" outlined label="Value" class="mr-5"/>
                        <v-btn class="mb-7" @click="addOtherInformationKey">Add</v-btn>
                    </div>
                </div>
                <div class="border px-5 pt-5 mb-5">
                    <div class="mb-3">Employees: </div>
                    <div v-for="(employee, index) in form.employees" :key="index" class="flex row ml-0 mb-5 justify-space-between align-center pa-2 border">
                        <div>{{ getEmployeeName(employee.id) }} {{ employee.position_id && '- ' + getPositionName(employee.position_id) }}</div>
                        <v-btn>Remove</v-btn>
                    </div>
                    <div class="flex row ml-0 align-center">
                        <v-select
                                outlined
                                label="Employee"
                                class="mr-5"
                                :items="employeeList"
                                item-text="name"
                                item-value="id"
                                v-model="newEmployeeObject.id"/>
                        <v-select
                                outlined
                                label="Position"
                                class="mr-5"
                                :items="positionList"
                                item-text="name"
                                item-value="id"
                                v-model="newEmployeeObject.position_id"/>
                        <v-btn class="mb-7" @click="addNewEmployee">Add</v-btn>
                    </div>
                </div>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'edit',
        data() {
            return {
                valid: true,
                otherInformationKey: {
                  key: null,
                  value: null
                },
                newEmployeeObject: {
                  id: null,
                  position_id: null
                },
                form: {
                    name: '',
                    description: '',
                    otherInformation: {},
                    employees: []
                },
                rules: {
                    name: [v => !!v || 'Department Name is required']
                }
            }
        },
        computed: {
            ...mapState('employee', ['employeeList']),
            ...mapState('position', ['positionList']),
        },
        methods: {
            ...mapActions('employee', ['getEmployeesList']),
            ...mapActions('position', ['getPositionsList']),
            addOtherInformationKey() {
                this.form.otherInformation[this.otherInformationKey.key] = this.otherInformationKey.value;
                this.otherInformationKey.key = null;
                this.otherInformationKey.value = null;
            },
            addNewEmployee() {
                const newObj = Object.assign({}, this.newEmployeeObject)
                this.form.employees.push(newObj);
                this.newEmployeeObject.id = null;
                this.newEmployeeObject.position_id = null;
            },
            getEmployeeName(id) {
                return this.employeeList.find((employee) => employee.id === id).name;
            },
            getPositionName(id) {
                return this.positionList.find((position) => position.id === id).name;
            }
        },
        mounted() {
            this.getEmployeesList();
            this.getPositionsList();
        }
    }
</script>

<style lang="scss">
    .departments-page {
        .edit-form {
            padding: 0 50px;
            max-height: 100%;

            .border {
                border: 1px solid rgb(118, 118, 118);
                border-radius: 5px;

                &:hover {
                    border-color: black;
                }
            }
        }
    }
</style>