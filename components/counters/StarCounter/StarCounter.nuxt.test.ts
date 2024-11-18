import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue'; // Import Vue helpers
import StarCounter from '@/components/counters/StarCounter/StarCounter.vue';
import useIsLoaded from '@/composables/useIsLoaded';

vi.mock('@/composables/useIsLoaded', () => ({
  default: vi.fn(() => ({
    isLoaded: ref(true),
  })),
}));

describe('StarCounter', () => {
  beforeEach(() => {
    // Reset mocks before each test to ensure clean slate
    vi.resetAllMocks();

    // Mock `useIsLoaded` to return `ref(true)` by default for most tests
    (useIsLoaded as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoaded: ref(true),
    });
  });

  it('renders full, half, and empty stars correctly for a given rating', async () => {
    const wrapper = mount(StarCounter, {
      props: {
        rate: 3.5, // Half-star scenario
        count: 10, // Review count
      },
    });

    // Check that the correct number of full stars is rendered
    const fullStars = wrapper.findAll('[data-test="fa-full-stars"]');
    expect(fullStars).toHaveLength(3); // 3 full stars for 3.5 rating

    // Check that a half star is rendered
    const halfStar = wrapper.find('[data-test="fa-half-stars"]');
    expect(halfStar.exists()).toBe(true);

    // Check that the correct number of empty stars is rendered
    const emptyStars = wrapper.findAll('[data-test="fa-empty-stars"]');
    expect(emptyStars).toHaveLength(1); // 1 empty star for 3.5 rating

    // Check that the reviews count is displayed
    expect(wrapper.text()).toContain('(10 reviews)');
  });

  it('renders only full stars when the rating is a whole number', async () => {
    const wrapper = mount(StarCounter, {
      props: {
        rate: 4, // Whole star scenario
        count: 5, // Review count
      },
    });

    // Check that the correct number of full stars is rendered
    const fullStars = wrapper.findAll('[data-test="fa-full-stars"]');
    expect(fullStars).toHaveLength(4); // 4 full stars for 4 rating

    // Check that no half star is rendered
    const halfStar = wrapper.find('[data-test="fa-half-stars"]');
    expect(halfStar.exists()).toBe(false);

    // Check that the correct number of empty stars is rendered
    const emptyStars = wrapper.findAll('[data-test="fa-empty-stars"]');
    expect(emptyStars).toHaveLength(1); // 1 empty star for 4 rating

    // Check that the reviews count is displayed
    expect(wrapper.text()).toContain('(5 reviews)');
  });

  it('renders all empty stars when the rating is 0', async () => {
    const wrapper = mount(StarCounter, {
      props: {
        rate: 0, // No stars scenario
        count: 2, // Review count
      },
    });

    // Check that no full stars are rendered
    const fullStars = wrapper.findAll('[data-test="fa-full-stars"]');
    expect(fullStars).toHaveLength(0);

    // Check that no half star is rendered
    const halfStar = wrapper.find('[data-test="fa-half-stars"]');
    expect(halfStar.exists()).toBe(false);

    // Check that all empty stars are rendered
    const emptyStars = wrapper.findAll('[data-test="fa-empty-stars"]');
    expect(emptyStars).toHaveLength(5); // 5 empty stars for 0 rating

    // Check that the reviews count is displayed
    expect(wrapper.text()).toContain('(2 reviews)');
  });

  it('renders all full stars when the rating is 5', async () => {
    const wrapper = mount(StarCounter, {
      props: {
        rate: 5, // Full stars scenario
        count: 20, // Review count
      },
    });

    // Check that all full stars are rendered
    const fullStars = wrapper.findAll('[data-test="fa-full-stars"]');
    expect(fullStars).toHaveLength(5); // 5 full stars for 5 rating

    // Check that no half star is rendered
    const halfStar = wrapper.find('[data-test="fa-half-stars"]');
    expect(halfStar.exists()).toBe(false);

    // Check that no empty stars are rendered
    const emptyStars = wrapper.findAll('[data-test="fa-empty-stars"]');
    expect(emptyStars).toHaveLength(0);

    // Check that the reviews count is displayed
    expect(wrapper.text()).toContain('(20 reviews)');
  });

  it('does not render the star counter div if isLoaded is false', async () => {
    // Mock `useIsLoaded` to return `false` for this test case
    (useIsLoaded as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoaded: ref(false), // Default state is loaded (wrapped in a `Ref`)
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
