import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Icon, Text, TouchableRipple, useTheme } from 'react-native-paper';

export type OptionProps = {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode; // For custom right content like "Add" or Badge
  showChevron?: boolean; // Defaults to false, unless specified
  style?: ViewStyle;
};

// @TODO: fix ripple effect for Android

export default function Option({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showChevron = false,
  style,
}: OptionProps) {
  const theme = useTheme();
  const rippleColor = theme.dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <TouchableRipple
      style={[style]}
      onPress={onPress || (() => {})}
      rippleColor={rippleColor}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.leftContent}>
          <View style={styles.iconContainer}>
            {/* Using Paper Icon to support source prop flexible if needed, 
                but for consistency with profile we can use MaterialCommunityIcons directly if source is string name 
                However, Icon from paper handles source string as MCI usually. 
                Let's stick to Icon from paper as manage-money uses it. */}
            <Icon source={icon} size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text variant="bodyLarge" style={{ color: theme.colors.onBackground, fontWeight: '500' }}>
              {title}
            </Text>
            {subtitle && (
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginTop: 2 }}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.rightContent}>
          {rightElement}
          {showChevron && (
            <Icon source="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
          )}
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
     paddingVertical: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  iconContainer: {
    width: 40,
    alignItems: 'flex-start', // Align icon to left
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
