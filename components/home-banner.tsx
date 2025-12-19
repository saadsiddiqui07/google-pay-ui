import React from "react";
import { StyleSheet, View } from "react-native";
import HomeHeader from "./home-header";

export default function HomeBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.content}>
        <HomeHeader />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    position: "relative",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#EA4335",
  },
  content: {
    padding: 16,
  },
});
