<template>
    <div id="app">
        <h1>Frontend-Einkaufslisten-Bearbeitungs-Und-Erstellungsmaschine</h1>
        <hr>
        <loginForm @loginSuccessful="saveJwt"></loginForm>
        <hr>
        <register-form></register-form>
        <hr>
        <list :items="items" @toggle-edit-mode-b="toggleEditModeb"/>
    </div>
</template>

<script>
    import list from "./components/list.vue";
    import loginForm from "./components/loginForm.vue"
    import registerForm from "./components/registerForm.vue"
    import { ALL_ITEMS_QUERY } from './queries/graphql.js'
    
    export default {
        name: "app",
        data: function () {
            return {
                items: [],
                jwt:"not yet defined"
            };
        },
        components: {
            list,
            loginForm,
            registerForm
        },
        apollo: {
            items: {
                query: ALL_ITEMS_QUERY
            }
        },
        methods: {
            toggleEditModeb: function (id) {
                for (let i of this.items) {
                    if (i.id === id) {
                        i.editMode = !i.editMode;
                    }
                }
            },
            saveJwt: function (jwt) {
                this.jwt = jwt
            }
        }
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
