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

//Implement a helper function to retrieve initial theme
//default theme "dark"

function getInitialTheme(): Theme {
  // get theme from localStorage
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return 'dark';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initiliza theme using the getInitialTheme function
  const [theme, setTheme] = useState(getInitialTheme());
  console.log('Theme is', theme);

  function toggleTheme() {
    if (theme == 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }
  //Persist theme changes to localStorage
  useEffect(() => {
    // Update the HTML root element dataset so CSS can react to theme changes
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const value = useMemo(() => {
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
  console.log('CTX -> ', ctx);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return ctx;
}
