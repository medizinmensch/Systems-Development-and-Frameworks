<template>
  <div>
    <form>
      <h2>Register</h2>
      <div class="container px-lg-5">
        <label for="exampleInputEmail1">Email address</label>
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
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="inputPassword" placeholder="Password" />
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            placeholder="Confirm password"
            @blur="checkPassword"
          />
        </div>
        <button type="submit" class="btn btn-primary" @click="createEntry">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { REGISTER } from "../queries/graphql.js";

export default {
  name: "registerForm",
  methods: {
    register: function(id, password) {
      this.$apollo
        .mutate({
          mutation: REGISTER,
          variables: {
            email: email,
            password: password
          }
        })
        .then(response => {
          if (response.data.status == "success") {
            alert("Registration successfull");
          } else {
            alert("Registration failed");
          }
        })
        .catch(error => {
          console.error(error);
          alert("Massive error");
        });
    },
    checkPassword: function(password) {
      alert("not yet implemented");
    }
  }
};
</script>

<style scoped>
</style>
