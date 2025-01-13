<script setup lang="ts">
import type { IShippingAddress } from '@/types/locations';

const { user } = useAuth();
const { $database } = useNuxtApp();
const { writeAddressInfo } = useFirebaseAddressActions();

function handleUpdateShipping(address: IShippingAddress){
  writeAddressInfo(user.value!.uid, $database, address);
}
</script>

<template>
  <ShippingAddressForm @submitForm ="handleUpdateShipping"/>
  <FormSubmitBtn class="mt-2">Place order</FormSubmitBtn>
</template>
