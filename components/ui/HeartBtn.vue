<script setup lang="ts">
import type { IItem } from '@/interfaces/interfaces.interface';

const props = defineProps({
  mealItem: {
    type: Object as PropType<IItem>,
    required: true,
  },
});

const { user } = useAuth();
const { writeFavoriteUserItemData, fetchFavoriteStatus } = useFirebaseActions();
const { openModal } = useModal();
const { isLoaded } = useIsLoaded();

const isFavorite = ref<boolean>(false);

async function toggleFavorite() {
  if (!user.value) {
    openModal('signIn');
    return;
  }
  isFavorite.value = !isFavorite.value;
  console.log(props.mealItem);
  await writeFavoriteUserItemData(props.mealItem as IItem);
}

onMounted(async () => {
  if (user.value) {
    const favoriteStatus = await fetchFavoriteStatus(props.mealItem);
    isFavorite.value = favoriteStatus; // Set the correct initial value based on the DB
  }
});
</script>

<template>
  <button
    @click.stop="toggleFavorite"
    class="cursor-pointer"
    :class="[
      isFavorite && user
        ? 'text-red-500 border-red-500'
        : 'text-gray-500 border-gray-300',
    ]"
  >
    <font-awesome-icon v-if="isLoaded" :icon="['fas', 'fa-heart']" />
  </button>
</template>
