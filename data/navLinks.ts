import type { INavLinks } from '@/types/menu';

export const navLinks: INavLinks[] = [
  { title: 'Home', link: '/', icon: ['fas', 'house'] },
  { title: 'Dashboard', link: '/dashboard', icon: ['fas', 'user-tie'] },
  { title: 'My Account', link: '/my-account', icon: ['fas', 'face-smile'] },
  { title: 'Cart', link: '', icon: ['fas', 'cart-shopping'] },
  { title: 'Sign in', link: '', icon: ['fas', 'right-to-bracket'] },
];
