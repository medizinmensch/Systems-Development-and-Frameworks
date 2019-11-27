<template>
  <div id="app">
    <h1>Frontend-Einkaufslisten-Bearbeitungs-Und-Erstellungsmaschine</h1>
    <list :items="items" @toggle-edit-mode-b="toggleEditModeb" />
  </div>
</template>

<script>
import list from "./components/list.vue";
import { ALL_ITEMS_QUERY } from "./queries/graphql.js";

export default {
  name: "app",
  data: function() {
    return {
      items: []
    };
  },
  components: {
    list
  },
  apollo: {
    items: {
      query: ALL_ITEMS_QUERY
    }
  },
  methods: {
    toggleEditModeb: function(id) {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id) {
          this.items[i].editMode = !this.items[i].editMode;
        }
      }
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
