<script setup>
import { computed, ref } from "vue";
import { vAutofocus } from "@/directives/vAutofocus";

const textareaRef = ref( null );

const props = defineProps( {
  modelValue: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    default: 'success'
  },
  placeholder: {
    type: String,
    default: 'Type something...'
  },
  label: {
    type: String
  }
} )

const emit = defineEmits( [ 'update:modelValue' ] )

const value = computed( {
  get: () => props.modelValue,
  set: ( value ) => emit( 'update:modelValue', value )
} )

const focusTextarea = () => {
  textareaRef.value.focus();
}

defineExpose( {
  focusTextarea
} );

</script>

<template>
  <div
      :class="`has-background-${bgColor}-dark`"
      class="card p-4 mb-5"
  >
    <label v-if="label" class="label has-text-white">
      {{ label }}
    </label>
    <div class="field">
      <div class="control">
          <textarea
              v-autofocus
              v-model="value"
              ref="textareaRef"
              class="textarea"
              :placeholder="placeholder"
              maxlength="100"
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
