<template>
    <div class="functional-group-page">
        <router-view class="view box grow"/>
    </div>
</template>

<script>
    import {mapMutations, mapActions} from 'vuex'

    export default {
        name: 'functionalGroups',
        methods: {
            ...mapMutations(['setCurrentPage']),
            ...mapActions(['getPermission']),
        },
        mounted() {
            this.setCurrentPage('Functional Groups');
            this.getPermission('functionalGroup');
        }
    }
</script>