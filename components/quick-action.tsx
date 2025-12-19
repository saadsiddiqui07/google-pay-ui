import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

const { width } = Dimensions.get("window");
const NUM_COLUMNS = 4;
const PADDING = 32; // 16 * 2 (horizontal padding from the parent container)
const ITEM_WIDTH = (width - PADDING) / NUM_COLUMNS;
const ICON_CONTAINER_SIZE = ITEM_WIDTH * 0.70;
const ICON_SIZE = ICON_CONTAINER_SIZE * 0.5;

interface QuickActionProps {
  icon: string;
  firstLineText: string;
  secondLineText?: string;
  onPress?: () => void;
  iconBackgroundColor?: string;
  iconColor?: string;
  isImage?: boolean; // If true, treat icon as image uri
  variant?: 'default' | 'circular';
  hasNotification?: boolean;
}

export default function QuickAction({
  icon,
  firstLineText,
  secondLineText,
  onPress,
  iconBackgroundColor = "#0B57CF",
  iconColor = "#FFFFFF",
  isImage = false,
  variant = 'default',
  hasNotification = false,
}: QuickActionProps) {
  const theme = useTheme();

  const containerRadius = variant === 'circular' ? ICON_CONTAINER_SIZE / 2 : ICON_CONTAINER_SIZE / 4;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor, borderRadius: containerRadius }]}>
        {isImage ? (
           <Image source={{ uri: icon }} style={{ width: ICON_SIZE, height: ICON_SIZE, resizeMode: 'contain' }} />
        ) : (
           <Icon source={icon} size={ICON_SIZE} color={iconColor} />
        )}
        
        {hasNotification && (
          <View style={styles.notificationDot} />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text
          variant="labelMedium"
          style={[styles.label, { color: theme.colors.onBackground }]}
          numberOfLines={1}
        >
          {firstLineText}
        </Text>
        {secondLineText && (
          <Text
            variant="labelMedium"
            style={[styles.label, { color: theme.colors.onBackground }]}
            numberOfLines={1}
          >
            {secondLineText}
          </Text>
        )}
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#A8C7FA', // Light blue notification color from screenshot
    borderWidth: 2,
    borderColor: '#A8C7FA',
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
