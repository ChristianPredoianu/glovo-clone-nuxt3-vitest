<script setup lang="ts">
import { handleEnterKey } from '@/composables/helpers/handleEnterKey';
import useShippingFormValidation from '@/composables/form-validations/useShippingFormValidation';

const address = reactive({
  streetAndHouseNumber: '',
  zipCode: '',
  city: '',
  country: '',
});

const addressUpdateMessage = ref('');

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
const { fetchAddressInfo, writeAddressInfo, errorMessage } = useFirebaseAddressActions();

onMounted(() => {
  watch(
    () => isAuthReady.value,
    (ready) => {
      if (ready) fetchAddressInfo(user.value!.uid, $database, address);
    },
    { immediate: true }
  );
});

async function handleUpdateShipping(e: Event) {
  e.preventDefault();

  const isFormValid = validateAllFields(address);

  if (isFormValid) {
    writeAddressInfo(user.value!.uid, $database, address);
    addressUpdateMessage.value = 'Your address information has been updated';
  }
}

function onKeyDown(e: KeyboardEvent) {
  handleEnterKey(e, handleUpdateShipping);
}
</script>

<template>
  <h1 class="text-2xl font-semibold text-gray-800 my-5">Shipping info</h1>
  <form
    @submit.prevent="handleUpdateShipping"
    @keydown="onKeyDown"
    class="flex flex-col gap-2"
  >
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

    <FormSubmitBtn class="mt-10">Update</FormSubmitBtn>
  </form>
  <p class="text-green-500">{{ addressUpdateMessage }}</p>
</template>
