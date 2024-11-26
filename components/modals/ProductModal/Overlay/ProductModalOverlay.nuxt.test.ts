import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ProductModalOverlay from '@/components/modals/ProductModal/Overlay/ProductModalOverlay.vue';

const addToCartMock = vi.fn();
const isBarActiveMock = ref(false);

vi.mock('@/composables/useCart', () => ({
  useCart: vi.fn(() => ({
    addToCart: addToCartMock,
  })),
}));

vi.mock('@/composables/ui/useProgressBar', () => ({
  useProgressBar: vi.fn(() => ({
    isBarActive: isBarActiveMock,
  })),
}));

const mockProductModalProps = {
  id: '1',
  label: 'Pizza Margherita',
  img: 'pizza.jpg',
  ingredients: [
    { foodId: '1', text: 'Tomato' },
    { foodId: '2', text: 'Cheese' },
    { foodId: '3', text: 'Basil' },
  ],
};

describe('ProductModalOverlay', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(ProductModalOverlay, {
      props: {
        productModalProps: mockProductModalProps,
        price: 12,
      },
    });
  });

  it('renders correctly with productModalProps', () => {
    expect(wrapper.find('h3').text()).toBe('Pizza Margherita');
    expect(wrapper.find('h4').text()).toBe('12 $');
    expect(wrapper.find('img').attributes('src')).toBe('pizza.jpg');
  });

  it('renders ingredients list when productModalProps is a meal', () => {
    const ingredients = wrapper.findAll('li');
    expect(ingredients.length).toBe(3);
    expect(ingredients[0].text()).toBe('Tomato');
    expect(ingredients[1].text()).toBe('Cheese');
    expect(ingredients[2].text()).toBe('Basil');
  });

  it('calls addToCart when Add to cart button is clicked', async () => {
    const button = wrapper.findComponent({ name: 'CtaBtn' });
    await button.trigger('click');
    expect(addToCartMock).toHaveBeenCalled();
  });

  it('shows progress bar when isBarActive is true', async () => {
    isBarActiveMock.value = true;
    expect(wrapper.findComponent({ name: 'ProgressBar' }).exists()).toBe(true);
  });
});
