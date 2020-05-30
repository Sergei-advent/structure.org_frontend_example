<template>
    <div>
        <v-btn class="ma-5" color="primary" link to="/departments/create">Create new</v-btn>
        <v-text-field outlined v-model="search" label="Search" class="px-5"/>
        <v-list dense>
            <v-list-item
                    v-for="(department, key) in departmentList"
                    :key="key"
                    :to="'/departments/' + department.id"
                    link>
                {{ department.name }} - {{ department.description }}
            </v-list-item>
        </v-list>
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
            ...mapState('department', ['departmentList'])
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