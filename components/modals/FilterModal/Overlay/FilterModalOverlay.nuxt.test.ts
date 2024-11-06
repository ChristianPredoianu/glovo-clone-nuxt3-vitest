import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FilterModalOverlay from './FilterModalOverlay.vue'; // Adjust the path as needed

// Mock composables used in the component
const mockClearActive = vi.fn();
const mockIsFakeStoreIndex = vi.fn(() => true);
const mockScreenWidth = ref(800); // Mock screen width

vi.mock('@/composables/useIsActive', () => ({
  useIsActive: vi.fn(() => ({
    clearActive: mockClearActive,
  })),
}));

vi.mock('@/composables/useFilter', () => ({
  useFilter: vi.fn(() => ({
    isFakeStoreIndex: mockIsFakeStoreIndex,
  })),
}));

vi.mock('@/composables/useScreenWidth', () => ({
  useScreenWidth: vi.fn(() => ({
    screenWidth: mockScreenWidth,
  })),
}));

describe('FilterModalOverlay', () => {
  it('emits "closeModal" when close button is clicked', async () => {
    const wrapper = mount(FilterModalOverlay);

    // Simulate clicking the close button
    await wrapper.find('.text-xl').trigger('click');

    // Check if closeModal was emitted
    expect(wrapper.emitted('closeModal')).toBeTruthy();
  });

  it('emits "emitSelected" and "closeModal" when Apply button is clicked', async () => {
    const wrapper = mount(FilterModalOverlay);

    // Simulate clicking the apply button
    await wrapper.find('[data-test="apply-btn"]').trigger('click');

    // Check if emitSelected was emitted with correct value
    expect(wrapper.emitted('emitSelected')).toBeTruthy();

    // Check if closeModal was emitted
    expect(wrapper.emitted('closeModal')).toBeTruthy();
  });

  it('clears active state and emits "emitSelected" with an empty string on delete', async () => {
    const wrapper = mount(FilterModalOverlay);

    // Simulate clicking the delete button
    await wrapper.find('[data-test="delete-btn"]').trigger('click');

    // Check if clearActive was called
    expect(mockClearActive).toHaveBeenCalled();

    // Check if emitSelected was emitted with an empty string
    expect(wrapper.emitted('emitSelected')?.[0]).toEqual(['']);

    // Check if closeModal was emitted
    expect(wrapper.emitted('closeModal')).toBeTruthy();
  });

  it('emits "closeModal" when screen width is >= 1024', async () => {
    const wrapper = mount(FilterModalOverlay);

    // Simulate the screen width change
    mockScreenWidth.value = 1024;
    await wrapper.vm.$nextTick(); // Wait for reactivity to update

    // Check if closeModal was emitted
    expect(wrapper.emitted('closeModal')).toBeTruthy();
  });
});
