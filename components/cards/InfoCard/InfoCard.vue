<script setup lang="ts">
import type { IInfoCardProps } from '@/types';

const props = defineProps({
  card: {
    type: Object as PropType<IInfoCardProps>,
    required: true,
  },
});

const { isLoaded } = useIsLoaded();
</script>

<template>
  <div class="flex justify-around">
    <article
      class="flex flex-col items-center gap-4 py-8 md:px-12 h-full w-1/2 md:w-full text-center"
    >
      <font-awesome-icon
        v-if="isLoaded"
        :icon="['fas', props.card.icon]"
        data-test="fa-icon"
        class="text-7xl text-orange-400"
      />
      <h3 class="flex-grow text-xl font-bold">{{ props.card.heading }}</h3>
      <p class="flex-grow lg:px-10">
        {{ props.card.paragraph
        }}<span class="bg-orange-400 font-medium rounded-md px-2 py-1">{{
          props.card.span
        }}</span>
      </p>
    </article>
  </div>
</template>
