<script setup lang="ts">
const numberKey = useState('numberKey', () => 0);

const { numberOfCartProducts } = useCart();

watch(numberOfCartProducts, (newCount, oldCount) => {
  if (newCount !== oldCount) numberKey.value++;
});
</script>

<template>
  <div class="h-8 w-10 flex justify-center">
    <transition name="fade" mode="out-in">
      <p
        class="bg-green-700 w-8 h-8 flex items-center justify-center text-white rounded-full text-center text-sm"
      >
        <transition name="fade" mode="out-in">
          <span :key="numberKey"> {{ numberOfCartProducts }}</span></transition
        >
      </p>
    </transition>
  </div>
</template>
