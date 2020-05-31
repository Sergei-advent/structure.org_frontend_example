<template>
    <div>
        <v-file-input
                label="Upload structure from '.xml'"
                @change="loadStructure"
                accept=".xml"
                v-if="permissionUpload"
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
          ...mapState('structure', ['structure']),
            ...mapState(['permissions']),
            permissionUpload() {
                return this.permissions.length ?
                    (this.permissions.find((permission) => permission === 'upload')) :
                    false;
            }
        },
        methods: {
            ...mapActions('structure', ['getStructure', 'setStructure']),
            ...mapActions(['getPermission']),
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
            this.getPermission('structure');
        }
    }
</script>