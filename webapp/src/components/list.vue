<template>
    <div id="todoList">
        <div class="container px-lg-5">
            <listitem
                    @deleteTodo="deleteTodo"
                    @toggleEditMode="toggleEditMode"
                    v-for="todo in todos"
                    :todo="todo"
                    :key="todo.id"
            ></listitem>
            <div>
                <div class="row mx-lg-n5 jest-list-item">
                    <div class="col py-3 border bg-light">
                        <label size="6" class="infoLabel">Add ToDo:</label>
                        <button id="buttonAdd" class="btn btn-success" type="button" @click="createTodo">Add</button>
                    </div>
                    <div class="col py-3 border bg-light">
                        <label size="8" class="infoLabel">Pagination:</label>
                        <button id="previousPageButton" class="btn btn-success" type="button" @click="previousPage">prev
                        </button>
                        <label id="pageField" size="4">{{page}}</label>
                        <button id="nextPageButton" class="btn btn-success" type="button" @click="nextPage">next</button>
                    </div>
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
        name: "todoList",
        data: function () {
            return {
                page: 0,
            }
        },
        props: {
            todos: Array,
        },
        components: {
            listitem
        },
        methods: {
            createTodo() {
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
                        item.editMode = false;
                        this.todos.push(item);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
            deleteTodo(id) {
                this.items = this.items.filter(x => x.id !== id);
                this.$apollo.mutate({
                    mutation: DELETE_TODO,
                    variables: {
                        id: id
                    }
                });
            },
            toggleEditMode(entry) {
                if (entry.editMode) {
                    this.$apollo
                        .mutate({
                            mutation: UPDATE_TODO,
                            variables: {
                                id: entry.id,
                                text: entry.text
                            }
                        })
                        .then(() => {
                            console.log("updated todo.");
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }

                this.todos.forEach(i => {
                    if (i.id === entry.id) i.editMode = !i.editMode;
                });
            },
            previousPage() {
                //this.page = Math.max(0, this.page - 1)
                if (this.page > 0) {
                    this.page -= 1;
                    this.$emit('changePage', this.page);
                }

            },
            nextPage() {
                this.page += 1;
                this.$emit('changePage', this.page)
            },
        }
    };
</script>

<style scoped>
    .btn-success {
        margin-right: 30px;
        margin-left: 30px;
    }
    .infoLabel {
        margin-left: 30px;
    }

</style>
