<script setup>
import { computed } from "vue";
import { useStoreNotes } from "@/stores/storeNotes";

const { deleteNote } = useStoreNotes();

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

const handleDelete = () => {
  deleteNote( props.note.id )
}
</script>

<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          <small>
            {{ characterLength }}
          </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/edit-note/${note.id}`" class="card-footer-item">Edit</RouterLink>
      <a
          @click.prevent="handleDelete"
          href="#"
          class="card-footer-item"
      >Delete</a>
    </footer>
  </div>
</template>

<style scoped>

</style>
