import { atom } from 'nanostores';

export type Theme = 'dark' | 'light' | 'system';

// Initialize from localStorage or default to 'dark'
const initialTheme = (typeof localStorage !== 'undefined' ? localStorage.getItem('bpa-theme') : 'dark') as Theme || 'dark';

export const themeStore = atom<Theme>(initialTheme);

export function setTheme(theme: Theme) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('bpa-theme', theme);
  }
  themeStore.set(theme);
  
  if (typeof document !== 'undefined') {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
