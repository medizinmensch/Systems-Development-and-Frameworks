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
        <button class="btn btn-primary" @click="login">Submit</button>
      </div>
    </form>
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
      alert(`Try to login with the email: ${this.input.email} and password: ${this.input.password}`)
      this.$apollo
        .mutate({
          mutation: LOGIN,
          variables: {
            email: this.input.email,
            password: this.input.password
          }
        })
        .then(response => {
          alert("got response")
          data = response.data;
          if ((data.status = "success")) {
            this.$emit("loginSuccessful", response.data.jwt);
            localStorage.setItem(AUTH_TOKEN, data.jwt);
            alert("login successfull");
          } else {
            alert("login failed");
          }
        })
        .catch(error => {
          alert("error");
        });
    }
  }
};
</script>

<style scoped>
</style>