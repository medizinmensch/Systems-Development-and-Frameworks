<template>
    <div>
        <form>
            <div class="container px-lg-5">
                <h2>Login</h2>
                <div class="form-group">
                    <input
                            aria-describedby="emailHelp"
                            class="form-control"
                            id="inputMail"
                            placeholder="Email"
                            type="email"
                            v-model="input.email"
                    />
                </div>
                <div class="form-group">
                    <input class="form-control" id="inputPassword" placeholder="Password" type="password"
                           v-model="input.password"/>
                </div>
            </div>
        </form>
        <button @click="login" class="btn btn-primary" id="loginButton">Login</button>
        <button @click="logout" class="btn btn-primary" id="logoutButton">Logout</button>
    </div>
</template>

<script>
  import {LOGIN} from "../queries/graphql.js";
  import {AUTH_TOKEN, USER} from "../constants/settings.js";

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
            login: function () {
                this.$apollo
                    .mutate({
                        mutation: LOGIN,
                        variables: {
                            email: this.input.email,
                            password: this.input.password
                        }
                    })
                    .then((data) => {
                        localStorage.setItem(AUTH_TOKEN, data.data.login.token);
                        localStorage.setItem(USER, data.data.login.user);
                        this.$emit("successfulLogin")
                    }).catch(error => {
                    alert(error);
                });
            },
            logout: function () {
                localStorage.removeItem(AUTH_TOKEN);
                localStorage.removeItem(USER);
                this.$emit("successfulLogout")

            }
        }
    };
</script>

<style scoped>
</style>
