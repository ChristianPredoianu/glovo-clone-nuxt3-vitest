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
  <div class="flex flex-col gap-1 w-full">
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
      class="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-gray-700 transition-all"
    />
    <p v-if="errorMessage" class="text-red-600 text-xs mt-1">
      {{ errorMessage }}
    </p>
  </div>
</template>
