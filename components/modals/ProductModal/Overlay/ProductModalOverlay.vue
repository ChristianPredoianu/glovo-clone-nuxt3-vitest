<script setup lang="ts">
import { replaceRecipeText } from '@/helpers/helpers';
import type { ModalProps, IMealModalProps } from '@/interfaces/interfaces.interface';

const props = defineProps<{ productModalProps: ModalProps | null }>();

const emits = defineEmits(['closeModal']);

const { addToCart } = useCart();
const { isBarActive } = useProgressBar();

const product = computed(() => {
  if (!props.productModalProps) return null;

  return {
    id: props.productModalProps.id,
    label: props.productModalProps.label,
    img: props.productModalProps.img,
    price: props.productModalProps.price,
  };
});

const isMealModalProps = (props: ModalProps | null): props is IMealModalProps => {
  return props !== null && 'ingredients' in props;
};
</script>

<template>
  <section
    v-if="productModalProps"
    class="container relative mx-auto p-10 flex flex-col overflow-auto"
  >
    <div class="mx-auto relative overflow-hidden w-full max-w-[500px] aspect-[16/9]">
      <img
        :src="props.productModalProps!.img"
        :alt="props.productModalProps!.label"
        class="rounded-lg object-cover w-full h-full"
      />
    </div>
    <h3 class="text-xl font-semibold text-gray-700 py-4">
      {{ replaceRecipeText(props.productModalProps!.label) }}
    </h3>
    <h4 class="text-red-500 font-semibold text-2xl mb-8">
      {{ productModalProps.price }} $
    </h4>
    <div
      v-if="isMealModalProps(props.productModalProps)"
      class="mt-2 mb-8 gap-2 text-gray-500"
    >
      <ProductModalList :ingredients="props.productModalProps!.ingredients" />
    </div>
    <CtaBtn :textCol="'text-gray-200'" @click="addToCart(product)"
      >Add to cart {{ props.productModalProps!.price }} $</CtaBtn
    >
    <div class="h-4">
      <transition name="fade" mode="out-in">
        <div class="mt-4 w-full overflow-hidden" v-show="isBarActive">
          <ProgressBar />
        </div>
      </transition>
    </div>
  </section>
</template>
