<template>
    <div>
        <v-treeview
                open-all
                :items="structure"
                activatable
                color="warning"
                @update:active="test">
        </v-treeview>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'structure',
        computed: {
          ...mapState(['structure'])
        },
        methods: {
          ...mapActions(['getStructure']),
            test(id) {
              this.$router.push({name: 'department', params: { id }});
            }
        },
        mounted() {
            this.getStructure();
        }
    }
</script>