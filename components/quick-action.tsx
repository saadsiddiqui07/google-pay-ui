import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

const { width } = Dimensions.get("window");
const NUM_COLUMNS = 4;
const PADDING = 32; // 16 * 2 (horizontal padding from the parent container)
const ITEM_WIDTH = (width - PADDING) / NUM_COLUMNS;
const ICON_CONTAINER_SIZE = ITEM_WIDTH * 0.75;
const ICON_SIZE = ICON_CONTAINER_SIZE * 0.5;
const BORDER_RADIUS = ICON_CONTAINER_SIZE / 4;

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
        <Icon source={icon} size={ICON_SIZE} color="#FFFFFF" />
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
    width: ITEM_WIDTH,
  },
  iconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
  },
  label: {
    textAlign: "center",
    lineHeight: 16,
    fontWeight: "600",
  },
});
