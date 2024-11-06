import { describe, vi, beforeEach, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FilterModal from './FilterModal.vue';
import FilterModalOverlay from './Overlay/FilterModalOverlay.vue';

describe('FilterModal', () => {
  it('emits the selected cuisine type', async () => {
    const emitSpy = vi.fn();
    const wrapper = mount(FilterModal, {
      global: {
        components: { FilterModalOverlay },
      },
      attrs: {
        onEmitSelected: emitSpy,
      },
    });

    // Find FilterModalOverlay and trigger emitSelected
    const overlay = wrapper.findComponent(FilterModalOverlay);
    overlay.vm.$emit('emitSelected', 'Italian');

    await wrapper.vm.$nextTick();

    expect(emitSpy).toHaveBeenCalledWith('Italian');
  });
});
