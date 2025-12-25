import { useAudioPlayer } from 'expo-audio';
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: windowWidth } = Dimensions.get("window");

export default function PaymentSuccessScreen() {
  const animation = useRef<LottieView>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useTheme();

  const amount = (params.amount as string) || "0";
  const name = (params.name as string) || "User";

  const player = useAudioPlayer(require('../assets/sounds/success.mp3'));

  useEffect(() => {
    player.play();
  }, [player]);

  // Shared values for animations
  const buttonOpacity = useSharedValue(0);
  const lottieTranslateY = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);

  const lottieAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: lottieTranslateY.value }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ translateY: textTranslateY.value }],
    };
  });

  const animatedButtonOpacity = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    };
  });

  const handleAnimationFinish = () => {
    // Move Lottie upwards
    lottieTranslateY.value = withTiming(-80, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });

    // Fade in text
    textOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    textTranslateY.value = withDelay(
      300,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.back(1)) })
    );

    // Fade in button
    buttonOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
  };

  const handleDone = () => {
    router.dismissTo("/(tabs)");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.content]}>
        <Animated.View style={[lottieAnimatedStyle]}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: windowWidth,
              height: windowWidth * 0.8,
              backgroundColor: "transparent",
            }}
            source={require("../assets/success-payment.json")}
            loop={false}
            onAnimationFinish={handleAnimationFinish}
          />
        </Animated.View>

        <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
          <Text
            variant="labelLarge"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Payment successful!
          </Text>
          <Text
            variant="headlineLarge"
            style={{
              fontWeight: "bold",
              color: theme.colors.onBackground,
              marginBottom: 16,
            }}
          >
            ₹{amount}
          </Text>
          <Text
            variant="bodyLarge"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Paid to
          </Text>
          <Text
            variant="headlineSmall"
            style={{
              fontWeight: "bold",
              color: theme.colors.onBackground,
              marginTop: 4,
            }}
          >
            {name}
          </Text>
        </Animated.View>
        <Animated.View style={[animatedButtonOpacity, { position: "absolute", bottom: 18, flexDirection: "row", gap: 12 }]}>
          <Button
            mode="outlined"
            onPress={() => {}}
            style={{ width: windowWidth * 0.4, borderColor: theme.colors.primary }}
            textColor={theme.colors.primary}
            icon="share-variant"
          >
            Share
          </Button>
          <Button
            mode="contained"
            onPress={handleDone}
            style={{ width: windowWidth * 0.4 }}
            buttonColor={theme.colors.primary}
          >
            Done
          </Button>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: "55%", // Position it below the center where Lottie is
    alignItems: "center",
  },
});
