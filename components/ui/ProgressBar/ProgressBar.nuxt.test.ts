import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar.vue';

vi.mock('@/composables/ui/useProgressBar', () => ({
  useProgressBar: () => ({ progressWidth: 50 }),
}));

describe('ProgressBar', () => {
  it('renders the progress bar with correct width', async () => {
    const wrapper = mount(ProgressBar);
    const progressBar = wrapper.find('[data-test="progress"]');

    expect(progressBar.exists()).toBe(true);
    expect(progressBar.attributes('style')).toContain('width: 50%');
  });

  it('has the correct class for styling', async () => {
    const wrapper = mount(ProgressBar);
    const progressBar = wrapper.find('[data-test="progress"]');

    expect(progressBar.classes()).toContain('bg-green-500');
  });
});
