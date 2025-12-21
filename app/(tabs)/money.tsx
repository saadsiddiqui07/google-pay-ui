import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
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

      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ paddingVertical: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <View
                style={{
                  width: 40,
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/bank-logo.webp")}
                  style={{ width: 36, height: 36 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text
                  variant="bodyLarge"
                  style={{
                    color: theme.colors.onBackground,
                    fontWeight: "700",
                  }}
                >
                  State Bank of India
                </Text>
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginTop: 2,
                  }}
                >
                  *****48347
                </Text>
              </View>
            </View>
            <View>
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.primary, fontWeight: "bold" }}
              >
                Check balance
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingVertical: 12, marginTop: 8 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <View
                style={{
                  width: 40,
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="speedometer"
                  size={36}
                  color={theme.colors.onBackground}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text
                  variant="bodyLarge"
                  style={{
                    color: theme.colors.onBackground,
                    fontWeight: "700",
                  }}
                >
                  CIBIL score
                </Text>
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginTop: 2,
                  }}
                >
                  Check for free, instantly
                </Text>
              </View>
            </View>
            <View>
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.primary, fontWeight: "bold" }}
              >
                Check now
              </Text>
            </View>
          </View>
        </View>
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
