import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const THEME_KEY = 'app_theme';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: (localStorage.getItem(THEME_KEY) as Theme) || 'light',
      setTheme: (theme) => {
        set({ theme });
        localStorage.setItem(THEME_KEY, theme);
        document.documentElement.setAttribute('data-theme', theme);
      },
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem(THEME_KEY, newTheme);
          document.documentElement.setAttribute('data-theme', newTheme);
          return { theme: newTheme };
        });
      },
    }),
    {
      name: THEME_KEY,
    }
  )
);

// Инициализация темы при загрузке
if (typeof window !== 'undefined') {
  const savedTheme = (localStorage.getItem(THEME_KEY) as Theme) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}
