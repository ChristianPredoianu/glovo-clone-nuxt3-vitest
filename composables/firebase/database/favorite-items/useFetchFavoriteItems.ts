import { ref as dbRef, getDatabase, get } from 'firebase/database';

import type { IItem } from '@/types/products';

declare module '#app' {
  interface NuxtApp {
    $database: ReturnType<typeof getDatabase>;
  }
}

export function useFetchFavoriteItems() {
  const fetchedFavoriteItems: Ref<IItem[]> = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);

  const { isAuthReady, user } = useAuth();
  const { $database } = useNuxtApp();

  function handleError(message: string, error: any) {
    const errorDetails = error?.message || 'An unknown error occurred';
    console.error(`${message}:`, errorDetails);
    errorMessage.value = `${message}: ${errorDetails}`;
  }

  function getFavoriteItemRef() {
    if (!user.value) throw new Error('User is not authenticated');
    return dbRef($database, `users/${user.value.uid}/favoriteItems`);
  }

  async function fetchFavoriteItems() {
    errorMessage.value = null;

    if (!isAuthReady.value) {
      return;
    }

    isLoading.value = true;
    try {
      const favoriteItemRef = getFavoriteItemRef();
      const snapshot = await get(favoriteItemRef);

      if (snapshot.exists()) {
        const favorites = snapshot.val() as { [key: string]: IItem };
        fetchedFavoriteItems.value = Object.values(favorites);
      } else {
        fetchedFavoriteItems.value = [];
      }
    } catch (error: any) {
      handleError('Error fetching favorite items', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function isItemFavorite(label: string): Promise<boolean> {
    errorMessage.value = null;
    try {
      if (!user.value || !label) {
        throw new Error('Invalid user or label');
      }

      const favoriteItemRef = getFavoriteItemRef();
      const snapshot = await get(favoriteItemRef);

      if (!snapshot.exists()) return false;

      const favorites = snapshot.val() as { [key: string]: IItem };
      return Object.values(favorites).some((item) => item.label === label);
    } catch (error: any) {
      handleError('Error checking if item is favorite', error);
      return false;
    }
  }

  return {
    fetchedFavoriteItems,
    isLoading,
    fetchFavoriteItems,
    isItemFavorite,
    errorMessage,
  } as const;
}
