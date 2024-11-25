import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import FilterModalOverlay from '@/components/modals/FilterModal/Overlay/FilterModalOverlay.vue';

const mockClearActive = vi.fn();
const mockIsFakeStoreIndex = false;
const mockScreenWidth = ref(800);

vi.mock('@/composables/ui/useScreenWidth', () => ({
  useScreenWidth: vi.fn(() => ({
    screenWidth: mockScreenWidth,
  })),
}));

vi.mock('@/composables/ui/useIsActive', () => ({
  useIsActive: vi.fn(() => ({
    clearActive: mockClearActive,
  })),
}));

vi.mock('@/composables/useFilter', () => ({
  useFilter: vi.fn(() => ({
    isFakeStoreIndex: mockIsFakeStoreIndex,
  })),
}));

describe('FilterModalOverlay', () => {
  it('renders correctly', () => {
    const wrapper = mount(FilterModalOverlay);

    expect(wrapper.find('h3').text()).toBe('Types of dishes');
    expect(wrapper.findComponent({ name: 'FilterModalList' }).exists()).toBe(true);
    expect(wrapper.find('[data-test="delete-btn"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="apply-btn"]').exists()).toBe(true);
  });

  it('handles delete button click', async () => {
    const wrapper = mount(FilterModalOverlay);

    const deleteBtn = wrapper.find('[data-test="delete-btn"]');
    expect(deleteBtn.exists()).toBe(true);
    await deleteBtn.trigger('click');

    expect(mockClearActive).toHaveBeenCalled();
    expect(wrapper.emitted('emitSelected')![0]).toEqual(['']);
    expect(wrapper.emitted('closeModal')).toBeTruthy();
  });

  it('handles apply button click', async () => {
    const wrapper = mount(FilterModalOverlay);

    await wrapper.find('[data-test="apply-btn"]').trigger('click');
    expect(wrapper.emitted('emitSelected')![0]).toEqual(['']);
    expect(wrapper.emitted('closeModal')).toBeTruthy();
  });

  it('closes modal on screen width change', async () => {
    const wrapper = mount(FilterModalOverlay);
    mockScreenWidth.value = 1024;

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('closeModal')).toBeTruthy();
  });
});
