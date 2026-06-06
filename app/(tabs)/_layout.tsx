import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import {
  ThemeProviderCustom,
  useThemeCustom,
} from '@/contexts/ThemeContext';

function AppLayout() {
  const { theme } = useThemeCustom();

  return (
    <ThemeProvider
      value={
        theme === 'dark'
          ? DarkTheme
          : DefaultTheme
      }
    >
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>

      <StatusBar
        style={
          theme === 'dark'
            ? 'light'
            : 'dark'
        }
      />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProviderCustom>
      <AppLayout />
    </ThemeProviderCustom>
  );
}