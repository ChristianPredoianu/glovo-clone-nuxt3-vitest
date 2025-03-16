<script setup lang="ts">
import { replaceRecipeText } from '@/composables/helpers/replaceRecipeText';

import type { IMealModalProps } from '@/types/meals';
import type { ModalProps } from '@/types/ui';

const props = defineProps<{ productModalProps: ModalProps | null }>();

const emits = defineEmits(['closeModal']);

const { addToCart } = useCart();
const { startProgressBar, progressWidth, isBarActive } = useProgressBar();

const product = computed(() => {
  if (!props.productModalProps) return null;

  return {
    id: props.productModalProps.id,
    label: props.productModalProps.label,
    img: props.productModalProps.img,
    price: props.productModalProps.price,
  };
});

function handleAddToCart(product: IMealModalProps) {
  startProgressBar();
  addToCart(product);
}

function isMealModalProps(props: ModalProps | null): props is IMealModalProps {
  return props !== null && 'ingredients' in props;
}
</script>

<template>
  <article
    v-if="productModalProps"
    class="container h-full mx-auto p-6 md:p-10 flex flex-col flex-grow overflow-auto"
  >
    <div
      class="mx-auto relative overflow-hidden w-full max-w-[500px] aspect-[16/9] rounded-lg shadow-lg flex-shrink-0"
    >
      <img
        :src="props.productModalProps!.img"
        :alt="props.productModalProps!.label"
        class="object-cover w-full h-full"
      />
    </div>

    <div class="mt-6 text-center md:text-left flex flex-col flex-grow">
      <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">
        {{ replaceRecipeText(props.productModalProps!.label) }}
      </h3>
      <p class="text-xl md:text-2xl font-semibold text-green-600 mb-6">
        {{ productModalProps.price }} $
      </p>

      <div
        v-if="isMealModalProps(props.productModalProps)"
        class="mt-4 mb-8 text-gray-600 flex-grow"
      >
        <ProductModalList :ingredients="props.productModalProps!.ingredients" />
      </div>

      <div class="flex-shrink-0">
        <CtaBtn
          class="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300"
          @click="handleAddToCart(product as IMealModalProps)"
        >
          Add to cart {{ props.productModalProps!.price }} $
        </CtaBtn>
      </div>

      <div class="h-4 mt-6 flex-shrink-0">
        <transition name="fade" mode="out-in">
          <div class="w-full overflow-hidden" v-show="isBarActive">
            <ProgressBar :progressWidth="progressWidth" />
          </div>
        </transition>
      </div>
    </div>
  </article>
</template>
