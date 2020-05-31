<template>
    <div>
        <div class="ma-5">
            <v-btn color="primary" v-if="permissionCreate" link to="/positions/create">Create new</v-btn>
        </div>

        <v-text-field outlined v-model="search" label="Search" class="px-5"/>
        <v-card class="mx-5" raised v-if="positionList.length">
            <v-card-text>
                <v-list dense>
                    <v-list-item
                            v-for="(position, key) in positionList"
                            :key="key"
                            :to="'/positions/' + position.id"
                            link>
                        {{ position.name }} {{ position.description && '- ' + position.description }}
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
        <v-card v-else class="mx-5" raised>
            <v-card-text>
                Not found positions
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapState, mapMutations} from 'vuex'
    export default {
        name: 'positionsList',
        data() {
            return {
                search: null
            }
        },
        computed: {
            ...mapState('position', ['positionList']),
            ...mapState(['permissions']),
            permissionCreate() {
                return this.permissions.length ?
                    (this.permissions.find((permission) => permission === 'create')) :
                    false;
            }
        },
        watch: {
            search(value) {
                this.getPositionsList(value);
            }
        },
        methods: {
            ...mapActions('position', ['getPositionsList']),
            ...mapMutations('position', ['setPosition'])
        },
        mounted() {
            this.getPositionsList();
            this.setPosition(null);
        }
    }
</script>