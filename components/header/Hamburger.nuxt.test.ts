import { it, describe, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Hamburger from '@/components/header/Hamburger.vue';
import AppHeader from '@/components/header/AppHeader.vue';

describe('Hamburger', () => {
  it('should open navigation menu on hamburger button click', async () => {
    const hamburgerWrapper = mount(Hamburger);
    const appHeaderWrapper = mount(AppHeader);

    const navListDiv = appHeaderWrapper.find('#nav-list-div');

    const hamburger = hamburgerWrapper.find('button');
    await hamburger.trigger('click');

    expect(navListDiv.classes()).toContain('translate-x-[0rem]');
  });
});
