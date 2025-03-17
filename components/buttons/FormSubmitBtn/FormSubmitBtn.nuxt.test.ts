import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import formSubmitButton from '@/components/buttons/FormSubmitBtn/FormSubmitBtn.vue'; // Adjust the import path

describe('FormSubmitButton.vue', () => {
  function mountComponent(props = {}, slots = { default: 'Submit' }) {
    return mount(formSubmitButton, {
      props,
      slots,
    });
  }

  it('renders with default background color', () => {
    const wrapper = mountComponent();

    expect(wrapper.classes()).toContain('bg-green-600');

    expect(wrapper.text()).toBe('Submit');
  });

  it('renders with custom background color', () => {
    const wrapper = mountComponent({ bgColor: 'bg-blue-500' });

    expect(wrapper.classes()).toContain('bg-blue-500');
  });

  it('is disabled when the disabled prop is true', () => {
    const wrapper = mountComponent({ disabled: true });

    expect(wrapper.attributes('disabled')).toBeDefined();

    expect(wrapper.classes()).toContain('disabled:opacity-50');
    expect(wrapper.classes()).toContain('disabled:cursor-not-allowed');
  });

  it('applies hover and focus classes', () => {
    const wrapper = mountComponent();

    expect(wrapper.classes()).toContain('hover:bg-green-700');
    expect(wrapper.classes()).toContain('focus:outline-none');
    expect(wrapper.classes()).toContain('focus:ring-2');
    expect(wrapper.classes()).toContain('focus:ring-indigo-300');
    expect(wrapper.classes()).toContain('focus:ring-opacity-50');
  });

  it('renders slot content correctly', () => {
    const wrapper = mountComponent({}, { default: 'Click Me' });

    expect(wrapper.text()).toBe('Click Me');
  });
});
