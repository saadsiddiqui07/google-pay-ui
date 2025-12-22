import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Avatar, Button, IconButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PayHistoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useTheme();

  const name = (params.name as string) || "User";
  const image = params.image as string;
  const phone = "+91 96228 35745"; // Dummy phone
  const joinedDate = "November 2024"; // Dummy date

  // Helper to get initials
  const initials = name.charAt(0).toUpperCase();
  const avatarColor = "#8AB4F8"; // Hardcoded for now or pass via params if needed

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Custom Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => router.back()}
            iconColor={theme.colors.onBackground}
          />
          <View style={{ marginRight: 12 }}>
            {image ? (
              <Avatar.Image size={40} source={{ uri: image }} />
            ) : (
              <Avatar.Text
                size={40}
                label={initials}
                style={{ backgroundColor: avatarColor }}
                color="#fff"
              />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium" numberOfLines={1}>
              {name}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {phone}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <IconButton icon="phone" size={24} iconColor={theme.colors.onBackground} />
          <IconButton icon="dots-vertical" size={24} iconColor={theme.colors.onBackground} />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {/* User Profile Section */}
          <View style={{ alignItems: "center", marginTop: 40, marginBottom: 40 }}>
            {image ? (
              <Avatar.Image size={80} source={{ uri: image }} />
            ) : (
              <Avatar.Text
                size={80}
                label={initials}
                style={{ backgroundColor: avatarColor }}
                color="#fff"
                labelStyle={{ fontSize: 40 }}
              />
            )}
            <Text variant="headlineSmall" style={{ marginTop: 16, fontWeight: "500" }}>
              {name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
              <MaterialIcons name="verified-user" size={16} color="green" />
              <Text variant="bodyMedium" style={{ marginLeft: 4 }}>
                Banking name: {name.toUpperCase()}
              </Text>
            </View>
            <Text variant="bodyMedium" style={{ marginTop: 4 }}>
              {phone}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>
              Joined {joinedDate}
            </Text>
          </View>

          {/* Date Separator */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.outlineVariant }} />
            <Text
              variant="bodySmall"
              style={{ marginHorizontal: 16, color: theme.colors.onSurfaceVariant }}
            >
              1 Nov, 7:25 pm
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.outlineVariant }} />
          </View>

          {/* Transaction Card */}
          <View
            style={{
              alignSelf: "flex-end",
              backgroundColor: theme.colors.surfaceVariant, // or a specific card color
              borderRadius: 20,
              padding: 16,
              maxWidth: "80%",
              minWidth: 200,
              marginBottom: 16,
              borderTopRightRadius: 4, // Chat bubble effect
            }}
          >
            <Text variant="titleMedium" style={{ marginBottom: 8 }}>
              Payment to {name}
            </Text>
            <Text variant="displaySmall" style={{ fontWeight: "400" }}>
              ₹800
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
              <MaterialIcons name="check-circle" size={16} color="green" />
              <Text variant="bodySmall" style={{ marginLeft: 4, fontWeight: "500" }}>
                Paid • 1 Nov
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={16}
                color={theme.colors.onSurfaceVariant}
                style={{ marginLeft: "auto" }}
              />
            </View>
          </View>

          <Text
            variant="bodySmall"
            style={{ textAlign: "center", color: theme.colors.onSurfaceVariant, marginTop: 8 }}
          >
            You&apos;re 1 step closer to getting a new tick in <Text style={{ color: "#1a73e8", textDecorationLine: "underline" }}>Tick Squad!</Text>
          </Text>
        </ScrollView>

        {/* Bottom Input Bar */}
        <View
          style={[
            styles.bottomBar,
            { backgroundColor: theme.colors.background, borderColor: theme.colors.outlineVariant },
          ]}
        >
          <Button
            mode="contained"
            onPress={() => router.push({ pathname: "/payment-input", params: { name, image } })}
            style={{ borderRadius: 24, paddingHorizontal: 16 }}
            buttonColor={theme.colors.primary}
          >
            Pay
          </Button>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <TextInput
              placeholder="Message..."
              placeholderTextColor={theme.colors.onSurfaceVariant}
              style={[styles.input, { color: theme.colors.onSurface }]}
            />
            <TouchableOpacity>
               <MaterialCommunityIcons name="send" size={24} color={theme.colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "transparent", // Or theme.colors.outlineVariant if needed
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 0, // Removed border for cleaner look
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
});
