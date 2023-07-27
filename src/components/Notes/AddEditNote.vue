<script setup>
import {computed} from "vue";

const props = defineProps( {
  modelValue: {
    type: String,
    required: true
  }
} )

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="card has-background-success-dark p-4 mb-5">
    <div class="field">
      <div class="control">
          <textarea
              v-model="value"
              @input="$emit('update:modelValue', value)"
              ref="newNoteRef"
              class="textarea"
              placeholder="Add a new note"
          ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
