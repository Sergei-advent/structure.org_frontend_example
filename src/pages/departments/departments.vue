<template>
    <div class="departments-page">
        <router-view class="view box grow"/>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
        name: 'departments',
        methods: {
            ...mapMutations(['setCurrentPage']),
        },
        mounted() {
            this.setCurrentPage('Departments');
        }
    }
</script>