import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CategoryCard from '@/components/cards/CategoryCard/CategoryCard.vue';
import { createRouter, createWebHistory } from 'vue-router';

const productCategory = {
  index: 1,
  img: '/path/to/image.jpg',
  text: 'Category Name',
  category: '/category-page',
};

describe('CategoryCard', () => {
  it('renders the image and text correctly', () => {
    const wrapper = mount(CategoryCard, {
      props: {
        productCategory,
      },
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(
      '/_ipx/f_webp&fit_cover&s_128x128/path/to/image.jpg'
    );
    expect(img.attributes('alt')).toBe('Category Name');

    const text = wrapper.find('h3');
    expect(text.exists()).toBe(true);
    expect(text.text()).toBe('Category Name');
  });

  it('navigates to the correct page when clicked', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/category-page',
          name: 'CategoryPage',
          component: { template: '<div>Category Page</div>' },
        },
      ],
    });

    const wrapper = mount(CategoryCard, {
      props: {
        productCategory,
      },
      global: {
        plugins: [router],
      },
    });

    const article = wrapper.find('article');
    await article.trigger('click');

    await router.push('/category-page?index=1');

    expect(router.currentRoute.value.fullPath).toBe('/category-page?index=1');
  });
});
