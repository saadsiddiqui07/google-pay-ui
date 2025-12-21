import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const { height: screenHeight } = Dimensions.get("window");

const CONTAINER_HEIGHT = screenHeight / 4;

export default function MoneyScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={[styles.header, { height: CONTAINER_HEIGHT }]}>
        <LottieView
          source={require("../../assets/money-tab.json")}
          autoPlay
          style={[StyleSheet.absoluteFill]}
          resizeMode="contain"
        />
        {/* Menu Icon */}
        <View style={styles.menuIcon}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color={theme.colors.onSurface}
          />
        </View>
        <Text
          variant="headlineMedium"
          style={[
            styles.title,
            { top: CONTAINER_HEIGHT / 3, color: theme.colors.onSurface },
          ]}
        >
          Money
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    justifyContent: "center",
    position: "relative",
  },
  menuIcon: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  title: {
    fontWeight: "700",
  },
});
