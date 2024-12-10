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
  <section
    class="container mx-auto px-4 sm:flex sm:flex-col py-10 sm:items-center lg:items-start"
  >
    <Profile />
    <AccountMenu @changeComponent="handleChangeComponent" />
  </section>

  <section>
    <component :is="currentComponent" />
  </section>
</template>
