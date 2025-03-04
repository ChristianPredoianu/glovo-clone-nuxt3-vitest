import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import FormSubmitBtn from '@/components/buttons/FormSubmitBtn/FormSubmitBtn.vue';

describe('FormSubmitBtn.vue', () => {
  it('renders the slot content', () => {
    const wrapper = mount(FormSubmitBtn, {
      slots: {
        default: 'Submit',
      },
    });
    expect(wrapper.text()).toContain('Submit');
  });

  it('applies disabled attribute when prop is true', async () => {
    const wrapper = mount(FormSubmitBtn, {
      props: {
        disabled: true,
      },
    });
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
    expect(button.classes()).toContain('disabled:opacity-50');
    expect(button.classes()).toContain('disabled:cursor-not-allowed');
  });

  it('does not apply disabled attribute when prop is false', async () => {
    const wrapper = mount(FormSubmitBtn, {
      props: {
        disabled: false,
      },
    });
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeUndefined();
  });

  it('has the correct classes applied', () => {
    const wrapper = mount(FormSubmitBtn);
    const button = wrapper.find('button');
    expect(button.classes()).toContain('w-full');
    expect(button.classes()).toContain('bg-green-600');
    expect(button.classes()).toContain('text-gray-100');
    expect(button.classes()).toContain('py-2');
    expect(button.classes()).toContain('px-4');
    expect(button.classes()).toContain('rounded-md');
    expect(button.classes()).toContain('hover:bg-green-700');
    expect(button.classes()).toContain('transition-opacity');
    expect(button.classes()).toContain('duration-300');
    expect(button.classes()).toContain('ease-in-out');
    expect(button.classes()).toContain('focus:outline-none');
    expect(button.classes()).toContain('focus:ring-2');
    expect(button.classes()).toContain('focus:ring-indigo-300');
    expect(button.classes()).toContain('focus:ring-opacity-50');
  });
});
