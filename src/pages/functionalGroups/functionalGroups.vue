<template>
    <div class="fuctional-group-page">
        <router-view class="view box grow"/>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
        name: 'functionalGroups',
        methods: {
            ...mapMutations(['setCurrentPage']),
        },
        mounted() {
            this.setCurrentPage('Functional Groups');
        }
    }
</script>