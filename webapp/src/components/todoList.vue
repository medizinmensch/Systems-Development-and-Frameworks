<template>
    <div id="todoList">
        <div class="container px-lg-5">
            <todo
                    @deleteTodo="deleteTodo"
                    @toggleEditMode="toggleEditMode"
                    v-for="todo in todos"
                    :todo="todo"
                    :key="todo.id"
            ></todo>
            <div>
                <div class="row mx-lg-n5 jest-list-item">
                    <div class="col py-3 border bg-light">
                        <label size="6" class="infoLabel">Add ToDo:</label>
                        <button id="buttonAdd" class="btn btn-success" type="button" @click="createTodo">Add</button>
                    </div>
                    <div class="col py-3 border bg-light">
                        <label size="8" class="infoLabel">Pagination:</label>
                        <button id="previousPageButton" class="btn btn-success" type="button" @click="previousPage"><<
                        </button>
                        <label id="pageField" size="4" v-model="page">{{page}}</label>
                        <button id="nextPageButton" class="btn btn-success" type="button" @click="nextPage">>></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import todo from "./todo.vue";
    import {ALL_TODOS_QUERY_PAGINATED, DELETE_TODO, CREATE_TODO, UPDATE_TODO} from "../queries/graphql.js";
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
            todo
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
                        item.editMode = false;
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
            previousPage: function () {
                if (this.page > 0) {
                    this.page -= 1;
                    this.$emit('changePage', this.page);
                }

            },
            nextPage: function () {
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
