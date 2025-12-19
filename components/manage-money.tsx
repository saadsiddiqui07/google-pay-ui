import { MANAGE_MONEY_DATA } from "@/constants/home-data";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

const { width } = Dimensions.get("window");

// For the loan cards
const CARD_GAP = 16;
const PADDING = 32; // 16 * 2 (horizontal padding from the parent container)
const CARD_WIDTH = (width - PADDING - CARD_GAP) / 2;

export default function ManageMoney() {
  const theme = useTheme();

  return (
    <View style={{ marginTop: 24 }}>
      <Text
        variant="titleLarge"
        style={{ marginBottom: 16, fontWeight: "500" }}
      >
        Manage your money
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
              backgroundColor: theme.dark ? "#5F6368" : "#DADCE0",
              width: CARD_WIDTH,
            },
          ]}
          activeOpacity={0.8}
        >
          <Icon source="script-text-outline" size={24} color="#A8C7FA" />
          <Text
            variant="titleMedium"
            style={{ marginTop: 12, fontWeight: "500", color: "#FFFFFF" }}
          >
            Personal loan
          </Text>
          <Text variant="bodySmall" style={{ marginTop: 4, color: "#C4C7C5" }}>
            Up to ₹10 lakh, instant approval
          </Text>
          <Text
            variant="labelLarge"
            style={{ marginTop: 16, color: "#A8C7FA" }}
          >
            Apply now
          </Text>
        </TouchableOpacity>

        {/* Gold Loan Card */}
        <TouchableOpacity
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surfaceDisabled,
              width: CARD_WIDTH,
            },
          ]}
          activeOpacity={0.8}
        >
          <Icon source="gold" size={24} color="#A8C7FA" />
          <Text
            variant="titleMedium"
            style={{ marginTop: 12, fontWeight: "500", color: "#FFFFFF" }}
          >
            Gold loan
          </Text>
          <Text variant="bodySmall" style={{ marginTop: 4, color: "#C4C7C5" }}>
            Interest rate starting at 0.96% monthly
          </Text>
          <Text
            variant="labelLarge"
            style={{ marginTop: 16, color: "#A8C7FA" }}
          >
            Apply now
          </Text>
        </TouchableOpacity>
      </View>

      {/* List Items */}
      <View style={{ marginTop: 8 }}>
        {MANAGE_MONEY_DATA.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.listItem}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon source={item.icon} size={24} color="#A8C7FA" />
              <Text
                variant="bodyLarge"
                style={{
                  marginLeft: 16,
                  color: theme.colors.onBackground,
                  flex: 1,
                }}
              >
                {item.title}
              </Text>
            </View>
            <Icon
              source="chevron-right"
              size={28}
              color={theme.colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    // Minimum height to align contents roughly if text wraps differently,
    // but flex usually handles it.
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingRight: 16,
  },
});
