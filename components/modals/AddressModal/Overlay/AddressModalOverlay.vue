<script setup lang="ts">
import {
  successMessage,
  errorMessage,
} from '@/composables/firebase/store/messagehandlerStore';
import { DELAY } from '@/composables/firebase/useMessageHandler';
import type { IShippingAddress } from '@/types/locations';

const { user } = useAuth();
const { $database } = useNuxtApp();
const { writeAddressInfo } = useFirebaseAddressActions();
const { writeOrderDetails } = useFirebaseOrderActions();
const { numberOfCartProducts, cartProducts, updatedTotalPrice } = useCart();
const { closeModal } = useModal();

function handleUpdateShipping(address: IShippingAddress) {
  writeAddressInfo(user.value!.uid, $database, address);
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
  <ShippingAddressForm @submitForm="handleUpdateShipping" />
  <FormSubmitBtn class="mt-2" @click="placeOrder">Place order</FormSubmitBtn>
</template>
