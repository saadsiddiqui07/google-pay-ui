import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Surface, Text, useTheme } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const { height: screenHeight } = Dimensions.get("window");

export default function UserQRCodeScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={theme.colors.onBackground}
          />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons
              name="download"
              size={24}
              color={theme.colors.onBackground}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color={theme.colors.onBackground}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* QR Card */}
        <Surface
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              height: screenHeight * 0.55,
            },
          ]}
          elevation={0}
        >
          <View style={styles.userInfo}>
            <Avatar.Text
              size={40}
              label="S"
              style={{ backgroundColor: theme.colors.primary }}
              labelStyle={{ color: theme.colors.onPrimary }}
            />
            <View style={styles.nameContainer}>
              <Text
                variant="titleMedium"
                style={{
                  color: theme.colors.onSurface,
                  fontSize: 20,
                  fontWeight: "400",
                }}
              >
                Saad Siddiqui
              </Text>
            </View>
          </View>

          <View style={styles.qrWrapper}>
            <View style={styles.qrContainer}>
              <QRCode
                value="upi://pay?pa=saadsiddiqui927@okicici&pn=Saad%20Siddiqui"
                size={screenHeight * 0.25}
                backgroundColor="white"
                color="black"
              />
            </View>

            {/* Center Logo Overlay */}
            <View style={styles.centerLogo}>
              <View style={styles.logoCircle}>
                {/* Simplified GPay Logo representation */}
                <Image
                  source={require("../assets/images/google-pay-icon.png")}
                  style={styles.gPayLogo}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <Text
            style={[styles.scanText, { color: theme.colors.onSurfaceVariant }]}
          >
            Scan to pay with any UPI app
          </Text>

          <View style={styles.bankInfo}>
            <View style={styles.bankLogo}>
              <MaterialCommunityIcons
                name="star"
                size={14}
                color={theme.colors.error}
              />
            </View>
            <Text
              style={{
                color: theme.colors.onSurface,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Bank of India 4983
            </Text>
          </View>

          <TouchableOpacity style={styles.upiIdContainer}>
            <Text
              style={{ color: theme.colors.onSurfaceVariant, fontSize: 14 }}
            >
              UPI ID:{" "}
            </Text>
            <Text style={{ color: theme.colors.onSurface, fontSize: 14 }}>
              saadsiddiqui927@okicici
            </Text>
            <MaterialCommunityIcons
              name="content-copy"
              size={16}
              color={theme.colors.onSurfaceVariant}
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </Surface>

        <TouchableOpacity style={styles.switchQrContainer}>
          <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14 }}>
            Want to join UPI Circle?{" "}
            <Text
              style={{
                color: theme.colors.primary,
                textDecorationLine: "underline",
              }}
            >
              Switch QR
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.outlineButton, { borderColor: theme.colors.outline }]}
        >
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={20}
            color={theme.colors.primary}
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            Open scanner
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filledButton,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <MaterialCommunityIcons
            name="share-variant-outline"
            size={20}
            color={theme.colors.onPrimary}
            style={{ marginRight: 8 }}
          />
          <Text
            style={{
              color: theme.colors.onPrimary,
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            Share QR code
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerRight: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    width: "100%",
    marginBottom: 24,
  },
  gPayLogo: {
    width: 40,
    height: 40,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  nameContainer: {
    marginLeft: 12,
  },
  qrWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 4,
  },
  centerLogo: {
    position: "absolute",
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  gLogo: {
    width: 20,
    height: 20,
    position: "relative",
  },
  gBar: {
    width: 10,
    height: 10,
    position: "absolute",
  },
  gInner: {
    width: 12,
    height: 12,
    backgroundColor: "#f1f3f4",
    position: "absolute",
    top: 4,
    left: 4,
    borderRadius: 6,
    zIndex: 10,
  },
  scanText: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 24,
  },
  bankInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  bankLogo: {
    width: 32,
    height: 20,
    backgroundColor: "white",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  upiIdContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchQrContainer: {
    marginBottom: 40,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  outlineButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 24,
    marginRight: 8,
  },
  filledButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 24,
    marginLeft: 8,
  },
});
