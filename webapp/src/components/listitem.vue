<template>
    <div class="row mx-lg-n5 jest-list-item">
        <div class="col-2 py-3 border bg-light">
            <button
                    @click="$emit('toggleEditMode', todo)"
                    class="btn btn-primary"
                    id="buttonEdit"
                    name="edit-button"
                    type="button"
                    v-if="!todo.editMode"
            >Edit
            </button>
            <button
                    @click="$emit('toggleEditMode', todo)"
                    class="btn btn-success"
                    id="buttonSave"
                    name="save-button"
                    type="button"
                    v-if="todo.editMode"
            >Save
            </button>
            <!-- <button v-bind:disabled="todo.visible" type="button" id="buttonSave" @click="save">Save</button> -->
        </div>
        <div class="col py-3 border bg-light">
            <form class="text">
                <p id="todoText" v-if="!todo.editMode">{{ todo.text }}</p>
                <input id="todoTextEdited" type="text" v-if="todo.editMode" v-model="todo.text"/>
            </form>
        </div>
        <div class="col-2 py-3 border bg-light">
            <form class="text">
                <p id="username" >{{ todo.user.name }}</p>
            </form>
        </div>
        <div class="col-2 py-3 border bg-light">
            <button
                    @click="$emit('deleteTodo', todo.id)"
                    class="btn btn-danger"
                    id="buttonDelete"
                    name="delete-button"
                    type="button"
            >Delete
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "todo",
        props: {
            todo: Object,
            deleteTodo: Function
        },
        data: function () {
            return {counter: 0};
        }
    };
</script>

<style>
    .text {
        text-align: left;
    }
</style>