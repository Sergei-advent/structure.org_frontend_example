<template>
    <v-card class="mx-auto mt-10 mb-10" raised max-width="1200">
        <v-card-title class="justify-center">{{ title }}</v-card-title>
        <v-card-text>
            <v-form ref="form"
                    v-model="valid"
                    lazy-validation
                    class="edit-form">
                <v-text-field outlined v-model="form.name" :rules="rules.name" label="Position Name" required />
                <v-text-field outlined v-model="form.code_name" label="Position Code Name for sync" required />
                <div>Description: </div>
                <v-textarea outlined v-model="form.description" labale="Description"/>
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
                form: {
                    name: '',
                    description: '',
                    code_name: '',
                    other_information: {}
                },
                rules: {
                    name: [v => !!v || 'Position Name is required']
                }
            }
        },
        computed: {
            ...mapState('position', ['position'])
        },
        methods: {
            ...mapActions('position', ['getPosition', 'editPosition']),
            addOtherInformationKey() {
                this.$set(this.form.other_information, this.otherInformationKey.key, this.otherInformationKey.value);
                this.otherInformationKey.key = null;
                this.otherInformationKey.value = null;
            },
            removeOtherInformationKey(key) {
                delete this.form.other_information[key];

                this.$forceUpdate();
            },
            sendForm() {
                if (this.$refs.form.validate()) {
                    this.editPosition(this.form)
                        .then(() => {
                            if (this.$route.params.id) {
                                this.$router.push({path: `/positions/${this.$route.params.id}`});
                            } else {
                                this.$router.push({path: '/positions'});
                            }
                        })
                }
            },
            setParams() {
                this.title = 'Edit position ' + this.position.name;
                this.form.name = this.position.name;
                this.form.id = this.position.id;
                this.form.description = this.position.description;
                this.form.code_name = this.position.code_name;
                this.form.other_information = Object.assign({}, this.position.other_information);
            }
        },
        mounted() {
            if (this.$route.params.id) {
                this.getPosition(this.$route.params.id)
                    .then(() => {
                        this.setParams();
                    });
            }
        }
    }
</script>

<style lang="scss">
    .positions-page {
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