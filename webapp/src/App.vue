<template>
  <div id="app">
    <h1>Frontend-Einkaufslisten-Bearbeitungs-Und-Erstellungsmaschine</h1>
    <hr />
    <loginForm @successfulLogin="successfulLogin"></loginForm>
    <!-- <hr>
    <register-form></register-form>-->
    <hr />
    <list :todos="todos" v-if="loggedIn" />
  </div>
</template>

<script>
import list from "./components/list.vue";
import loginForm from "./components/loginForm.vue";
import { ALL_TODOS_QUERY } from "./queries/graphql.js";
import {USER, AUTH_TOKEN} from "./constants/settings";

export default {
  name: "app",
  data: function() {
    return {
      todos: [],
      loggedIn: false
    //   loggedIn: function() {
    //       console.log("blasd")
    //       console.log(localStorage.getItem(AUTH_TOKEN))
    //       console.log(typeof localStorage.getItem(AUTH_TOKEN))
    //       if (localStorage.getItem(AUTH_TOKEN)){
    //           console.log("true")
    //           return true
    //       }
    //       return false
    //   }
    };
  },
  components: {
    list,
    loginForm
  },
  methods: {
    successfulLogin: function() {
      this.loggedIn = true;

      this.$apollo
        .query({
          query: ALL_TODOS_QUERY
        })
        .then(data => {
          let tmp = data.data.todos;
          console.log("daten anreichen", data)
          tmp.forEach(todo => todo.editMode = false)
          this.todos = tmp;
        })
        .catch(error => {
          console.error(error);
        });
    },
    successfulLogout: function() {
      this.loggedIn = false;
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
