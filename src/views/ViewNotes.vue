<script setup>
import { ref } from "vue";
import Note from "@/components/Notes/Note.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { storeToRefs } from "pinia";

const newNote = ref( '' );

const newNoteRef = ref( null );

const storeNotes = useStoreNotes();

const { notes } = storeToRefs( storeNotes );
const { addNote } = storeNotes;

const addNoteHandler = () => {
  addNote( newNote.value );
  newNote.value = '';
  newNoteRef.value.focus();
}
</script>

<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
              ref="newNoteRef"
              v-model="newNote"
              class="textarea"
              placeholder="Add a new note"
          ></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
              :disabled="!newNote"
              @click="addNoteHandler" class="button is-link has-background-success"
          >Add New Note
          </button>
        </div>
      </div>
    </div>

    <Note
        :note="note"
        :key="note.id"
        v-for="note in notes"
    />
  </div>
</template>

<style scoped>

</style>
