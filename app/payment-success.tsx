import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: windowWidth } = Dimensions.get("window");

export default function PaymentSuccessScreen() {
  const animation = useRef<LottieView>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useTheme();

  const amount = (params.amount as string) || "0";
  const name = (params.name as string) || "User";

  useEffect(() => {
    // Play animation on mount
    animation.current?.play();
  }, []);

  const handleDone = () => {
    router.dismissTo("/(tabs)");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.content, { width: windowWidth }]}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: windowWidth,
            height: windowWidth * 0.8,
            backgroundColor: "transparent",
          }}
          source={require("../assets/success-payment.json")}
          loop={true}
        />
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
});
