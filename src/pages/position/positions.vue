<template>
    <div class="positions-page">
        <router-view class="view box grow"/>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
        name: 'positions',
        methods: {
            ...mapMutations(['setCurrentPage']),
        },
        mounted() {
            this.setCurrentPage('Positions');
        }
    }
</script>