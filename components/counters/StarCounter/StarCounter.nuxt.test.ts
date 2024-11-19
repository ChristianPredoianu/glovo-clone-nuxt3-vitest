import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import StarCounter from '@/components/counters/StarCounter/StarCounter.vue';
import useIsLoaded from '@/composables/useIsLoaded';

// Mocking useIsLoaded composable
vi.mock('@/composables/useIsLoaded', () => ({
  default: vi.fn(() => ({
    isLoaded: ref(true),
  })),
}));

describe('StarCounter', () => {
  // Reset mocks before each test to ensure a clean slate
  beforeEach(() => {
    vi.resetAllMocks();
    (useIsLoaded as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoaded: ref(true),
    });
  });

  it('renders full, half, and empty stars correctly for a given rating', () => {
    const wrapper = mount(StarCounter, {
      props: {
        rate: 3.5,
        count: 10,
      },
    });

    const fullStars = wrapper.findAll('[data-test="fa-full-stars"]');
    expect(fullStars).toHaveLength(3);

    const halfStar = wrapper.find('[data-test="fa-half-stars"]');
    expect(halfStar.exists()).toBe(true);

    const emptyStars = wrapper.findAll('[data-test="fa-empty-stars"]');
    expect(emptyStars).toHaveLength(1);

    expect(wrapper.text()).toContain('(10 reviews)');
  });

  it('renders only full stars when the rating is a whole number', () => {
    const wrapper = mount(StarCounter, {
      props: {
        rate: 4,
        count: 5,
      },
    });

    const fullStars = wrapper.findAll('[data-test="fa-full-stars"]');
    expect(fullStars).toHaveLength(4);

    const halfStar = wrapper.find('[data-test="fa-half-stars"]');
    expect(halfStar.exists()).toBe(false);

    const emptyStars = wrapper.findAll('[data-test="fa-empty-stars"]');
    expect(emptyStars).toHaveLength(1);

    expect(wrapper.text()).toContain('(5 reviews)');
  });

  it('renders all empty stars when the rating is 0', () => {
    const wrapper = mount(StarCounter, {
      props: {
        rate: 0,
        count: 2,
      },
    });

    const fullStars = wrapper.findAll('[data-test="fa-full-stars"]');
    expect(fullStars).toHaveLength(0);

    const halfStar = wrapper.find('[data-test="fa-half-stars"]');
    expect(halfStar.exists()).toBe(false);

    const emptyStars = wrapper.findAll('[data-test="fa-empty-stars"]');
    expect(emptyStars).toHaveLength(5);

    expect(wrapper.text()).toContain('(2 reviews)');
  });

  it('renders all full stars when the rating is 5', () => {
    const wrapper = mount(StarCounter, {
      props: {
        rate: 5,
        count: 20,
      },
    });

    const fullStars = wrapper.findAll('[data-test="fa-full-stars"]');
    expect(fullStars).toHaveLength(5);

    const halfStar = wrapper.find('[data-test="fa-half-stars"]');
    expect(halfStar.exists()).toBe(false);

    const emptyStars = wrapper.findAll('[data-test="fa-empty-stars"]');
    expect(emptyStars).toHaveLength(0);

    expect(wrapper.text()).toContain('(20 reviews)');
  });

  it('does not render the star counter div if isLoaded is false', () => {
    (useIsLoaded as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoaded: ref(false),
    });

    const wrapper = mount(StarCounter, {
      props: {
        rate: 3.5,
        count: 10,
      },
    });

    const starCounterDiv = wrapper.find('[data-test="star-counter-div"]');
    expect(starCounterDiv.exists()).toBe(false);
  });
});
