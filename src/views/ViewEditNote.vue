<script setup>
import { ref } from "vue";
import AddEditNote from "@/components/Notes/AddEditNote.vue";

const noteContent = ref( '' );

</script>

<template>
  <div class="edit-note">
    <AddEditNote
        ref="addEditRef"
        v-model="noteContent"
        bg-color="link"
        placeholder="Edit note"
        label="Edit note"
    >

      <template #buttons>
        <button
            class="button is-link is-light"
            @click="$router.back()"
        >Cancel
        </button>
        <button
            class="button is-link has-background-link"
            :disabled="!noteContent"
        >Save Note
        </button>
      </template>
    </AddEditNote>
  </div>
</template>

<style scoped>

</style>
