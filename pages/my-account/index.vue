<script setup lang="ts">
import MyAccountForm from '@/components/forms/MyAccountForm/MyAccountForm.vue';
import ShippingAddressForm from '@/components/forms/ShippingAddressForm/ShippingAddressForm.vue';
import DeleteAccount from '@/components/ui/DeleteAccount/DeleteAccount.vue';
import MyOrders from '@/components/sections/OrdersListSection/OrdersListSection.vue';
import type { IShippingAddress } from '@/types/locations';

const componentMap: Record<
  string,
  | typeof MyAccountForm
  | typeof ShippingAddressForm
  | typeof MyOrders
  | typeof DeleteAccount
> = {
  MyAccountForm,
  ShippingAddressForm,
  MyOrders,
  DeleteAccount,
};

const { changeComponent, currentComponent } = useDynamicComponent(MyAccountForm);
const { user } = useAuth();
const { $database } = useNuxtApp();
const { writeAddressInfo } = useFirebaseAddressActions();

function handleChangeComponent(menuComponent: string) {
  console.log('Changing component to:', menuComponent);
  changeComponent(menuComponent, componentMap);
}

function handleUpdateShipping(address: IShippingAddress) {
  writeAddressInfo(user.value!.uid, $database, address);
}
</script>

<template>
  <div class="container min-h-screen mx-auto px-4 py-8">
    <div class="flex flex-col mt-10 lg:flex-row gap-8">
      <div class="flex flex-col gap-6 lg:w-1/4 mb-6 lg:mb-0">
        <div class="flex lg:justify-start">
          <Profile />
        </div>
        <div class="flex justify-center lg:justify-start">
          <AccountMenu @changeComponent="handleChangeComponent" class="w-full" />
        </div>
      </div>

      <div class="flex-1 bg-white h-dvh shadow-xl rounded-lg p-8 border border-gray-200">
        <h1 class="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
          Your Account
        </h1>
        <component
          :is="currentComponent"
          @="
            currentComponent === ShippingAddressForm
              ? { submitForm: handleUpdateShipping }
              : {}
          "
        />
      </div>
    </div>
  </div>
</template>
