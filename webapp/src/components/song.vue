<template>
    <div class="row mx-lg-n5 jest-list-item">
        <div class="col py-md-3 border bg-light" id="songTextDiv">
            <form class="text">
                <p id="songText" v-if="!song.editMode">{{ song.name }}</p>
                <input id="songTextEdited" type="text" v-if="song.editMode" v-model="song.name"/>
            </form>
        </div>
        <div class="col-2 py-md-3 border bg-light" id="belongingDiv">
            <form class="text">
                <p id="username">{{ song.user.name }}</p>
            </form>
        </div>
        <div class="col-2 py-md-3 border bg-light" id="createdAtDiv">
            <form class="text">
                <p id="createdAt">{{ song.createdAt }}</p>
            </form>
        </div>
        <div class="col-2 py-md-3 border bg-light" id="modifiedAtDiv">
            <form class="text">
                <p id="modifiedAt">{{ song.modifiedAt }}</p>
            </form>
        </div>
        <div class="col-1 py-md-3 border bg-light" id="editSaveButtonDiv">
            <button
                    @click="$emit('toggleEditMode', song)"
                    class="btn btn-primary"
                    id="buttonEdit"
                    name="edit-button"
                    type="button"
                    v-if="!song.editMode"
            >Edit
            </button>
            <button
                    @click="$emit('toggleEditMode', song)"
                    class="btn btn-success"
                    id="buttonSave"
                    name="save-button"
                    type="button"
                    v-if="song.editMode"
            >Save
            </button>
        </div>
        <div class="col-1 py-md-3 border bg-light" id="deleteButtonDiv">
            <button
                    @click="$emit('deleteSong', song.id)"
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
        name: "song",
        props: {
            song: Object,
            deleteSong: Function
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

    .btn-danger {
        margin: auto;
    }
</style>