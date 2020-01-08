<template>
    <div id="todoList">
        <div class="container px-lg-5">
            <div id="listHeader" class="row mx-lg-n5 jest-list-item">
                <div id="todoTextHeaderDiv" class="col py-md-3 border bg-light">
                    <p>Todo</p>
                </div>
                <div id="belongingHeaderDiv" class="col-2 py-md-3 border bg-light">
                    <p>belongsTo</p>
                </div>
                <div id="createdAtHeaderDiv" class="col-2 py-md-3 border bg-light">
                    <p>createdAt</p>
                </div>
                <div id="modifiedAtHeaderDiv" class="col-2 py-md-3 border bg-light">
                    <p>modifiedAt</p>
                </div>
                <div id="buttonsHeaderDiv" class="col-2 py-md-3 border bg-light">
                    <p></p>
                </div>
            </div>
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
                        <button id="previousPageButton" class="btn btn-success" type="button" @click="previousPage">prev
                        </button>
                        <label id="pageField" size="4">{{page}}</label>
                        <button id="nextPageButton" class="btn btn-success" type="button" @click="nextPage">next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import todo from "./todo.vue";
    import {DELETE_TODO, CREATE_TODO, UPDATE_TODO} from "../queries/graphql.js";
    import {USER} from "../constants/settings";

    export default {
        name: "todoList",
        data() {
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
                this.$apollo.mutate({
                    mutation: DELETE_TODO,
                    variables: {
                        id: id
                    }
                });
                this.todos = this.todos.filter(x => x.id !== id);
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
                        .then((response) => {
                                const item = response.data.updateTodo;
                                this.todos.forEach(i => {
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

    #listHeader {
        font-size: 120%;
        margin: auto
    }
</style>
