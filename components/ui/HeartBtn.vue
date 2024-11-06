<script setup lang="ts">
import type { IItem } from '@/interfaces/interfaces.interface';

const props = defineProps<{
  mealItem: IItem;
}>();

const { user } = useAuth();
const { writeFavoriteUserItemData } = useFirebaseActions();
const { openModal } = useModal();

const isFavorite = ref<boolean>(false);

function toggleFavorite() {
  if (!user.value) {
    openModal('signIn');
  } else {
    isFavorite.value = !isFavorite.value;
    console.log(props.mealItem);
    writeFavoriteUserItemData(props.mealItem);
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
    <font-awesome-icon :icon="['fas', 'fa-heart']" />
  </button>
</template>
