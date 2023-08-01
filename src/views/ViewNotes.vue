<script setup>
import { ref } from "vue";
import Note from "@/components/Notes/Note.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { storeToRefs } from "pinia";
import AddEditNote from "@/components/Notes/AddEditNote.vue";
import { useWatchCharacters } from "@/use/useWatchCharacters";

const newNote = ref( '' );
const addEditRef = ref( null );

const storeNotes = useStoreNotes();

const { notes, notesLoaded } = storeToRefs( storeNotes );
const { addNote } = storeNotes;

const addNoteHandler = () => {
  addNote( newNote.value );
  addEditRef.value.focusTextarea();
  newNote.value = '';
}

useWatchCharacters( newNote );

</script>

<template>
  <div class="notes">
    <AddEditNote
        v-model="newNote"
        ref="addEditRef"
        placeholder="Add a new note"
    >

      <template #buttons>
        <button
            :disabled="!newNote"
            @click.prevent="addNoteHandler"
            class="button is-link has-background-success"
        >Add New Note
        </button>
      </template>
    </AddEditNote>

    <progress v-if="!notesLoaded" class="progress is-large is-info" max="100"/>

    <template
        v-else
    >
      <Note
          :note="note"
          :key="note.id"
          v-for="note in notes"
      />
    </template>
  </div>
</template>

<style scoped>

</style>
