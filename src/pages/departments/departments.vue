<template>
    <div class="departments-page">
        <router-view class="view box grow"/>
    </div>
</template>

<script>
    import {mapMutations, mapActions} from 'vuex'

    export default {
        name: 'departments',
        methods: {
            ...mapMutations(['setCurrentPage']),
            ...mapActions(['getPermission']),
        },
        mounted() {
            this.setCurrentPage('Departments');
            this.getPermission('department');
        }
    }
</script>