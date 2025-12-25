import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, useColorScheme } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';

export default function CustomSplashScreen({ onFinish }: { onFinish: () => void }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const hideNativeSplash = async () => {
      // Hide the native splash screen immediately so our JS splash is visible
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn('Error hiding native splash screen:', e);
      }
    };
    hideNativeSplash();

    // Simulate some loading time
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View 
      exiting={FadeOut.duration(500)}
      style={[
        styles.container, 
        { backgroundColor: isDark ? '#202124' : '#FFFFFF' }
      ]}
    >
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/images/google-pay-icon.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      </View>
      <View style={styles.footer}>
        <Text style={[styles.googleText, { color: isDark ? '#FFFFFF' : '#5F6368' }]}>
          Google
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120, 
    height: 120,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  googleText: {
    fontSize: 26,
    fontWeight: '500',
    letterSpacing: -0.5,
  },
});
