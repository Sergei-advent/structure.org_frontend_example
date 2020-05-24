<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <main-nav />

        <main-bar />

        <v-content>

        </v-content>

        <main-footer />
      </v-app>
    </v-app>
  </div>
</template>

<script>
import mainBar from './core/mainBar'
import mainNav from './core/mainNav'
import mainFooter from './core/mainFooter'

export default {
  name: 'App',
  components: {mainBar, mainNav, mainFooter},
  props: {
    source: String,
  }
};
</script>
