<script setup lang="ts">
const props = defineProps({
  icon: String,
  heading: String,
  paragraph: String,
  span: String,
});

const isLoaded = ref(false);

onMounted(() => {
  isLoaded.value = true;
});
</script>

<template>
  <div class="flex justify-around">
    <article
      class="flex flex-col items-center gap-4 py-8 md:px-12 h-full w-1/2 md:w-full text-center"
    >
      <font-awesome-icon
        v-if="isLoaded"
        :icon="['fas', props.icon]"
        data-test="fa-icon"
        class="text-7xl text-orange-400"
      />
      <h3 class="flex-grow text-xl font-bold">{{ props.heading }}</h3>
      <p class="flex-grow lg:px-10">
        {{ props.paragraph
        }}<span class="bg-orange-400 font-medium rounded-md px-2 py-1">{{
          props.span
        }}</span>
      </p>
    </article>
  </div>
</template>
