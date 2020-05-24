<template>
    <v-app-bar
            app
            color="indigo"
            dark
    >
        <v-app-bar-nav-icon @click.stop="toggleMainNav"></v-app-bar-nav-icon>
        <v-toolbar-title>Company Name</v-toolbar-title>
    </v-app-bar>
</template>
<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'mainBar',
        methods: {
            ...mapActions(['toggleMainNav'])
        }
    }
</script>