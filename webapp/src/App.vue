<template>
    <div id="app">
        <h1>Frontend-Einkaufslisten-Bearbeitungs-Und-Erstellungsmaschine</h1>
        <hr/>
        <loginForm @successfulLogin="successfulLogin" @successfulLogout="successfulLogout"></loginForm>
        <!-- <hr>
        <register-form></register-form>-->
        <hr/>
        <h5>{{ infoMessage }}</h5>
        <hr/>
        <list @changePage="changePageApp" :todos="todos" v-if="loggedIn"/>
    </div>
</template>

<script>
    import list from "./components/list.vue";
    import loginForm from "./components/loginForm.vue";
    import {ALL_TODOS_QUERY, ALL_TODOS_QUERY_PAGINATED} from "./queries/graphql.js";
    import {USER, AUTH_TOKEN} from "./constants/settings";

    export default {
        name: "app",
        data: function () {
            return {
                todos: [],
                loggedIn: false,
                infoMessage: "You are not logged in.",
                pageSize: 20
            }
        },
        components: {
            list,
            loginForm
        },
        methods: {
            successfulLogin: function () {
                this.loggedIn = true;
                this.infoMessage = `You are logged in as '${localStorage.getItem(USER)}'`;
                this.todos = [];
                this.$apollo
                    .query({
                        query: ALL_TODOS_QUERY,
                        variables: {
                            size: this.pageSize,
                            page: 0
                        }

                    })
                    .then(data => {
                        let tmp = data.data.todos;
                        tmp.forEach(todo => todo.editMode = false);
                        this.todos = tmp
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            successfulLogout: function () {
                this.loggedIn = false;
                this.infoMessage = "You are not logged in."
            },
            changePageApp: function (newPage) {
                this.$apollo.query({
                    query: ALL_TODOS_QUERY,
                    variables: {
                        page: newPage,
                        size: this.pageSize
                    }
                }).then((data) => {
                    let tmp = data.data.todos;
                    tmp.forEach(todo => todo.editMode = false);
                    this.todos = tmp
                });
            },
        },
        beforeMount() {
            localStorage.removeItem(AUTH_TOKEN);
            localStorage.removeItem(USER);
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
