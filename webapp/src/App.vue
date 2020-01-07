<template>
    <div id="app">
        <h1>Playlist of the decade!!! 💥 💥 💥</h1>
        <hr/>
        <loginForm @successfulLogin="successfulLogin" @successfulLogout="successfulLogout"></loginForm>
        <!-- <hr>
        <register-form></register-form>-->
        <hr/>
        <h5>{{ infoMessage }}</h5>
        <hr/>
        <songList @changePage="changePageApp" :songs="songs" v-if="loggedIn"/>
    </div>
</template>

<script>
    import songList from "./components/songList.vue";
    import loginForm from "./components/loginForm.vue";
    import {ALL_SONGS_QUERY} from "./queries/graphql.js";
    import {USER, AUTH_TOKEN} from "./constants/settings";

    export default {
        name: "app",
        data: function () {
            return {
                songs: [],
                loggedIn: false,
                infoMessage: "You are not logged in.",
                pageSize: 5
            }
        },
        components: {
            songList,
            loginForm
        },
        methods: {
            successfulLogin: function () {
                this.loggedIn = true;
                this.infoMessage = `You are logged in as '${localStorage.getItem(USER)}'`;
                this.songs = [];
                this.$apollo
                    .query({
                        query: ALL_SONGS_QUERY,
                        variables: {
                            size: this.pageSize,
                            page: 0
                        }

                    })
                    .then(data => {
                        let tmp = data.data.songs;
                        tmp.forEach(song => song.editMode = false);
                        this.songs = tmp
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
                    query: ALL_SONGS_QUERY,
                    variables: {
                        page: newPage,
                        size: this.pageSize
                    }
                }).then((data) => {
                    let tmp = data.data.songs;
                    tmp.forEach(song => song.editMode = false);
                    this.songs = tmp
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
