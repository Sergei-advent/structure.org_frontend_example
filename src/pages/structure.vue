<template>
    <div>
        <v-file-input
                label="Upload structure from '.xml'"
                @change="loadStructure"
                accept=".xml"
        />
        <v-treeview
                open-all
                :items="structure"
                activatable
                color="warning"
                @update:active="viewDepartment"
                v-if="structure.length">
        </v-treeview>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'

    export default {
        name: 'structure',
        computed: {
          ...mapState('structure', ['structure'])
        },
        methods: {
            ...mapActions('structure', ['getStructure', 'setStructure']),
            ...mapMutations(['setCurrentPage']),
            viewDepartment(id) {
              this.$router.push({path: `departments/${id}`});
            },
            loadStructure(file) {
              if (file) {
                  const reader = new FileReader();
                  reader.readAsText(file, "UTF-8");
                  reader.onload = (evt) => {
                      this.setStructure(evt.target.result);
                  }
              }
            }
        },
        mounted() {
            this.getStructure();
            this.setCurrentPage('Structure');
        }
    }
</script>