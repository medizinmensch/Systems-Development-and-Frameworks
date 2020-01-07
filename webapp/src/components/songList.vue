<template>
    <div id="songList">
        <div class="container px-lg-5">
            <div class="row mx-lg-n5 jest-list-item" id="listHeader">
                <div class="col py-md-3 border bg-light" id="songTextHeaderDiv">
                    <p>Song</p>
                </div>
                <div class="col-2 py-md-3 border bg-light" id="belongingHeaderDiv">
                    <p>belongsTo</p>
                </div>
                <div class="col-2 py-md-3 border bg-light" id="createdAtHeaderDiv">
                    <p>createdAt</p>
                </div>
                <div class="col-2 py-md-3 border bg-light" id="modifiedAtHeaderDiv">
                    <p>modifiedAt</p>
                </div>
                <div class="col-2 py-md-3 border bg-light" id="buttonsHeaderDiv">
                    <p></p>
                </div>
            </div>
            <song
                    :key="song.id"
                    :song="song"
                    @deleteSong="deleteSong"
                    @toggleEditMode="toggleEditMode"
                    v-for="song in songs"
            ></song>
            <div>
                <div class="row mx-lg-n5 jest-list-item">
                    <div class="col py-3 border bg-light">
                        <label class="infoLabel" size="6">Add ToDo:</label>
                        <button @click="createSong" class="btn btn-success" id="buttonAdd" type="button">Add</button>
                    </div>
                    <div class="col py-3 border bg-light">
                        <label class="infoLabel" size="8">Pagination:</label>
                        <button @click="previousPage" class="btn btn-success" id="previousPageButton" type="button">prev
                        </button>
                        <label id="pageField" size="4">{{page}}</label>
                        <button @click="nextPage" class="btn btn-success" id="nextPageButton" type="button">next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import song from "./song.vue";
    import {CREATE_SONG, DELETE_SONG, UPDATE_SONG} from "../queries/graphql.js";
    import {USER} from "../constants/settings";

    export default {
        name: "songList",
        data: function () {
            return {
                page: 0,
            }
        },
        props: {
            songs: Array,
        },
        components: {
            song
        },
        methods: {
            createSong() {
                this.$apollo
                    .mutate({
                        mutation: CREATE_SONG,
                        variables: {
                            name: "Another one bites the dust",
                            user: localStorage.getItem(USER)
                        }
                    })
                    .then(data => {
                        let item = data.data.createSong;
                        item.editMode = false;
                        this.songs.push(item);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            deleteSong(id) {
                this.items = this.items.filter(x => x.id !== id);
                this.$apollo.mutate({
                    mutation: DELETE_SONG,
                    variables: {
                        id: id
                    }
                });
            },
            toggleEditMode(entry) {
                if (entry.editMode) {
                    this.$apollo
                        .mutate({
                            mutation: UPDATE_SONG,
                            variables: {
                                id: entry.id,
                                name: entry.name
                            }
                        })
                        .then((response) => {
                                const item = response.data.updateSong;
                                this.songs.forEach(i => {
                                    if (i.id === item.id) {
                                        i.modifiedAt = item.modifiedAt;
                                    }
                                });
                            }
                        )
                        .catch(error => {
                            console.error(error);
                        });
                }

                this.songs.forEach(i => {
                    if (i.id === entry.id) i.editMode = !i.editMode;
                });
            },
            previousPage() {
                //this.page = Math.max(0, this.page - 1)
                if (this.page > 0) {
                    this.page -= 1;
                    this.$emit('changePage', this.page);
                }
            }
            ,
            nextPage() {
                this.page += 1;
                this.$emit('changePage', this.page)
            }
            ,
        }
    }
    ;
</script>

<style scoped>
    .btn-success {
        margin-right: 30px;
        margin-left: 30px;
    }

    .infoLabel {
        margin-left: 30px;
    }

    #listHeader {
        font-size: 120%;
        margin: auto
    }
</style>
