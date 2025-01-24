<script setup lang="ts">
const { numberOfCartProducts, updatedTotalPrice } = useCart();
defineEmits(['closeModal']);

const { user } = useAuth();
const { openModal, closeModal } = useModal();

const orderText = computed(() => {
  return `Order ${numberOfCartProducts.value} for ${updatedTotalPrice.value} $`;
});

function placeOrder() {
  closeModal();

  !user.value ? openModal('signin') : openModal('addressModal');
}
</script>

<template>
  <section
    class="container mx-auto flex flex-col items-center justify-center gap-10 p-10"
  >
    <h3 class="text-xl font-bold">Your order</h3>
    <div
      class="flex flex-col items-center justify-center gap-10"
      v-if="numberOfCartProducts === 0"
    >
      <img src="@/public/empty-cart.svg" alt="empty cart" class="max-w-xs max-h-48" />
      <h4 data-test="test" class="text-lg text-center font-semibold">
        You've not added any products yet. When you do, you'll see them here!
      </h4>
    </div>
    <div class="w-full flex flex-col items-center justify-center gap-2" v-else>
      <CartModalList />
    </div>
    <CtaBtn :textCol="'text-gray-200'" v-if="numberOfCartProducts" @click="placeOrder">{{
      orderText
    }}</CtaBtn>
  </section>
</template>
