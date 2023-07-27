<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";

const { params } = useRoute();

const storeNotes = useStoreNotes();

const noteContent = ref( '' );

noteContent.value = storeNotes.getNoteContent(params.id)

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
    <pre>
      {{ $route.params.id }}
    </pre>
  </div>
</template>

<style scoped>

</style>
