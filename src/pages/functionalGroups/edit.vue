<template>
    <v-card class="mx-auto mt-10 mb-10" raised max-width="1200">
        <v-card-title class="justify-center">{{ title }}</v-card-title>
        <v-card-text>
            <v-form ref="form"
                    v-model="valid"
                    lazy-validation
                    class="edit-form">
                <v-text-field outlined v-model="form.name" :rules="rules.name" label="Functional Group Name" required />
                <div>Description: </div>
                <v-textarea outlined v-model="form.description" labale="Description"/>
                <v-select
                        outlined
                        label="Parent functional groups"
                        :items="parentFunctionalGroupList"
                        item-text="name"
                        item-value="id"
                        v-model="form.parent_functional_group_id"
                        clearable/>
                <div class="border px-5 pt-5 mb-5">
                    <div class="mb-3">Other Information: </div>
                    <div v-for="(value, key) in form.other_information" :key="key" class="flex row ml-0 mb-5 justify-space-between align-center pa-2 border">
                        <div>{{ key }} : {{ value }}</div>
                        <v-btn @click="removeOtherInformationKey(key)">Remove</v-btn>
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
                        <v-btn @click="removeEmployee(index)">Remove</v-btn>
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

                <div class="text-center">
                    <v-btn color="primary" @click="sendForm">Edit</v-btn>
                </div>

            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex'

    export default {
        name: 'edit',
        data() {
            return {
                title: 'Create new',
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
                    other_information: {},
                    employees: [],
                    parent_functional_group_id: null
                },
                rules: {
                    name: [v => !!v || 'Functional Group Name is required']
                }
            }
        },
        computed: {
            ...mapState('employee', ['employeeList']),
            ...mapState('position', ['positionList']),
            ...mapState('functionalGroup', ['functionalGroup', 'functionalGroupList']),
            ...mapGetters('functionalGroup', ['functionalGroupsListWithoutCurrent']),
            parentFunctionalGroupList() {
                return this.functionalGroup ? this.functionalGroupsListWithoutCurrent(this.functionalGroup.id) : this.functionalGroupList
            }
        },
        methods: {
            ...mapActions('employee', ['getEmployeesList']),
            ...mapActions('position', ['getPositionsList']),
            ...mapActions('functionalGroup', ['getFunctionalGroupsList', 'getFunctionalGroup', 'editFunctionalGroup']),
            addOtherInformationKey() {
                this.$set(this.form.other_information, this.otherInformationKey.key, this.otherInformationKey.value);
                this.otherInformationKey.key = null;
                this.otherInformationKey.value = null;
            },
            addNewEmployee() {
                const newObj = Object.assign({}, this.newEmployeeObject);
                const exist = this.form.employees.find((employee) => employee.id === newObj.id && employee.position_id === newObj.position_id);

                if (!exist) {
                    this.form.employees.push(newObj);
                }

                this.newEmployeeObject.id = null;
                this.newEmployeeObject.position_id = null;
            },
            getEmployeeName(id) {
                return this.employeeList.find((employee) => employee.id === id).name;
            },
            getPositionName(id) {
                return this.positionList.find((position) => position.id === id).name;
            },
            removeEmployee(index) {
                this.form.employees.splice(index, 1);
            },
            removeOtherInformationKey(key) {
                delete this.form.other_information[key];

                this.$forceUpdate();
            },
            sendForm() {
                if (this.$refs.form.validate()) {
                    this.editFunctionalGroup(this.form)
                        .then(() => {
                            if (this.$route.params.id) {
                                this.$router.push({path: `/functional_groups/${this.$route.params.id}`});
                            } else {
                                this.$router.push({path: '/functional_groups'});
                            }
                        })
                }
            },
            setParams() {
                this.title = 'Edit functional group ' + this.functionalGroup.name;
                this.form.name = this.functionalGroup.name;
                this.form.id = this.functionalGroup.id;
                this.form.description = this.functionalGroup.description;
                this.form.parent_functional_group_id = this.functionalGroup.parent_functional_group_id;
                this.form.other_information = Object.assign({}, this.functionalGroup.other_information);

                if (this.functionalGroup.employees) {
                    this.functionalGroup.employees.forEach((employee) => {
                        let positionId = null;

                        if (employee.position) {
                            positionId = employee.position.id;
                        }

                        this.form.employees.push({
                            id: employee.id,
                            position_id: positionId
                        })
                    })
                }
            }
        },
        mounted() {
            this.getEmployeesList();
            this.getPositionsList();
            this.getFunctionalGroupsList();

            if (this.$route.params.id) {
                this.getFunctionalGroup(this.$route.params.id)
                    .then(() => {
                        this.setParams();
                    });
            }
        }
    }
</script>

<style lang="scss">
    .functional-group-page {
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