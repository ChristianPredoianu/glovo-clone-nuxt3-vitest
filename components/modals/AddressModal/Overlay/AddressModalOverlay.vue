<script setup lang="ts">
import { DELAY } from '@/composables/firebase/useMessageHandler';
import type { IShippingAddress } from '@/types';

const { user } = useAuth();
const { $database } = useNuxtApp();
const { writeAddressInfo } = useFirebaseAddressActions();
const { writeOrderDetails } = useFirebaseOrderActions();
const { numberOfCartProducts, cartProducts, updatedTotalPrice } = useCart();
const { closeModal } = useModal();

const address = ref<IShippingAddress>({
  streetAndHouseNumber: '',
  zipCode: '',
  city: '',
  country: '',
});

const hasEmptyFields = ref(false);

function handleUpdateShipping(address: IShippingAddress) {
  writeAddressInfo(user.value!.uid, $database, address);
}

function emittedFields(value: boolean) {
  hasEmptyFields.value = value;
}

async function placeOrder() {
  const order = {
    products: cartProducts.value,
    totalPrice: updatedTotalPrice.value,
    numberOfProducts: numberOfCartProducts.value,
  };

  await writeOrderDetails(order);

  cartProducts.value = [];

  setTimeout(() => {
    closeModal();
  }, DELAY);
  console.log(order);
}
</script>

<template>
  <ShippingAddressForm @submitForm="handleUpdateShipping" @emitFields="emittedFields" />
  <FormSubmitBtn :disabled="hasEmptyFields" class="mt-2" @click="placeOrder"
    >Place order</FormSubmitBtn
  >
</template>
