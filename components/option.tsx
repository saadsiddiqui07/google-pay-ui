import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Text, useTheme, Icon } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type OptionProps = {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode; // For custom right content like "Add" or Badge
  showChevron?: boolean; // Defaults to false, unless specified
  style?: ViewStyle;
};

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

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
