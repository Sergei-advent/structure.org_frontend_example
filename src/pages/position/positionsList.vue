<template>
    <div>
        <v-btn class="ma-5" color="primary" link to="/positions/edit">Create new</v-btn>
        <v-list dense>
            <v-list-item
                    v-for="(position, key) in positionList"
                    :key="key"
                    :to="'/positions/' + position.id"
                    link>
                {{ position.name }} {{ position.description && '- ' + position.description }}
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: 'positionsList',
        computed: {
            ...mapState('position', ['positionList'])
        },
        methods: {
            ...mapActions('position', ['getPositionsList'])
        },
        mounted() {
            this.getPositionsList();
        }
    }
</script>