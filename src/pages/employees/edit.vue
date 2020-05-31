<template>
    <v-card class="mx-auto mt-10 mb-10" raised max-width="1200">
        <v-card-title class="justify-center">{{ title }}</v-card-title>
        <v-card-text>
            <v-form ref="form"
                    v-model="valid"
                    lazy-validation
                    class="edit-form">
                <v-text-field outlined v-model="form.name" :rules="rules.name" label="Employee Name" required />
                <div>Description: </div>
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
                    <div class="mb-3">Departments: </div>
                    <div v-for="(department, index) in form.departments" :key="index" class="flex row ml-0 mb-5 justify-space-between align-center pa-2 border">
                        <div>{{ getDepartmentName(department.id) }} {{ department.position_id ? '- ' + getPositionName(department.position_id) : '' }}</div>
                        <v-btn @click="removeDepartment(index)">Remove</v-btn>
                    </div>
                    <div class="flex row ml-0 align-center">
                        <v-select
                                outlined
                                label="Department"
                                class="mr-5"
                                :items="departmentList"
                                item-text="name"
                                item-value="id"
                                v-model="newDepartmentObject.id"/>
                        <v-select
                                outlined
                                label="Position"
                                class="mr-5"
                                :items="positionList"
                                item-text="name"
                                item-value="id"
                                v-model="newDepartmentObject.position_id"/>
                        <v-btn class="mb-7" @click="addNewDepartment">Add</v-btn>
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
    import {mapState, mapActions} from 'vuex'

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
                newDepartmentObject: {
                    id: null,
                    position_id: null
                },
                form: {
                    name: '',
                    other_information: {},
                    departments: []
                },
                rules: {
                    name: [v => !!v || 'Employee Name is required']
                }
            }
        },
        computed: {
            ...mapState('employee', ['employee']),
            ...mapState('position', ['positionList']),
            ...mapState('department', ['departmentList'])
        },
        methods: {
            ...mapActions('employee', ['getEmployee', 'editEmployee']),
            ...mapActions('position', ['getPositionsList']),
            ...mapActions('department', ['getDepartmentsList']),
            addOtherInformationKey() {
                this.$set(this.form.other_information, this.otherInformationKey.key, this.otherInformationKey.value);
                this.otherInformationKey.key = null;
                this.otherInformationKey.value = null;
            },
            addNewDepartment() {
                const newObj = Object.assign({}, this.newDepartmentObject);

                const exist = this.form.departments.find((department) => department.id === newObj.id && department.position_id === newObj.position_id);

                if (!exist) {
                    this.form.departments.push(newObj);
                }

                this.newDepartmentObject.id = null;
                this.newDepartmentObject.position_id = null;
            },
            getDepartmentName(id) {
                return this.departmentList.find((department) => department.id === id).name;
            },
            getPositionName(id) {
                return this.positionList.find((position) => position.id === id).name;
            },
            removeDepartment(index) {
                this.form.departments.splice(index, 1);
            },
            removeOtherInformationKey(key) {
                delete this.form.other_information[key];

                this.$forceUpdate();
            },
            sendForm() {
                if (this.$refs.form.validate()) {
                    this.editEmployee(this.form)
                        .then(() => {
                            if (this.$route.params.id) {
                                this.$router.push({path: `/employees/${this.$route.params.id}`});
                            } else {
                                this.$router.push({path: '/employees'});
                            }
                        })
                }
            },
            setParams() {
                this.title = 'Edit employee ' + this.employee.name;
                this.form.name = this.employee.name;
                this.form.id = this.employee.id;
                this.form.other_information = Object.assign({}, this.employee.other_information);

                if (this.employee.position) {
                    this.employee.position.forEach((department) => {
                        let positionId = null;

                        if (department.position) {
                            positionId = department.position.id;
                        }

                        this.form.departments.push({
                            id: department.department_id,
                            position_id: positionId
                        })
                    })
                }
            }
        },
        mounted() {
            this.getPositionsList();
            this.getDepartmentsList();

            if (this.$route.params.id) {
                this.getEmployee(this.$route.params.id)
                    .then(() => {
                        this.setParams();
                    });
            }
        }
    }
</script>

<style lang="scss">
    .employees-page {
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