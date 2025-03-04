<script setup lang="ts">
import { handleEnterKey } from '@/composables/helpers/handleEnterKey';
import useShippingFormValidation from '@/composables/form-validations/useShippingFormValidation';
import { hasEmptyFields } from '@/composables/helpers/hasEmptyFields';
import {
  successMessage,
  errorMessage,
} from '@/composables/firebase/store/messagehandlerStore';

const emit = defineEmits(['submitForm', 'emitFields']);

const address = reactive({
  streetAndHouseNumber: '',
  zipCode: '',
  city: '',
  country: '',
});

const emptyFields = ref(false);

const { isAuthReady } = useAuth();
const { user } = useAuth();
const { $database } = useNuxtApp();
const {
  validateStreetAndHouseNumber,
  validateEuropeanZipCode,
  validateCityOrCountry,
  validateAllFields,
  errors,
} = useShippingFormValidation();
const { fetchAddressInfo } = useFirebaseAddressActions();

const hasEmptyAddressFields = computed(() => hasEmptyFields(address));

function onKeyDown(e: KeyboardEvent) {
  handleEnterKey(e, handleSubmit);
}

function handleSubmit(e: Event) {
  e.preventDefault();
  const isFormValid = validateAllFields(address);

  if (isFormValid) emit('submitForm', address);
}

onMounted(() => {
  emptyFields.value = hasEmptyFields(address);
  emit('emitFields', emptyFields.value);
  watch(
    () => isAuthReady.value,
    (ready) => {
      if (ready) fetchAddressInfo(user.value!.uid, $database, address);
    },
    { immediate: true }
  );
});

watch(hasEmptyAddressFields, (newValue, oldValue) => {
  emptyFields.value = newValue;
  emit('emitFields', newValue);
});
</script>

<template>
  <h2 class="text-xl font-semibold text-gray-800 my-5">Shipping info</h2>
  <form @submit.prevent="handleSubmit" @keydown="onKeyDown" class="flex flex-col gap-2">
    <TextInput
      label="Street and house number"
      name="street"
      v-model="address.streetAndHouseNumber"
      placeholder="Street and house number"
      autocomplete="address-line1"
      @blur="validateStreetAndHouseNumber(address.streetAndHouseNumber)"
    />
    <p v-if="errors.streetAndHouseNumber" class="text-red-600 text-xs mt-1">
      {{ errors.streetAndHouseNumber }}
    </p>

    <TextInput
      label="Zip code"
      name="zip code"
      v-model="address.zipCode"
      placeholder="Zip code"
      autocomplete="postal-code"
      @blur="validateEuropeanZipCode(address.zipCode)"
    />
    <p v-if="errors.zipCode" class="text-red-600 text-xs mt-1">
      {{ errors.zipCode }}
    </p>

    <TextInput
      label="City"
      name="city"
      v-model="address.city"
      placeholder="City"
      autocomplete="address-level2"
      @blur="validateCityOrCountry(address.city, 'city')"
    />
    <p v-if="errors.city" class="text-red-600 text-xs mt-1">
      {{ errors.city }}
    </p>

    <TextInput
      label="Country"
      name="country"
      v-model="address.country"
      placeholder="Country"
      autocomplete="country"
      @blur="validateCityOrCountry(address.country, 'country')"
    />
    <p v-if="errors.country" class="text-red-600 text-xs mt-1">
      {{ errors.country }}
    </p>
    <FormMessage
      :errorMessage="errorMessage || undefined"
      :successMessage="successMessage || undefined"
    />
    <FormSubmitBtn class="mt-4">Update</FormSubmitBtn>
  </form>
</template>
