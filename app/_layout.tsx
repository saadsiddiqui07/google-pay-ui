import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4285F4',     // Google Blue
    secondary: '#34A853',   // Google Green (using secondary as accent is deprecated in MD3)
    background: '#FFFFFF',  // Clean white background
    surface: '#F1F3F4',     // Light grey for cards
    error: '#EA4335',       // Google Red
  },
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
