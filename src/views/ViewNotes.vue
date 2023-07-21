<script setup>
import { ref } from "vue";
import Note from "@/components/Notes/Note.vue";

const newNote = ref( '' );

const newNoteRef = ref( null );

const notes = ref( [
  {
    id: 'id1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda atque deserunt earum eum inventore officia quaerat soluta ullam vel. Dolore facere fugit itaque laboriosam maxime quis ratione soluta tenetur. Beatae'
  },
  {
    id: 'id2',
    content: 'shorter notes'
  }
] );

const addNote = () => {
  const currentDate = new Date().getTime()
  const id = currentDate.toString();
  const note = {
    id,
    content: newNote.value
  }
  notes.value.unshift( note );
  newNote.value = '';
  newNoteRef.value.focus();
}

const deleteNote = (id) => {
  notes.value = notes.value.filter(note => note.id !== id);
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
              @click="addNote" class="button is-link has-background-success"
          >Add New Note
          </button>
        </div>
      </div>
    </div>

    <Note
        :note="note"
        :key="note.id"
        v-for="note in notes"
        @deleteClicked="deleteNote"
    />
  </div>
</template>

<style scoped>

</style>
