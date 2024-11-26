import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import HeartBtn from '@/components/ui/HeartBtn/HeartBtn.vue';
import { ref } from 'vue';

// Mock variables
const mockUser = ref(null);
const mockIsFavorite = ref(false);
const mockIsLoaded = ref(true);

const mockWriteFavoriteUserItemData = vi.fn();
const mockDeleteFavoriteUserItemData = vi.fn();
const mockIsItemFavorite = vi.fn();
const mockOpenModal = vi.fn();

// Mock composables
vi.mock('@/composables/useAuth', () => ({
  useAuth: () => ({ user: mockUser }),
}));

vi.mock('@/composables/useFirebaseActions', () => ({
  useFirebaseActions: () => ({
    writeFavoriteUserItemData: mockWriteFavoriteUserItemData,
    deleteFavoriteUserItemData: mockDeleteFavoriteUserItemData,
    isItemFavorite: mockIsItemFavorite,
  }),
}));

vi.mock('@/composables/ui/useModal', () => ({
  useModal: () => ({ openModal: mockOpenModal }),
}));

vi.mock('@/composables/useIsLoaded', () => ({
  default: () => ({ isLoaded: mockIsLoaded }),
}));

describe('HeartBtn', () => {
  const mealItem = { category: 'american', label: 'Meal 1', img: 'http://testimage.com' };

  beforeEach(() => {
    mockUser.value = null;
    mockIsFavorite.value = false;
    mockWriteFavoriteUserItemData.mockClear();
    mockDeleteFavoriteUserItemData.mockClear();
  });

  it('opens signin modal if user is not logged in', async () => {
    const wrapper = mount(HeartBtn, {
      props: { mealItem },
    });

    await wrapper.find('button').trigger('click');

    expect(mockOpenModal).toHaveBeenCalledWith('signin');
  });

  it('toggles favorite status when user is logged in', async () => {
    mockUser.value = { id: 1, name: 'Test User' };
    mockIsItemFavorite.mockResolvedValueOnce(false);

    const wrapper = mount(HeartBtn, {
      props: { mealItem },
    });

    await wrapper.vm.$nextTick();

    // Directly call the toggleFavorite method
    const btn = wrapper.find('button');
    await btn.trigger('click');
    console.log(btn.html());
    console.log('Meal Item:', mealItem); // Debugging line to check mealItem
    console.log('Function calls:', mockWriteFavoriteUserItemData.mock.calls); // Debugging line to check mock function calls
    expect(mockWriteFavoriteUserItemData).toHaveBeenCalledWith(mealItem);
    expect(mockIsFavorite.value).toBe(true);

    await btn.trigger('click');
    expect(mockDeleteFavoriteUserItemData).toHaveBeenCalledWith(mealItem);
    expect(mockIsFavorite.value).toBe(false);
  });

  /*  it('applies correct classes based on favorite status and user login state', async () => {
    mockUser.value = { id: 1, name: 'Test User' };

    const wrapper = mount(HeartBtn, {
      props: { mealItem },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('button').classes()).toContain('text-gray-500');

    mockIsItemFavorite.mockResolvedValueOnce(true);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('button').classes()).toContain('text-red-500');
  }); */
});