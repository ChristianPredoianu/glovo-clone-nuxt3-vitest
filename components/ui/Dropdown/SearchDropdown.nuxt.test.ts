import { describe, it, expect } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Dropdown from '@/components/ui/Dropdown.vue';
import AdressForm from '@/components/forms/AdressForm/AdressForm.vue';

describe('AdressForm', () => {
  it('opens dropdown when user starts typing', async () => {
    /* const options = [
      { id: 1, text: 'Option 1' },
      { id: 2, text: 'Option 2' },
      { id: 3, text: 'Option 3' },
    ];

    const wrapper = mount(AdressForm, {
      props: {
        options,
        idKey: 'id',
        textKey: 'text',
      },
    });

    console.log(wrapper.html()); */
    /*  const input = wrapper.find('input[data-testid="address-input"]');
    console.log(input);
    await input.setValue('Some address');
    await flushPromises();

    const dropdown = wrapper.findComponent(Dropdown);
    expect(dropdown.exists()).toBe(true);
    expect(dropdown.isVisible()).toBe(true); */
  });

  // You can add more tests here
});
