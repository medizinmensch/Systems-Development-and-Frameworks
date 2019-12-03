<template>
  <div>
    <form>
      <div class="container px-lg-5">
        <h2>Login</h2>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            id="inputMail"
            aria-describedby="emailHelp"
            placeholder="Email"
            v-model="input.email"
          />
        </div>
        <div class="form-group">
          <input type="password" v-model="input.password" class="form-control" id="inputPassword" placeholder="Password" />
        </div>
      </div>
    </form>
    <button class="btn btn-primary" @click="login">Submit</button>
  </div>
</template>

<script>
import { LOGIN } from "../queries/graphql.js";
import { AUTH_TOKEN } from "../constants/settings.js";

export default {
  name: "loginForm",
  data() {
    return {
      input: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    login: function(id, password) {
      this.$apollo
        .mutate({
          mutation: LOGIN,
          variables: {
            email: this.input.email,
            password: this.input.password
          }
        })
        .then((data) => {
          localStorage.setItem(AUTH_TOKEN, data.data.login);
        })
    }
  }
};
</script>

<style scoped>
</style>