<template>
    <div v-if="position">
        <v-card class="mx-auto mt-10" raised max-width="500">
            <v-card-title class="headline mb-1 justify-center">{{ position.name }}</v-card-title>
            <v-card-subtitle class="text-center">{{ position.description }}</v-card-subtitle>
            <v-card-text>
                <template v-if="position.other_information && Object.entries(position.other_information).length">
                    <div>Other information:</div>
                    <v-list dense>
                        <v-list-item v-for="(item, key) in position.other_information" :key="key">
                            {{ key }} : {{ item }}
                        </v-list-item>
                    </v-list>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-btn class="mx-auto" v-if="permissionUpdate" color="primary" link :to="'/positions/edit/' + position.id">Edit</v-btn>
                <v-btn class="mx-auto" v-if="permissionDelete" color="error" @click="removePosition">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        name: 'employee',
        computed: {
            ...mapState('position', ['position']),
            ...mapState(['permissions']),
            permissionDelete() {
                return this.permissions.length ?
                    (this.permissions.find((permission) => permission === 'delete')) :
                    false;
            },
            permissionUpdate() {
                return this.permissions.length ?
                    (this.permissions.find((permission) => permission === 'update')) :
                    false;
            }
        },
        methods: {
            ...mapActions('position', ['getPosition', 'deletePosition']),
            removePosition() {
                this.deletePosition(this.$route.params.id)
                    .then(() => this.$router.push({path: '/positions'}));
            }
        },
        mounted() {
            this.getPosition(this.$route.params.id);
        }
    }
</script>