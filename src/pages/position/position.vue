<template>
    <div v-if="position">
        <v-card class="mx-auto mt-10" raised max-width="500">
            <v-card-title class="headline mb-1 justify-center">{{ position.name }}</v-card-title>
            <v-card-subtitle class="text-center">{{ position.description }}</v-card-subtitle>
            <v-card-text>
                <template v-if="position.other_information">
                    <div>Other information:</div>
                    <v-list dense>
                        <v-list-item v-for="(item, key) in position.other_information" :key="key">
                            {{ key }} : {{ item }}
                        </v-list-item>
                    </v-list>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-btn class="mx-auto" color="primary" link to="/positions/edit">Edit</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: 'employee',
        computed: {
            ...mapState('position', ['position'])
        },
        methods: {
            ...mapActions('position', ['getPosition'])
        },
        mounted() {
            this.getPosition(this.$route.params.id);
        }
    }
</script>