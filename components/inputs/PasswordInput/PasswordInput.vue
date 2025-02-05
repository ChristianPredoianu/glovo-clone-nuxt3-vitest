<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  label: String,
  name: String,
  placeholder: String,
  errorMessage: String,
  autocomplete: String,
  required: Boolean,
  type: {
    type: String,
    default: 'password',
  },
});

const emit = defineEmits(['update:modelValue', 'blur']);

const inputField = ref<HTMLInputElement | null>(null);

const togglePasswordVisibility = () => {
  if (inputField.value) 
    inputField.value.type = inputField.value.type === 'password' ? 'text' : 'password';
  
};

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    emit('update:modelValue', target.value);
  }
}
</script>

<template>
  <div class="flex flex-col">
    <label :for="name" class="text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="relative">
      <input
        :id="name"
        :name="name"
        :type="type"
        v-bind="$attrs"
        :value="modelValue"
        @input="handleInput"
        @blur="$emit('blur')"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :required="required"
        ref="inputField"
        class="w-full border-0 border-b-2 border-gray-300 py-2 px-1 mt-1"
      />

      <button
        type="button"
        @click="togglePasswordVisibility"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        <span v-if="type === 'password'">Show</span>
        <span v-if="type === 'text'">Hide</span>
      </button>
    </div>
    <p v-if="errorMessage" class="text-red-600 text-xs mt-1 h-4">
      {{ errorMessage }}
    </p>
  </div>
</template>
