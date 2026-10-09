import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
});

const DEFAULT_THEME: Theme = 'dark';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with the default so server and client render the same markup.
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

  // Runs only in the browser: load the saved theme after mount.
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const value = useMemo(() => {
    // Persist only on explicit changes, so the default never overwrites
    // the saved value before it has been loaded.
    function setTheme(next: Theme) {
      setThemeState(next);
      localStorage.setItem('theme', next);
    }

    function toggleTheme() {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return {
      theme,
      setTheme,
      toggleTheme,
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return ctx;
}
