<script setup>
import {ref} from "vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { vAutofocus } from "@/directives/vAutofocus";
import {useWatchCharacters} from "@/use/useWatchCharacters";

const storeNotes = useStoreNotes();

const inquiry = ref('');

useWatchCharacters(inquiry)

</script>

<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
      <tr>
        <th>Stat</th>
        <th>Value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Number of notes</td>
        <td>{{ storeNotes.totalNotesCount }}</td>
      </tr>
      <tr>
        <td>Number of characters (of all notes)</td>
        <td>{{ storeNotes.totalCharactersCount }}</td>
      </tr>
      </tbody>
    </table>
    <input
        v-model="inquiry"
        v-autofocus
        class="input"
        type="text"
        placeholder="Do you love noteballs?"
    />
  </div>
</template>

<style scoped>

</style>
