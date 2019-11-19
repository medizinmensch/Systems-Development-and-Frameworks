<template>
    <div id="app">
        <h1>Frontend-Einkaufslisten-Bearbeitungs-Und-Erstellungsmaschine</h1>
        <h4 v-if="loading">Loading...</h4>
        <List :items="items" @add-entry="addEntry" @delete-entry-b="deleteEntryb"
              @toggle-edit-mode-b="toggleEditModeb"/>
    </div>
</template>

<script>
    import List from "./components/list.vue";
    import {ALL_ITEMS_QUERY} from './queries/graphql'

    export default {
        name: "app",
        data: function () {
            return {
                items: [],
                maxId: 3
            };
        },
        components: {
            List
        },
        apollo: {
            items: {
                query: ALL_ITEMS_QUERY
            }
        },
        methods: {
            deleteEntryb: function (id) {
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].id === id) {
                        this.items.splice(i, 1);
                    }
                }
            },
            toggleEditModeb: function (id) {

                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].id === id) {
                        this.items[i].editMode = !this.items[i].editMode;
                    }
                }
            },
            addEntry: function () {
                this.items.push({id: this.maxId + 1, editMode: true, text: "insert please..."});
                this.maxId++
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

    /*
    h1,
    h2 {
      font-weight: normal;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      display: inline-block;
      margin: 0 10px;
    }

    a {
      color: #42b983;
    } */
</style>
