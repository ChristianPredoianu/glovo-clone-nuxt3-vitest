<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  label: String,
  name: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  errorMessage: String,
  autocomplete: String,
});

const emit = defineEmits(['update:modelValue', 'blur']);

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;

  if (target) emit('update:modelValue', target.value);
}
</script>

<template>
  <label :for="name" class="text-sm font-medium text-gray-700">{{ label }}</label>
  <input
    :id="name"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :value="modelValue"
    @input="handleInput"
    @blur="$emit('blur')"
    class="w-full border-0 border-b-2 border-gray-300 py-2 px-1 mb-2"
  />
  <p v-if="errorMessage" class="text-red-600 text-xs mt-1 h-4">
    {{ errorMessage }}
  </p>
</template>
