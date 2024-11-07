<script setup lang="ts">
interface DropdownOption<T> {
  options: T[];
  displayKey: keyof T;
  defaultOptionText?: string;
}

const props = defineProps({
  options: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
  displayKey: {
    type: String as PropType<keyof Record<string, any>>,
  },
  defaultOptionText: {
    type: String,
  },
});

const selectedOption = ref<string | null>(null);
const isOpen = ref(false);

const selectDropdownRef = ref<HTMLElement | null>(null);

useClickOutside(selectDropdownRef, () => {
  isOpen.value = false;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

const selectOption = (option: Record<string, any>) => {
  selectedOption.value = option[props.displayKey as keyof typeof option];
  closeDropdown();
};
</script>

<template>
  <div class="relative inline-block text-left" ref="selectDropdownRef">
    <button
      @click="toggleDropdown"
      class="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
    >
      {{ selectedOption || props.defaultOptionText || 'Select an option' }}
      <svg
        class="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06 0L10 10.44l3.71-3.23a.75.75 0 111 1.14l-4.25 3.5a.75.75 0 01-.94 0l-4.25-3.5a.75.75 0 010-1.14z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <div
      v-if="isOpen"
      class="absolute -right-18 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      @click="closeDropdown"
    >
      <div
        class="py-1 max-h-60 overflow-y-auto"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <template v-for="option in props.options" :key="option[props.displayKey]">
          <a
            href="#"
            @click.prevent="selectOption(option)"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            {{ option[props.displayKey as keyof typeof option] }}
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
