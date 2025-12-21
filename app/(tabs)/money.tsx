import ManageMoney from "@/components/manage-money";
import Transaction from "@/components/transaction";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const { height: screenHeight } = Dimensions.get("window");

const CONTAINER_HEIGHT = screenHeight / 4;

const TRANSACTIONS = [
  {
    id: "1",
    name: "JioFiber",
    date: "September 12, 2022",
    amount: "₹824.82",
    initial: "J",
    color: "#D93025",
  },
  {
    id: "2",
    name: "REVU PRABHAKARA RAO",
    date: "August 30, 2022 ",
    amount: "₹100",
    image: "https://i.pravatar.cc/150?u=Revu",
  },
  {
    id: "3",
    name: "Swiggy",
    date: "August 28, 2022",
    amount: "₹450",
    initial: "S",
    color: "#F9AB00",
  },
  {
    id: "4",
    name: "Uber",
    date: "August 25, 2022 ",
    amount: "₹120.50",
    initial: "U",
    color: "#000000",
  },
  {
    id: "5",
    name: "Zomato",
    date: "August 20, 2022 ",
    amount: "₹340",
    initial: "Z",
    color: "#E23744",
  },
];

export default function MoneyScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={[styles.header, { height: CONTAINER_HEIGHT }]}>
        <LottieView
          source={require("../../assets/money-tab.json")}
          autoPlay
          style={[StyleSheet.absoluteFill]}
          resizeMode="contain"
        />
        {/* Menu Icon */}
        <View style={styles.menuIcon}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color={theme.colors.onSurface}
          />
        </View>
        <Text
          variant="headlineMedium"
          style={[
            styles.title,
            { top: CONTAINER_HEIGHT / 3, color: theme.colors.onSurface },
          ]}
        >
          Money
        </Text>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ paddingVertical: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <View
                style={{
                  width: 40,
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/bank-logo.webp")}
                  style={{ width: 36, height: 36 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text
                  variant="bodyLarge"
                  style={{
                    color: theme.colors.onBackground,
                    fontWeight: "700",
                  }}
                >
                  State Bank of India
                </Text>
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginTop: 2,
                  }}
                >
                  *****48347
                </Text>
              </View>
            </View>
            <View>
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.primary, fontWeight: "bold" }}
              >
                Check balance
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingVertical: 12, marginTop: 8 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <View
                style={{
                  width: 40,
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="speedometer"
                  size={36}
                  color={theme.colors.onBackground}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text
                  variant="bodyLarge"
                  style={{
                    color: theme.colors.onBackground,
                    fontWeight: "700",
                  }}
                >
                  CIBIL score
                </Text>
                <Text
                  variant="bodySmall"
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    marginTop: 2,
                  }}
                >
                  Check for free, instantly
                </Text>
              </View>
            </View>
            <View>
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.primary, fontWeight: "bold" }}
              >
                Check now
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <ManageMoney variant="money" />
        </View>

        {/* Transaction History */}
        <View style={{ marginTop: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
              Transaction History
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 6,
                borderRadius: 20,
              }}
            >
              <Text
                variant="labelLarge"
                style={{
                  color: theme.colors.primary,
                  marginRight: 4,
                  fontWeight: "bold",
                }}
              >
                See all
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={16}
                color={theme.colors.primary}
              />
            </View>
          </View>

          <View>
            {TRANSACTIONS.map((item) => (
              <Transaction key={item.id} item={item} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    justifyContent: "center",
    position: "relative",
  },
  menuIcon: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
  title: {
    fontWeight: "700",
  },
});
