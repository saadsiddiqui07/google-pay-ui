import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeHeader() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={[
        styles.container,
        {
          // backgroundColor: theme.colors.background,
          paddingTop: insets.top + 8,
        },
      ]}
    >
      <View style={styles.contentContainer}>
        {/* Search Bar */}
        <Pressable style={{ flex: 1 }} onPress={() => router.push("/search")}>
          <Surface
            style={[
              styles.searchBar,
              {
                backgroundColor: theme.dark ? "#303134" : "#F1F3F4",
                borderColor: theme.dark ? "#5F6368" : "#DADCE0",
              },
            ]}
            elevation={0}
          >
            <MaterialIcons
              name="search"
              size={24}
              color={theme.colors.onSurfaceVariant}
              style={styles.searchIcon}
            />
            <Text
              variant="bodyLarge"
              style={{
                color: theme.colors.onSurfaceVariant,
                flex: 1,
              }}
              numberOfLines={1}
            >
              Pay by name or phone number
            </Text>
          </Surface>
        </Pressable>

        {/* Profile Icon */}
        <TouchableOpacity style={styles.profileContainer} onPress={() => router.push("/profile")}>
          <View
            style={[
              styles.avatarContainer,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
          >
            <MaterialIcons
              name="person"
              size={24}
              color={theme.colors.onPrimaryContainer}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 12,
    paddingBottom: 24,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  profileContainer: {
    marginLeft: 4,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
