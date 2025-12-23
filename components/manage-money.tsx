import React, { memo } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

const { width } = Dimensions.get("window");

// For the loan cards
const CARD_GAP = 16;
const PADDING = 32; // 16 * 2 (horizontal padding from the parent container)
const CARD_WIDTH = (width - PADDING - CARD_GAP) / 2;

/**
 * Component to display money management options (Loans, etc.).
 * Optimized with memo.
 */
const ManageMoney = memo(function ManageMoney({ variant = "home" }: { variant?: "home" | "money" }) {
  const theme = useTheme();

  const onMoneyScreen = variant === "money";

  return (
    <View>
      <Text
        variant="titleLarge"
        style={{ marginBottom: 16, fontWeight: "bold", color: theme.colors.onBackground }}
      >
        {onMoneyScreen ? "Credit for you" : "Manage your money"}  
      </Text>

      {/* Loan Cards */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        {/* Personal Loan Card */}
        <TouchableOpacity
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.inverseOnSurface,
              width: CARD_WIDTH,
            },
          ]}
          activeOpacity={0.8}
        >
          <Icon source={onMoneyScreen ? "sack" : "script-text-outline"} size={24} color={onMoneyScreen ? 'gold' : theme.colors.primary} />
          <Text
            variant="titleMedium"
            style={{ marginTop: 12, fontWeight: "500", color: theme.colors.onSurface }}
          >
            Personal loan
          </Text>
          <Text variant="bodySmall" style={{ marginTop: 4, color: theme.colors.onSurfaceVariant }}>
            Up to ₹10 lakh, instant approval
          </Text>
          <Text
            variant="labelLarge"
            style={{ marginTop: 16, color: theme.colors.primary }}
          >
            Apply now
          </Text>
        </TouchableOpacity>

        {/* Gold Loan Card */}
        <TouchableOpacity
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.inverseOnSurface,
              width: CARD_WIDTH,
            },
          ]}
          activeOpacity={0.8}
        >
          <Icon source="gold" size={24} color={onMoneyScreen ? 'gold' : theme.colors.primary} />
          <Text
            variant="titleMedium"
            style={{ marginTop: 12, fontWeight: "500", color: theme.colors.onSurface }}
          >
            Gold loan
          </Text>
          <Text variant="bodySmall" style={{ marginTop: 4, color: theme.colors.onSurfaceVariant }}>
            Interest rate starting at 0.96% monthly
          </Text>
          <Text
            variant="labelLarge"
            style={{ marginTop: 16, color: theme.colors.primary }}
          >
            Apply now
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
});

export default ManageMoney;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    // Minimum height to align contents roughly if text wraps differently,
    // but flex usually handles it.
  },
  // listItem style removed as it's handled by Option component
});
