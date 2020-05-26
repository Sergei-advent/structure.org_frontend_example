<template>
    <div>
        <v-btn class="ma-5" color="primary" link to="/departments/edit">Create new</v-btn>
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
    import {mapActions, mapState} from 'vuex'
    export default {
        name: 'departmentsList',
        computed: {
            ...mapState('department', ['departmentList'])
        },
        methods: {
            ...mapActions('department', ['getDepartmentsList'])
        },
        mounted() {
            this.getDepartmentsList();
        }
    }
</script>