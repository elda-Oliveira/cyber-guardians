import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaProvider>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: isDark ? '#020617' : '#F8FAFC',
          }}
          edges={['top', 'left', 'right']}
        >
          <View
            style={{
              height: 1,
              backgroundColor: isDark ? '#1E293B' : '#E2E8F0',
            }}
          />

          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: isDark ? '#020617' : '#F8FAFC',
              },
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="modal" />
          </Stack>
        </SafeAreaView>

        <StatusBar style={isDark ? 'light' : 'dark'} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}