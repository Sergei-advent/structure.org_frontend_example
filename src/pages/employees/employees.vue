<template>
    <div class="employees-page">
        <router-view class="view box grow"/>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
        name: 'employees',
        methods: {
            ...mapMutations(['setCurrentPage']),
        },
        mounted() {
            this.setCurrentPage('Employees');
        }
    }
</script>