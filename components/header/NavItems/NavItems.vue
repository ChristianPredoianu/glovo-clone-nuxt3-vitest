<script setup lang="ts">
const { screenWidth } = useScreenWidth();
const { closeNav } = useNav();
const { closeBackdrop } = useBackdrop();

function closeNavigationDialog() {
  closeNav();
  closeBackdrop();
}
</script>

<template>
  <div class="flex flex-col h-full gap-8 container px-4 mx-auto">
    <font-awesome-icon
      class="absolute top-6 right-6 cursor-pointer"
      data-test="fa-arrow-left"
      :icon="['fas', 'arrow-left']"
      size="xl"
      v-if="screenWidth < 640"
      @click="closeNavigationDialog"
    />
    <div v-if="screenWidth < 640" class="border-b-2 flex mt-40">
      <h1
        class="pb-2 text-md"
        :class="{
          'text-xs': screenWidth < 200,
        }"
      >
        <span class="text-green-500">Connect</span>
        | New Account
      </h1>
    </div>
    <NavList />
  </div>
</template>
