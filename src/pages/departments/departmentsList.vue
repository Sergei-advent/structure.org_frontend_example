<template>
    <div>
        <div class="ma-5">
            <v-btn color="primary" v-if="permissionCreate" link to="/departments/create">Create new</v-btn>
        </div>
        <v-text-field outlined v-model="search" label="Search" class="px-5"/>
        <v-card class="mx-5" raised v-if="departmentList.length">
            <v-card-text>
                <v-list dense>
                    <v-list-item
                            v-for="(department, key) in departmentList"
                            :key="key"
                            :to="'/departments/' + department.id"
                            link>
                        {{ department.name }} - {{ department.description }}
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
        <v-card v-else class="mx-5" raised>
            <v-card-text>
                Not found departments
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapState, mapMutations} from 'vuex'
    export default {
        name: 'departmentsList',
        data() {
            return {
                search: null
            }
        },
        computed: {
            ...mapState('department', ['departmentList']),
            ...mapState(['permissions']),
            permissionCreate() {
                return this.permissions.length ?
                    (this.permissions.find((permission) => permission === 'create')) :
                    false;
            }
        },
        watch: {
            search(value) {
                this.getDepartmentsList(value);
            }
        },
        methods: {
            ...mapActions('department', ['getDepartmentsList']),
            ...mapMutations('department', ['setDepartment'])
        },
        mounted() {
            this.getDepartmentsList();
            this.setDepartment(null);
        }
    }
</script>