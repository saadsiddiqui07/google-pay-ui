import HomeHeader from "@/components/home-header";
import QuickAction from "@/components/quick-action";
import React from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <HomeHeader />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 24,
          }}
        >
          <QuickAction
            icon="qrcode-scan"
            label="Scan any QR code"
            onPress={() => {}}
          />
          <QuickAction
            icon="currency-rupee"
            label="Pay to anyone"
            onPress={() => {}}
          />
          <QuickAction icon="bank" label="Bank transfer" onPress={() => {}} />
          <QuickAction
            icon="cellphone-charging"
            label="Mobile recharge"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
}
