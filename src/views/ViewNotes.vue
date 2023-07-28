<script setup>
import { ref, watch } from "vue";
import Note from "@/components/Notes/Note.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { storeToRefs } from "pinia";
import AddEditNote from "@/components/Notes/AddEditNote.vue";

const newNote = ref( '' );
const addEditRef = ref( null );

const storeNotes = useStoreNotes();

const { notes } = storeToRefs( storeNotes );
const { addNote } = storeNotes;

const addNoteHandler = () => {
  addNote( newNote.value );
  newNote.value = '';
  addEditRef.value.focusTextarea();
}

watch(newNote, (newValue) => {
  if (newValue.length === 100) {
    alert('Only 100 characters allowed!')
  }
})
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

    <Note
        :note="note"
        :key="note.id"
        v-for="note in notes"
    />
  </div>
</template>

<style scoped>

</style>
