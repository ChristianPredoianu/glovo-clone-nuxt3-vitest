import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CloseIcon from '@/components/ui/CloseIcon/CloseIcon.vue';

describe('CloseIcon', () => {
  it('emits close event when clicked', async () => {
    const wrapper = mount(CloseIcon);

    await wrapper.find('[data-test="fa-close"]').trigger('click');

    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
