import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import BackBtn from '@/components/buttons/BackBtn.vue'; // Update the path as needed

vi.mock('vue-router', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(), // Mock push method
  }),
}));

// Mock useIsLoaded (your custom composable)
vi.mock('@/composables/useIsLoaded', () => ({
  // Mocking the default export of the module
  default: () => ({
    isLoaded: true, // Mocked return value
  }),
}));

describe('BackBtn.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(BackBtn, {
      props: {
        page: '/',
      },
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    expect(wrapper.find('button').exists()).toBe(true);

    expect(wrapper.find('span').text()).toBe('Back');
  });

  it('calls router.push with the correct page on click', async () => {
    const mockPush = vi.fn();

    // Mock useRouter to return the mock router object with push method
    const mockRouter = useRouter as vi.Mock; // Treat `useRouter` as a mock
    mockRouter.mockReturnValueOnce({
      push: mockPush, // Mock push method
    });

    const wrapper = mount(BackBtn, {
      props: {
        page: '/example-page',
      },
      global: {
        stubs: {
          FontAwesomeIcon: true, // Stub FontAwesomeIcon component
        },
      },
    });

    // Trigger the button click event
    await wrapper.find('button').trigger('click');

    // Ensure router.push was called with the correct argument
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
