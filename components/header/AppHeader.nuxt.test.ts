import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppHeader from '@/components/header/AppHeader.vue';

describe('AppHeader', () => {
  it('should show nav list', async () => {
    const appHeaderWrapper = mount(AppHeader);

    const navListDiv = appHeaderWrapper.find('#nav-list-div');

    expect(navListDiv.classes()).toContain('-translate-x-[50rem]');
  });
});
