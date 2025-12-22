import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Avatar, Surface, Text, useTheme } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";


export default function UserQRCodeScreen() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="download" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* QR Card */}
        <Surface style={[styles.card]} elevation={0}>
          <View style={styles.userInfo}>
            <Avatar.Text
              size={40}
              label="S"
              style={{ backgroundColor: "#8e24aa" }}
              labelStyle={{ color: "white" }}
            />
            <View style={styles.nameContainer}>
              <Text variant="titleMedium" style={styles.name}>
                Saad Siddiqui
              </Text>
            </View>
          </View>

          <View style={styles.qrWrapper}>
            <View style={styles.qrContainer}>
              <QRCode
                value="upi://pay?pa=saadsiddiqui927@okicici&pn=Saad%20Siddiqui"
                size={200}
                backgroundColor="white"
                color="black"
              />
            </View>
            
            {/* Center Logo Overlay */}
            <View style={styles.centerLogo}>
                <View style={styles.logoCircle}>
                   {/* Simplified GPay Logo representation */}
                   <View style={styles.gLogo}>
                       <View style={[styles.gBar, { backgroundColor: '#EA4335', top: 0, left: 0 }]} />
                       <View style={[styles.gBar, { backgroundColor: '#4285F4', top: 0, right: 0 }]} />
                       <View style={[styles.gBar, { backgroundColor: '#34A853', bottom: 0, left: 0 }]} />
                       <View style={[styles.gBar, { backgroundColor: '#FBBC05', bottom: 0, right: 0 }]} />
                       <View style={styles.gInner} />
                   </View>
                </View>
            </View>
          </View>

          <Text style={styles.scanText}>Scan to pay with any UPI app</Text>

          <View style={styles.bankInfo}>
            <View style={styles.bankLogo}>
                <MaterialCommunityIcons name="star" size={14} color="#D84315" />
            </View>
            <Text style={styles.bankText}>Bank of India 4983</Text>
          </View>

          <TouchableOpacity style={styles.upiIdContainer}>
            <Text style={styles.upiLabel}>UPI ID: </Text>
            <Text style={styles.upiValue}>saadsiddiqui927@okicici</Text>
            <MaterialCommunityIcons
              name="content-copy"
              size={16}
              color="#b0b0b0"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </Surface>

        <TouchableOpacity style={styles.switchQrContainer}>
          <Text style={styles.switchQrText}>
            Want to join UPI Circle? <Text style={styles.switchLink}>Switch QR</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.outlineButton}>
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={20}
            color="#a8c7fa"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.outlineButtonText}>Open scanner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filledButton}>
          <MaterialCommunityIcons
            name="share-variant-outline"
            size={20}
            color="#0b141a"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.filledButtonText}>Share QR code</Text>
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
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  nameContainer: {
    marginLeft: 12,
  },
  name: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
  },
  qrWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 4,
  },
  centerLogo: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  logoCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#f1f3f4',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
  },
  gLogo: {
      width: 20,
      height: 20,
      position: 'relative',
  },
  gBar: {
      width: 10,
      height: 10,
      position: 'absolute',
  },
  gInner: {
      width: 12,
      height: 12,
      backgroundColor: '#f1f3f4',
      position: 'absolute',
      top: 4,
      left: 4,
      borderRadius: 6,
      zIndex: 10,
  },
  scanText: {
    color: "#e3e3e3",
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
      backgroundColor: 'white',
      borderRadius: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
  },
  bankText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  upiIdContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  upiLabel: {
    color: "#b0b0b0",
    fontSize: 14,
  },
  upiValue: {
    color: "#e3e3e3",
    fontSize: 14,
  },
  switchQrContainer: {
    marginBottom: 40,
  },
  switchQrText: {
    color: "#e3e3e3",
    fontSize: 14,
  },
  switchLink: {
    color: "#a8c7fa",
    textDecorationLine: "underline",
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
    borderColor: "#5f6368",
    borderRadius: 24,
    marginRight: 8,
  },
  outlineButtonText: {
    color: "#a8c7fa",
    fontSize: 14,
    fontWeight: "500",
  },
  filledButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#a8c7fa",
    borderRadius: 24,
    marginLeft: 8,
  },
  filledButtonText: {
    color: "#0b141a",
    fontSize: 14,
    fontWeight: "500",
  },
});
