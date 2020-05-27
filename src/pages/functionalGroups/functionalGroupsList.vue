<template>
    <div>
        <v-btn class="ma-5" color="primary" link to="/functional_groups/edit">Create new</v-btn>
        <v-list dense>
            <v-list-item
                    v-for="(functionalGroup, key) in functionalGroupList"
                    :key="key"
                    :to="'/functionalGroup/' + functionalGroup.id"
                    link>
                {{ functionalGroup.name }} - {{ functionalGroup.description }}
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: 'functionalGroupsList',
        computed: {
            ...mapState('functionalGroup', ['functionalGroupList'])
        },
        methods: {
            ...mapActions('functionalGroup', ['getFunctionalGroupsList'])
        },
        mounted() {
            this.getFunctionalGroupsList();
        }
    }
</script>