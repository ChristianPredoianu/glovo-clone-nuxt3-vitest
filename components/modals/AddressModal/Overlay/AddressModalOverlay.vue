<script setup lang="ts">
import type { IShippingAddress } from '@/types/locations';

const { user } = useAuth();
const { $database } = useNuxtApp();
const { writeAddressInfo } = useFirebaseAddressActions();
const { writeOrderDetails } = useFirebaseOrderActions();
const { numberOfCartProducts, cartProducts, updatedTotalPrice } = useCart();
const { successMessage, errorMessage } = useMessageHandler();

function handleUpdateShipping(address: IShippingAddress) {
  writeAddressInfo(user.value!.uid, $database, address);
}

function placeOrder() {
  const order = {
    products: cartProducts.value,
    totalPrice: updatedTotalPrice.value,
    numberOfProducts: numberOfCartProducts.value,
  };

  writeOrderDetails(order);
  console.log(order);
}
</script>

<template>
  <ShippingAddressForm @submitForm="handleUpdateShipping" />
  <FormSubmitBtn class="mt-2" @click="placeOrder">Place order</FormSubmitBtn>
  <FormMessage
    :errorMessage="errorMessage || undefined"
    :successMessage="successMessage || undefined"
  />
  {{ successMessage }}
</template>
