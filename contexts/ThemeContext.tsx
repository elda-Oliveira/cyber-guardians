import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

type ThemeType = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const ThemeContext = createContext({} as ThemeContextType);

export function ThemeProviderCustom({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] =
    useState<ThemeType>('dark');

  useEffect(() => {
    carregarTema();
  }, []);

  async function carregarTema() {
    const temaSalvo =
      await AsyncStorage.getItem('theme');

    if (temaSalvo === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  async function toggleTheme() {
    const novoTema =
      theme === 'dark' ? 'light' : 'dark';

    setTheme(novoTema);

    await AsyncStorage.setItem(
      'theme',
      novoTema
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeCustom() {
  return useContext(ThemeContext);
}