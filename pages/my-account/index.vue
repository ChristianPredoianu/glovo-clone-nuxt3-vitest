<script setup lang="ts">
import MyAccountForm from '@/components/forms/MyAccountForm/MyAccountForm.vue';
import BillingAddressForm from '~/components/forms/BillingAddressForm/BillingAddressForm.vue';

const currentComponent = ref<typeof MyAccountForm | typeof BillingAddressForm>(
  markRaw(MyAccountForm)
);

const componentMap: Record<string, typeof MyAccountForm | typeof BillingAddressForm> = {
  MyAccountForm: MyAccountForm,
  BillingAddressForm: BillingAddressForm,
};

function handleChangeComponent(menuComponent: string) {
  const component = componentMap[menuComponent];

  if (component) {
    currentComponent.value = markRaw(component);
  }
}
</script>

<template>
  <div class="min-h-screen flex justify-center items-center mx-auto px-4">
    <section class="w-full lg:w-4/5 xl:w-3/5 flex flex-col lg:flex-row gap-10">
      <div class="w-full lg:w-1/3 flex flex-col items-center lg:items-start">
        <div class="w-full mb-4">
          <Profile />
        </div>
        <div class="w-full lg:w-4/5">
          <AccountMenu @changeComponent="handleChangeComponent" />
        </div>
      </div>
      <div
        class="w-full lg:w-2/3 flex flex-col px-4 lg:px-8 py-4 bg-white shadow-lg rounded-lg"
      >
        <component :is="currentComponent" />
      </div>
    </section>
  </div>
</template>
