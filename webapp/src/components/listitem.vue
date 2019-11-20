<template>
    <div class="row mx-lg-n5">
        <div class="col-2 py-3 border bg-light">
            <button
                    @click="$emit('toggleEditMode', entry.id)"
                    class="btn btn-primary"
                    id="buttonEdit"
                    name="edit-button"
                    type="button"
                    v-if="!entry.editMode"
            >Edit
            </button>
            <button
                    @click="$emit('toggleEditMode', entry.id)"
                    class="btn btn-success"
                    id="buttonSave"
                    name="save-button"
                    type="button"
                    v-if="entry.editMode"
            >Save
            </button>
            <!-- <button v-bind:disabled="entry.visible" type="button" id="buttonSave" @click="save">Save</button> -->
        </div>
        <div class="col py-3 border bg-light">
            <form class="text">
                <p id="text" v-if="!entry.editMode">{{ entry.text }}</p>
                <input name="newText" type="text" v-if="entry.editMode" v-model="entry.text"/>
            </form>
        </div>
        <div class="col-2 py-3 border bg-light">
            <button
                    @click="$emit('deleteEntry', entry.id)"
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
        name: "item",
        props: {
            entry: Object,
            deleteEntry: Function
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
