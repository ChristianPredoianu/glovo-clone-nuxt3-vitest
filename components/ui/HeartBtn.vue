<script setup lang="ts">
import type { IItem } from '@/interfaces/interfaces.interface';

const props = defineProps({
  mealItem: {
    type: Object as PropType<IItem>,
    required: true,
  },
});

const { user } = useAuth();
const { writeFavoriteUserItemData, isItemFavorite } = useFirebaseActions();
const { openModal } = useModal();
const { isLoaded } = useIsLoaded();

const isFavorite = ref<boolean>(false);

async function toggleFavorite() {
  if (!user.value) {
    openModal('signIn');
    return;
  }
  if (await isItemFavorite(props.mealItem.label)) {
    console.log('already there');
    return;
  }
}
/* 
async function toggleFavorite() {
  if (!user.value) {
    openModal('signIn');
    return;
  }else if(user.value && await isItemFavorite(props.mealItem.label)){}
  isFavorite.value = !isFavorite.value;
  console.log(props.mealItem);
  await writeFavoriteUserItemData(props.mealItem as IItem);
} */

onMounted(() => {
  watchEffect(async () => {
    if (user.value && props.mealItem && props.mealItem.label) {
      const favoriteStatus = await isItemFavorite(props.mealItem.label);
      isFavorite.value = favoriteStatus;
    }
  });
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
