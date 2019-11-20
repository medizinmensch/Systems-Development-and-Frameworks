<template>
    <div>
        <div class="container px-lg-5">
            <listitem
                    @deleteEntry="deleteEntry"
                    @toggleEditMode="toggleEditMode"
                    v-for="item in items"
                    :entry="item"
                    :key="item.id"
            ></listitem>
            <div class="row mx-lg-n5">
                <div class="col-12 py-3 border bg-light">
                    <button class="btn btn-success" type="button" @click="createEntry" id="btnAdd">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import listitem from "./listitem.vue";
    import {DELETE_ENTRY, CREATE_ENTRY} from "../queries/graphql.js";

    export default {
        name: "list",
        props: {
            items: Array
        },
        components: {
            listitem
        },
        methods: {
            deleteEntry: function (id) {
                // todo - i know its stupid but deleting item on client & server side
                const index = this.items.findIndex(x => x.id === id);
                this.items.splice(index, 1);
                console.log("button was pressed with id:" + id);
                this.$apollo.mutate({
                    mutation: DELETE_ENTRY,
                    variables: {
                        id: id
                    },
                });
            },
            toggleEditMode: function (id) {
                this.$emit("toggle-edit-mode-b", id);
            },
            createEntry: function () {
                console.log("in function, before mutation");
                this.$apollo.mutate({
                    mutation: CREATE_ENTRY,
                    variables: {
                        text: "More things todo..."
                    },
                }).then((data) => {
                    this.items.push(data.data.createEntry);
                }).catch((error) => {
                    console.error(error)
                })

            }
        }
    };
</script>

<style scoped>
</style>
