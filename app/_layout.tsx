import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import 'react-native-reanimated';

// Define the custom Light Theme
const gpayLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4285F4',        // Google Blue
    primaryContainer: '#D2E3FC',
    secondary: '#34A853',      // Google Green
    secondaryContainer: '#CEEAD6',

    background: '#FFFFFF',     // App background
    surface: '#F1F3F4',        // Cards / sheets
    surfaceVariant: '#E8EAED', // Subtle separators

    outline: '#DADCE0',
    onBackground: '#202124',   // Primary text
    onSurface: '#202124',
    onSurfaceVariant: '#5F6368',
    onPrimary: '#FFFFFF',

    error: '#EA4335',          // Google Red
    onError: '#FFFFFF',
  },
};

// Define the custom Dark Theme
const gpayDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#8AB4F8',         // Light Google Blue
    primaryContainer: '#1A3A8F',
    secondary: '#81C995',       // Muted Google Green
    secondaryContainer: '#0F3D2E',

    background: '#202124',      // Dark background
    surface: '#303134',         // Cards
    surfaceVariant: '#3C4043',

    outline: '#5F6368',
    onBackground: '#E8EAED',    // Light text
    onSurface: '#E8EAED',
    onSurfaceVariant: '#DADCE0',
    onPrimary: '#202124',

    error: '#F28B82',           // Soft red
    onError: '#202124',
  },
};

// Adapt React Navigation themes to match Paper themes
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
  materialLight: gpayLightTheme,
  materialDark: gpayDarkTheme,
});

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? gpayDarkTheme : gpayLightTheme;
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <NavigationThemeProvider value={navigationTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="search" options={{ headerShown: false, animation: 'slide_from_right' }} />
            <Stack.Screen name="payment-input" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
          </Stack>
        </NavigationThemeProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
