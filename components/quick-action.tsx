import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

interface QuickActionProps {
  icon: string;
  label: string;
  onPress?: () => void;
}

export default function QuickAction({
  icon,
  label,
  onPress,
}: QuickActionProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: "#0B57CF" }]}>
        <Icon source={icon} size={24} color="#FFFFFF" />
      </View>
      <Text
        variant="labelLarge"
        style={[styles.label, { color: theme.colors.onBackground }]}
        numberOfLines={2}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: 80,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    textAlign: "center",
    lineHeight: 18,
    fontWeight: "bold",
  },
});
