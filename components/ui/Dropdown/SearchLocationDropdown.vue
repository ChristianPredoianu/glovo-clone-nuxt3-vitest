<script setup lang="ts">
import type { IDropdownOptions } from '@/interfaces/interfaces.interface';

const props = defineProps<{
  options: IDropdownOptions[];
  idKey: keyof IDropdownOptions;
  textKey: keyof IDropdownOptions;
}>();

const emits = defineEmits(['emitOption', 'clearInput']);

const isOpen = useState<boolean>('isOpen', () => true);

const optionsLength = computed(() => props.options.length);

const { selectedIndex } = useKeyDown(optionsLength, selectOption);

const dropdownRef = ref<HTMLElement | null>(null);

useClickOutside(dropdownRef, () => {
  isOpen.value = false;
});

useCloseElementOnEscape(() => {
  isOpen.value = false;
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(index: number) {
  const option = props.options[index];
  isOpen.value = false;
  emits('emitOption', option);
  emits('clearInput');
}

//The API sometimes returns two of the same adresses, this creates unique returns
//so that we don't get duplicate keys when looping through props.options
const uniqueOptions = computed(() => {
  const uniqueOptionsMap = new Map(
    props.options.map((option) => [option[props.idKey], option])
  );
  return Array.from(uniqueOptionsMap.values());
});

watch(
  () => props.options,
  () => {
    isOpen.value = true;
  }
);
</script>

<template>
  <div class="relative z-10" @click="toggleDropdown">
    <div
      class="absolute top-full mt-1 w-full bg-white shadow-md rounded-md"
      ref="dropdownRef"
      @click.stop
      v-if="isOpen"
    >
      <ul>
        <li
          v-for="(option, index) in uniqueOptions"
          :key="option[props.idKey]"
          class="py-2 px-4 hover:bg-green-100 cursor-pointer"
          :class="{ 'bg-green-200 text-grey-700': index === selectedIndex }"
          @click="selectOption(index)"
        >
          {{ option[props.textKey] }}
        </li>
      </ul>
    </div>
  </div>
</template>
