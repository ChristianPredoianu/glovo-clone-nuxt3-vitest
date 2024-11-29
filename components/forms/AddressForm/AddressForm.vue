<script setup lang="ts">
import type { IDropdownOptions } from '@/interfaces/interfaces.interface';
import type { ILocationAdress } from '@/interfaces/interfaces.interface';
import SearchLocationDropdown from '~/components/ui/Dropdown/SearchLocationDropdown/SearchLocationDropdown.vue';

const props = defineProps({
  options: {
    type: Array as PropType<IDropdownOptions[]>,
    required: true,
  },
  idKey: {
    type: String,
    required: true,
  },
  textKey: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(['emitInput', 'emitOption', 'emitLocation']);

let locationAdress: ILocationAdress | null = null;

const inputText = ref<string>('');

const locationIconRef = ref<HTMLInputElement | null>(null);
const locationTextRef = ref<HTMLSpanElement | null>(null);

const { latitude, longitude, getLocation } = useGeolocation();
const { isLoaded } = useIsLoaded();
const { locationReverseEndpoint } = useEndpoints();

const { data } = await useFetch<ILocationAdress>(
  () =>
    `${locationReverseEndpoint.value}&q&lat=${latitude.value}&lon=${longitude.value}&format=json`
);

function handleInputElements() {
  if (inputText) {
    inputText.valueOf.length > 20;
    if (inputText.value.length > 20) {
      locationIconRef.value?.classList.add('md:hidden');
      locationTextRef.value?.classList.add('md:hidden');
    } else {
      locationIconRef.value?.classList.remove('md:hidden');
      locationTextRef.value?.classList.remove('md:hidden');
    }
  }
}

function getUserLocation() {
  getLocation();
  inputText.value = '';
}

function handleClearInput() {
  inputText.value = '';
}

function handleEmmitedOption(option: number) {
  if (option) emits('emitOption', option);
}

function handleOnChange() {
  handleInputElements();
  emits('emitInput', inputText.value);
}

watch(
  () => data.value,
  (newValue: ILocationAdress | null) => {
    if (newValue) {
      locationAdress = newValue;
      emits('emitLocation', locationAdress);
    }
  }
);
</script>

<template class="dsadsadas">
  <div data-test="dsa" class="dsa">
    <span
      class="h-full bg-green-500 absolute rounded-l-md top-0 px-3 flex items-center cursor-pointer"
      @click="getUserLocation"
    >
      <font-awesome-icon v-if="isLoaded" :icon="['fas', 'location']" />
    </span>
    <input
      data-test="input-t"
      type="text"
      placeholder="What's your address?"
      class="py-3 px-12 w-full rounded-md"
      v-model="inputText"
      @input="handleOnChange"
    />
    <span
      class="location-icon hidden md:block"
      ref="locationIconRef"
      data-testid="address"
    >
      <font-awesome-icon
        v-if="isLoaded"
        :icon="['fas', 'location-arrow']"
        class="absolute top-2 translate-x-1/2 left-50 bg-slate-200 p-2 rounded-2xl cursor-pointer"
        @click="getUserLocation"
      />
    </span>
    <span
      class="location-text hidden text-sm text-green-600 font-bold md:block location-text absolute top-3.5 translate-x-1/2 right-20 cursor-pointer"
      ref="locationTextRef"
      @click="getUserLocation"
      >Use current location</span
    >
  </div>
  <SearchLocationDropdown
    v-if="props.options"
    :options="props.options"
    textKey="text"
    idKey="id"
    @emit-option="handleEmmitedOption"
    @clear-input="handleClearInput"
  />
</template>
