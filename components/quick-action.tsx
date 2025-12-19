import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

const { width } = Dimensions.get("window");
const NUM_COLUMNS = 4;
const PADDING = 32; // 16 * 2 (horizontal padding from the parent container)
const ITEM_WIDTH = (width - PADDING) / NUM_COLUMNS;
const ICON_CONTAINER_SIZE = ITEM_WIDTH * 0.70;
const ICON_SIZE = ICON_CONTAINER_SIZE * 0.5;
// const BORDER_RADIUS = ICON_CONTAINER_SIZE / 2; // Make it circular by default or controlled? Original was roughly circular but borderRadius=16 on 64 size. Here it is dynamic. Let's make it fully circular if requested or keep as is.
// Original was 64 size, 16 radius -> 1/4.
// Let's stick to 1/4 logic or make it fully circular for "variants".
// The image shows circular icons for Offers.
// Let's keep 1/4 as default and allow override.

interface QuickActionProps {
  icon: string;
  firstLineText: string;
  secondLineText?: string;
  onPress?: () => void;
  iconBackgroundColor?: string;
  iconColor?: string;
  isImage?: boolean; // If true, treat icon as image uri
  variant?: 'default' | 'circular';
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
}: QuickActionProps) {
  const theme = useTheme();

  const containerRadius = variant === 'circular' ? ICON_CONTAINER_SIZE / 2 : ICON_CONTAINER_SIZE / 4;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor, borderRadius: containerRadius }]}>
        {isImage ? (
           // If it's an image, we assume it's a full image or an icon image? 
           // If isImage is true, we can use Image component.
           // But looking at the request, the user might just pass an icon name.
           // If `icon` is a URL, we use Image.
           // Let's try to detect or just trust `isImage`.
           <Image source={{ uri: icon }} style={{ width: ICON_SIZE, height: ICON_SIZE, resizeMode: 'contain' }} />
        ) : (
           <Icon source={icon} size={ICON_SIZE} color={iconColor} />
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
