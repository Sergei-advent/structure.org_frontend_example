<template>
    <div>
        <div class="ma-5">
            <v-btn color="primary" v-if="permissionCreate" link to="/functional_groups/create">Create new</v-btn>
        </div>

        <v-tabs
                center-active
                v-model="tab"
                class="ma-5"
        >
            <v-tab>
                List
            </v-tab>
            <v-tab>
                Tree
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-text-field outlined v-model="search" label="Search" class="px-5"/>
                <v-card class="mx-5" raised v-if="functionalGroupList.length">
                    <v-card-text>
                        <v-list dense>
                            <v-list-item
                                    v-for="(functionalGroup, key) in functionalGroupList"
                                    :key="key"
                                    :to="'/functional_groups/' + functionalGroup.id"
                                    link>
                                {{ functionalGroup.name }} - {{ functionalGroup.description }}
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
                <v-card v-else class="mx-5" raised>
                    <v-card-text>
                        Not found functional groups
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card class="mx-5" raised v-if="functionalGroupList.length">
                    <v-card-text>
                        <v-treeview
                                open-all
                                :items="functionalGroupList"
                                activatable
                                color="warning"
                                @update:active="viewFunctionalGroup">
                        </v-treeview>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
    import {mapActions, mapState, mapMutations} from 'vuex'
    export default {
        name: 'functionalGroupsList',
        data() {
            return {
                search: null,
                tab: null
            }
        },
        computed: {
            ...mapState('functionalGroup', ['functionalGroupList']),
            ...mapState(['permissions']),
            permissionCreate() {
                return this.permissions.length ?
                    (this.permissions.find((permission) => permission === 'create')) :
                    false;
            }
        },
        watch: {
            search(value) {
                this.getFunctionalGroupsList(value);
            },
            tab(value) {
                if (value) {
                    this.getFunctionalGroupsTree();
                } else {
                    this.getFunctionalGroupsList(this.search);
                }
            }
        },
        methods: {
            ...mapActions('functionalGroup', ['getFunctionalGroupsList', 'getFunctionalGroupsTree']),
            ...mapMutations('functionalGroup', ['setFunctionalGroup']),
            viewFunctionalGroup(id) {
                this.$router.push({path: `functional_groups/${id}`});
            }
        },
        mounted() {
            this.getFunctionalGroupsList();
            this.setFunctionalGroup(null);
        }
    }
</script>