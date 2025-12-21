import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface TransactionProps {
  item: {
    id: string;
    name: string;
    date: string;
    amount: string;
    initial?: string;
    color?: string;
    image?: string;
  };
}

export default function Transaction({ item }: TransactionProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View
          style={[
            styles.avatarContainer,
            { backgroundColor: item.color || "#ddd" },
          ]}
        >
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>{item.initial}</Text>
          )}
        </View>
        <View style={styles.textContainer}>
          <Text
            variant="bodyLarge"
            style={[styles.nameText, { color: theme.colors.onBackground }]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text
            variant="bodySmall"
            style={{
              color: theme.colors.onSurfaceVariant,
              marginTop: 2,
            }}
          >
            {item.date}
          </Text>
        </View>
      </View>
      <View style={styles.amountContainer}>
        <Text
          variant="bodyLarge"
          style={[styles.amountText, { color: theme.colors.onBackground }]}
        >
          {item.amount}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginRight: 12,
  },
  avatarImage: {
    width: 40,
    height: 40,
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  nameText: {
    fontWeight: "bold",
  },
  amountContainer: {
    // If user wanted single column alignment, this container stays as is
    alignItems:'flex-start'
  },
  amountText: {
    fontWeight: "bold",
    textAlign: "right", // Keeping right aligned as per standard and image
  },
});
