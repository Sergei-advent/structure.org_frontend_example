<template>
    <div class="employees-page">
        <router-view class="view box grow"/>
    </div>
</template>

<script>
    import {mapMutations, mapActions} from 'vuex'

    export default {
        name: 'employees',
        methods: {
            ...mapMutations(['setCurrentPage']),
            ...mapActions(['getPermission']),
        },
        mounted() {
            this.setCurrentPage('Employees');
            this.getPermission('employee');
        }
    }
</script>