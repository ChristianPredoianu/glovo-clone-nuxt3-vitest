<script setup lang="ts">
import type { IItem } from '@/interfaces/interfaces.interface';

const props = defineProps({
  mealItem: {
    type: Object as PropType<IItem>,
  },
});

const { user } = useAuth();
const { writeFavoriteUserItemData } = useFirebaseActions();
const { openModal } = useModal();
const { isLoaded } = useIsLoaded();

const isFavorite = ref<boolean>(false);

function toggleFavorite() {
  if (!user.value) {
    openModal('signIn');
  } else {
    isFavorite.value = !isFavorite.value;
    console.log(props.mealItem);
    writeFavoriteUserItemData(props.mealItem as IItem);
  }
}
</script>

<template>
  <button
    @click.stop="toggleFavorite"
    class="cursor-pointer"
    :class="[
      isFavorite ? 'text-red-500 border-red-500' : 'text-gray-500 border-gray-300',
    ]"
  >
    <font-awesome-icon v-if="isLoaded" :icon="['fas', 'fa-heart']" />
  </button>
</template>
