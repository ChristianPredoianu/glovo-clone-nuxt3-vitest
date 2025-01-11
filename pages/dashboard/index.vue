<script setup lang="ts">
import OrdersList from '~/components/lists/OrdersList/OrdersList.vue';

import ItemFavoritesListSection from '~/components/sections/ItemFavoritesListSection/ItemFavoritesListSection.vue';

const { isLoading } = useFirebaseFavoriteItemActions();
const { isAuthReady } = useAuth();
const { closeModal } = useModal();
const { currentModalProps } = useModalProps();
const { currentComponent, changeComponent } = useDynamicComponent(
  ItemFavoritesListSection
);

const componentMap: Record<string, typeof ItemFavoritesListSection | typeof OrdersList> =
  {
    ItemFavoritesListSection,
    OrdersList,
  };

function handleChangeComponent(menuComponent: string) {
  changeComponent(menuComponent, componentMap);
}
</script>

<template>
  <Modal modalName="productModal">
    <ProductModalOverlay
      :productModalProps="currentModalProps"
      @closeModal="closeModal"
    />
  </Modal>
  <div v-if="isAuthReady" class="min-h-screen">
    <LoadingSpinner v-if="isLoading" />
    <div class="min-h-screen container mx-auto px-4 py-4">
      <BackBtn :page="'/'" class="mb-4" />
      <section
        class="flex flex-col gap-y-4 items-center md:gap-y-6 lg:flex-row lg:justify-between bg-white p-4 rounded-xl"
      >
        <Profile />
        <SearchBar />
      </section>
      <DashboardMenu @changeComponent="handleChangeComponent" />
      <component :is="currentComponent" />
    </div>
  </div>
</template>
