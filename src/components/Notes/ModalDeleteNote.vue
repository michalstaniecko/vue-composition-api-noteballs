<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useStoreNotes } from "@/stores/storeNotes";

const { deleteNote }  = useStoreNotes();

const modalRef = ref( null );

const props = defineProps( {
  modelValue: {
    type: Boolean,
    default: false
  },
  noteId: {
    type: String,
    required: true
  }
} );

const emit = defineEmits( [ 'update:modelValue' ] )

const closeModal = () => {
  emit( 'update:modelValue', false )
}

onClickOutside( modalRef, closeModal );

const handleKeyboard = ( e ) => {
  if (e.key === 'Escape') closeModal();
};

onMounted( () => {
  document.addEventListener( 'keyup', handleKeyboard )
} )

onUnmounted( () => {
  document.removeEventListener( 'keyup', handleKeyboard )
} )

const handleDelete = () => {
  deleteNote( props.noteId )
}

</script>

<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button class="delete" aria-label="close" @click.prevent="closeModal"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click.prevent="closeModal">Cancel</button>
        <button class="button is-danger" @click.prevent="handleDelete">Delete</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>

</style>
