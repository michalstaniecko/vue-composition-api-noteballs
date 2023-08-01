<script setup>
import { computed, onMounted, reactive } from "vue";
import ModalDeleteNote from "@/components/Notes/ModalDeleteNote.vue";
import {useDateFormat} from "@vueuse/core";

const props = defineProps( {
  note: {
    type: Object,
    required: true
  }
} )

const characterLength = computed( () => {
  const length = props.note.content.length
  const description = length > 1 ? 'characters' : 'character';
  return `${ length } ${ description }`;
} )

const modals = reactive( {
  deleteNote: false
} );

const dateFormatted = computed(() => {
  const date = new Date(parseInt(props.note.date));
  const formatted = useDateFormat(date, 'YYYY-MM-DD @ HH:mm');
  return formatted.value;
})

</script>

<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">
            {{ dateFormatted }}
          </small>
          <small class="column has-text-right">
            {{ characterLength }}
          </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/edit-note/${note.id}`" class="card-footer-item">Edit</RouterLink>
      <a
          @click.prevent="modals.deleteNote = true"
          href="#"
          class="card-footer-item"
      >Delete</a>
    </footer>
    <ModalDeleteNote
        :noteId="note.id"
        v-if="modals.deleteNote"
        v-model="modals.deleteNote"
    />
  </div>
</template>

<style scoped>

</style>
