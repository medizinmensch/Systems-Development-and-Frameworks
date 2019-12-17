<template>
    <div>
        <div class="container px-lg-5">
            <listitem
                    @deleteEntry="deleteTodo"
                    @toggleEditMode="toggleEditMode"
                    v-for="todo in todos"
                    :entry="todo"
                    :key="todo.id"
            ></listitem>
            <div class="row mx-lg-n5">
                <div class="col-12 py-3 border bg-light">
                    <button class="btn btn-success" type="button" @click="createTodo" id="btnAdd">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import listitem from "./listitem.vue";
    import {DELETE_TODO, CREATE_TODO, UPDATE_TODO} from "../queries/graphql.js";
    import {USER} from "../constants/settings";

    export default {
        name: "list",
        props: {
            todos: Array
        },
        components: {
            listitem
        },
        methods: {
            createTodo: function () {
                this.$apollo
                    .mutate({
                        mutation: CREATE_TODO,
                        variables: {
                            text: "More things todo...",
                            user: localStorage.getItem(USER)
                        }
                    })
                    .then(data => {
                        let item = data.data.createTodo;
                        item.editMode = true;
                        this.todos.push(item);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            deleteTodo: function (id) {
                const index = this.todos.findIndex(x => x.id === id);
                this.todos.splice(index, 1);
                this.$apollo.mutate({
                    mutation: DELETE_TODO,
                    variables: {
                        id: id
                    }
                });
            },
            toggleEditMode: function (entry) {
                if (entry.editMode) {
                    this.$apollo
                        .mutate({
                            mutation: UPDATE_TODO,
                            variables: {
                                id: entry.id,
                                text: entry.text
                            }
                        })
                        .then(data => {
                            console.log("updated todo.");
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }

                this.todos.forEach(i => {
                    if (i.id === entry.id) i.editMode = !i.editMode;
                });
            }
        }
    };
</script>

<style scoped>
</style>
