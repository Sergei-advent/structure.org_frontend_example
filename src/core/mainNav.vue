<template>
    <v-navigation-drawer
            v-model="drawer"
            app
    >
        <v-list dense>
            <v-list-item to="/structure" link>
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Structure</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/departments" link>
                <v-list-item-action>
                    <v-icon>mdi-folder-multiple</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Departments</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/employees" link>
                <v-list-item-action>
                    <v-icon>mdi-account-multiple</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Employees</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/positions" link>
                <v-list-item-action>
                    <v-icon>mdi-account-star</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Positions</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item  to="/functional_groups" link>
                <v-list-item-action>
                    <v-icon>mdi-folder-account</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Functional Groups</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'mainNav',
        computed: {
            ...mapState(['showMainNav']),
            drawer: {
                get() {
                    return this.showMainNav;
                },
                set() {
                    return true;
                }
            }
        }
    }
</script>