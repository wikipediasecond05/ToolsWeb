'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'nymtools-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme === 'dark' ? 'dark' : 'light'; // Default for SSR
    }
    try {
      const storedTheme = window.localStorage.getItem(storageKey) as Theme | null;
      if (storedTheme) {
        return storedTheme;
      }
      if (defaultTheme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return defaultTheme as Theme;
    } catch (e) {
      // If user is in private mode or has storage restriction
      return defaultTheme === 'dark' ? 'dark' : 'light';
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // first disable all transitions
    root.classList.add("no-transition");

    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    setTimeout(() => {
      root.classList.remove("no-transition");
    }, 1000); 
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (e) {
      // If user is in private mode or has storage restriction
      console.warn('Failed to save theme to localStorage', e);
    }
  }, [theme, storageKey]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);
  
  // Effect to handle system theme changes if initial theme was 'system'
  useEffect(() => {
    if (defaultTheme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
       // Only update if current theme was derived from system preference
       // This check ensures user's explicit choice is not overridden by system changes
       const storedTheme = window.localStorage.getItem(storageKey) as Theme | null;
       if (!storedTheme) { // If no theme is explicitly set, follow system
         setThemeState(mediaQuery.matches ? 'dark' : 'light');
       }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [defaultTheme, storageKey]);


  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
