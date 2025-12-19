import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

interface QuickActionProps {
  icon: string;
  firstLineText: string;
  secondLineText: string;
  onPress?: () => void;
}

export default function QuickAction({
  icon,
  firstLineText,
  secondLineText,
  onPress,
}: QuickActionProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: "#0B57CF" }]}>
        <Icon source={icon} size={28} color="#FFFFFF" />
      </View>
      <View style={styles.textContainer}>
        <Text
          variant="labelMedium"
          style={[styles.label, { color: theme.colors.onBackground }]}
          numberOfLines={1}
        >
          {firstLineText}
        </Text>
        <Text
          variant="labelMedium"
          style={[styles.label, { color: theme.colors.onBackground }]}
          numberOfLines={1}
        >
          {secondLineText}
        </Text>
      </View>
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
  textContainer: {
    alignItems: 'center',
  },
  label: {
    textAlign: "center",
    lineHeight: 16,
    fontWeight: "600",
  },
});
