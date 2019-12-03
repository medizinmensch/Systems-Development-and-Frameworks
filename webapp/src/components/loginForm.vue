<template>
  <div>
    <form>
      <div class="container px-lg-5">
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            id="inputMail"
            aria-describedby="emailHelp"
            placeholder="Email"
          />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" id="inputPassword" placeholder="Password" />
        </div>
        <button type="submit" class="btn btn-primary" @click="login">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { LOGIN } from "../queries/graphql.js";
import { AUTH_TOKEN } from "../constants/settings.js";

export default {
  name: "loginForm",
  methods: {
    login: function(id, password) {
      r = this.$apollo
        .mutate({
          mutation: LOGIN,
          variables: {
            email: email,
            password: password
          }
        })
        .then(response => {
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
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
</style>