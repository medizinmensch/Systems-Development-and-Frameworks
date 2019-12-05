<template>
    <div id="app">
        <h1>Frontend-Einkaufslisten-Bearbeitungs-Und-Erstellungsmaschine</h1>
        <hr>
        <loginForm></loginForm>
        <!-- <hr>
        <register-form></register-form> -->
        <hr>
        <list :todos="todos" @toggle-edit-mode-b="toggleEditModeb"/>
    </div>
</template>

<script>
    import list from "./components/list.vue";
    import loginForm from "./components/loginForm.vue"
    import { ALL_TODOS_QUERY } from './queries/graphql.js'

    export default {
        name: "app",
        data: function () {
            return {
                todos: [],
            };
        },
        components: {
            list,
            loginForm,
        },
        apollo: {
            todos: {
                query: ALL_TODOS_QUERY
            }
        },
        methods: {
            toggleEditModeb: function (id) {
                for (let i of this.todos) {
                    if (i.id === id) {
                        i.editMode = !i.editMode;
                    }
                }
            },
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
