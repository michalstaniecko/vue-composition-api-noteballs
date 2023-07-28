<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";

const { params } = useRoute();
const router = useRouter();

const storeNotes = useStoreNotes();

const noteContent = ref( '' );

noteContent.value = storeNotes.getNoteContent(params.id)

const handleSaveClicked = () => {
  const payload = {
    id: params.id,
    content: noteContent.value
  }
  storeNotes.updateNote(payload);
  router.push('/')
}

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
            class="button is-link is-light mr-2"
            @click="$router.back()"
        >Cancel
        </button>
        <button
            @click.prevent="handleSaveClicked"
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
