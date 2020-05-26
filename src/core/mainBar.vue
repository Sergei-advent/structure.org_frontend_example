<template>
    <v-app-bar
            app
            color="indigo"
            dark
    >
        <v-app-bar-nav-icon @click.stop="toggleMainNav"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ currentPage }}</v-toolbar-title>
    </v-app-bar>
</template>
<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: 'mainBar',
        computed: {
            ...mapState(['currentPage'])
        },
        methods: {
            ...mapActions(['toggleMainNav'])
        }
    }
</script>