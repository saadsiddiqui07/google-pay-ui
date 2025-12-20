import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Menu Icon */}
        <View style={styles.menuIcon}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="white"
          />
        </View>

        <View style={styles.userInfo}>
          <Text variant="headlineLarge" style={styles.nameText}>
            Saad Siddiqui
          </Text>
          <Text variant="bodyLarge" style={styles.phoneText}>
            8655030041
          </Text>
        </View>

        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <Avatar.Text
            size={80}
            label="S"
            style={styles.avatar}
            labelStyle={styles.avatarLabel}
          />
          <View style={styles.qrBadge}>
            <MaterialCommunityIcons name="qrcode" size={20} color="white" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "royalblue", // Red color for now
    height: 220,
    paddingHorizontal: 20,
    paddingBottom: 40, // Space for content above bottom edge
    justifyContent: "center",
    position: "relative",
  },
  menuIcon: {
    position: "absolute",
    top: 50, // Roughly status bar area
    right: 20,
    zIndex: 1,
  },
  userInfo: {
    justifyContent: "center",
    gap: 12,
    marginTop: 32,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    color: "white",
    fontWeight: "700",
  },
  phoneText: {
    color: "white",
    marginTop: 4,
    fontSize: 16,
    opacity: 0.9,
  },
  avatarContainer: {
    position: "absolute",
    top: 120,
    right: 24,
  },
  avatar: {
    backgroundColor: "#9C27B0", // Purple color
  },
  avatarLabel: {
    fontSize: 36,
    color: "white",
  },
  qrBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#424242", // Dark grey for QR background
    borderRadius: 20,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4, // Shadow for android
  },
});
