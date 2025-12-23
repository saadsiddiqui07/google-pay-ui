import LottieView from "lottie-react-native";
import React, { memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import HomeHeader from "./home-header";

const { height } = Dimensions.get("window");

/**
 * Component to display the home banner with animation.
 * Optimized with memo.
 */
const HomeBanner = memo(function HomeBanner() {
  return (
    <View style={{ height: height * 0.25, marginBottom:12 }}>
      <LottieView
        source={require("../assets/banner.json")}
        autoPlay
        loop
        style={styles.background}
        resizeMode="cover"
        duration={6000}
      />
      <View style={styles.content}>
        <HomeHeader />
      </View>
    </View>
  );
});

export default HomeBanner;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity:0.7
  },
  content: {
    padding: 16,
  },
});
