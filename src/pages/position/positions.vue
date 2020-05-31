<template>
    <div class="positions-page">
        <router-view class="view box grow"/>
    </div>
</template>

<script>
    import {mapMutations, mapActions} from 'vuex'

    export default {
        name: 'positions',
        methods: {
            ...mapMutations(['setCurrentPage']),
            ...mapActions(['getPermission']),
        },
        mounted() {
            this.setCurrentPage('Positions');
            this.getPermission('position');
        }
    }
</script>