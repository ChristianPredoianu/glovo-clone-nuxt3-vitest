<script setup lang="ts">
import MyAccountForm from '@/components/forms/MyAccountForm/MyAccountForm.vue';
import ShippingAddressForm from '@/components/forms/ShippingAddressForm/ShippingAddressForm.vue';

const currentComponent = ref<typeof MyAccountForm | typeof MyAccountForm>(
  markRaw(MyAccountForm)
);

const componentMap: Record<string, typeof MyAccountForm | typeof ShippingAddressForm> = {
  MyAccountForm: MyAccountForm,
  ShippingAddressForm: ShippingAddressForm,
};

function handleChangeComponent(menuComponent: string) {
  const component = componentMap[menuComponent];

  if (component) {
    currentComponent.value = markRaw(component);
  }
}
</script>

<template>
  <div class="container min-h-screen mx-auto px-4 py-8">
    <!-- Main Content Area -->
    <div class="flex flex-col mt-10 lg:flex-row gap-8">
      <!-- Profile and Account Menu Section (Grouped) -->
      <div class="flex flex-col gap-6 lg:w-1/4 mb-6 lg:mb-0">
        <div class="flex lg:justify-start">
          <Profile />
        </div>
        <div class="flex justify-center lg:justify-start">
          <AccountMenu @changeComponent="handleChangeComponent" class="w-full" />
        </div>
      </div>

      <!-- Dynamic Content Section (Current Component) -->
      <div class="flex-1 bg-white shadow-xl rounded-lg p-8 border border-gray-200">
        <!-- Title for current section -->
        <h2 class="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
          Your Account
        </h2>

        <!-- Dynamic Component Section -->
        <component :is="currentComponent" />
      </div>
    </div>
  </div>
</template>

<!-- <template>
  <div class="min-h-screen flex items-center bg-red-500 container mx-auto px-4">
    <section class="bg-blue-500 w-full flex flex-col lg:flex-row justify-center">
      <div class="w-full lg:w-1/3">
        <div class="w-full mb-4">
          <Profile />
        </div>
        <div class="w-full lg:w-4/5">
          <AccountMenu @changeComponent="handleChangeComponent" />
        </div>
      </div>
      <div class="w-full lg:w-2/3 px-4 lg:px-8 py-4 bg-white shadow-lg rounded-lg">
        <component :is="currentComponent" />
      </div>
    </section>
  </div>
</template> -->
