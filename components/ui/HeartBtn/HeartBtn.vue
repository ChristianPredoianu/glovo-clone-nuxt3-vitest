<script setup lang="ts">
import type { IItem } from '@/types';

const props = defineProps({
  mealItem: {
    type: Object as PropType<IItem>,
    required: true,
  },
});

const isFavorite = ref<boolean>(false);

const { $database } = useNuxtApp();
const { user } = useAuth();
const { openModal } = useModal();
const { isLoaded } = useIsLoaded();
const { writeFavoriteUserItemData, deleteFavoriteUserItemData } =
  useFirebaseFavoriteItemActions();
const { isItemFavorite } = useFirebaseFavoriteItemActions();

const canCheckFavorite = computed(
  () => user.value && props.mealItem && props.mealItem.label
);

async function toggleFavorite() {
  console.log('User state:', user.value);
  console.log('isFavorite state:', isFavorite.value);
  if (!user.value) {
    openModal('signin');
    return;
  }

  if (isFavorite.value) {
    await deleteFavoriteUserItemData(user.value!.uid, $database, props.mealItem);
    isFavorite.value = false;
  } else {
    console.log('Calling writeFavoriteUserItemData with:', props.mealItem);
    await writeFavoriteUserItemData(user.value!.uid, $database, props.mealItem);
    isFavorite.value = true;
  }
}

onMounted(() => {
  watchEffect(async () => {
    if (canCheckFavorite.value) {
      const favoriteStatus = await isItemFavorite(props.mealItem.label);
      isFavorite.value = favoriteStatus;
    }
  });
});
</script>

<template>
  <button
    data-test="btn"
    @click.stop="toggleFavorite"
    class="cursor-pointer"
    :class="[
      isFavorite && user
        ? 'text-red-500 border-red-500'
        : 'text-gray-500 border-gray-300',
    ]"
    aria-label="Toggle favorite"
  >
    <font-awesome-icon v-if="isLoaded" :icon="['fas', 'fa-heart']" />
  </button>
</template>
