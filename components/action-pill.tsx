import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

interface ActionPillProps {
  icon: string;
  title: string;
  subtitle: string;
  subtitleColor?: string;
  iconColor?: string;
  onPress?: () => void;
}

export default function ActionPill({
  icon,
  title,
  subtitle,
  subtitleColor,
  iconColor = '#FFFFFF',
  onPress,
}: ActionPillProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
    activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.container,
        {
          borderColor: theme.colors.outline,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.surfaceDisabled }]}>
        <Icon source={icon} size={24} color={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <Text
          variant="labelMedium"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          {title}
        </Text>
        <Text
          variant="labelMedium"
          style={{ color: subtitleColor || theme.colors.onSurfaceVariant, fontWeight: 'bold' }}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    borderWidth: 1,
    marginRight: 12,
    minWidth: 120,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    justifyContent: 'center',
  },
});
