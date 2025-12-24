import React, { memo } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

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

/**
 * Component to display a single transaction item.
 * Optimized with memo.
 */
const Transaction = memo(function Transaction({ item }: TransactionProps) {
  const theme = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/transaction-history",
      params: {
        name: item.name,
        amount: item.amount,
        date: item.date,
        // Passing basic info, details can be mocked or fetched
      }
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
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
    </TouchableOpacity>
  );
});

export default Transaction;

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
