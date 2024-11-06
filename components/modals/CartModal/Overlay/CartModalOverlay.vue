<script setup lang="ts">
const { numberOfCartProducts, updatedTotalPrice } = useCart();

const orderText = computed(() => {
  return `Order ${numberOfCartProducts.value} for ${updatedTotalPrice.value} $`;
});
</script>

<template>
  <section
    class="container mx-auto flex flex-col items-center justify-center gap-10 p-10"
  >
    <h3 class="text-xl font-bold">Your order</h3>
    <div
      class="flex flex-col items-center justify-center gap-10"
      v-if="!numberOfCartProducts"
    >
      <img src="@/public/empty-cart.svg" alt="empty cart" class="max-w-xs max-h-48" />
      <h4 class="text-lg text-center font-semibold">
        You've not added any products yet. When you do, you'll see them here!
      </h4>
    </div>
    <div class="w-full flex flex-col items-center justify-center gap-2" v-else>
      <CartModalList />
    </div>
    <CtaBtn :textCol="'text-gray-200'" v-if="numberOfCartProducts">{{
      orderText
    }}</CtaBtn>
  </section>
</template>
