import ActionPill from "@/components/action-pill";
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
            firstLineText="Scan any"
            secondLineText="QR code"
            onPress={() => {}}
          />
          <QuickAction
            icon="send"
            firstLineText="Pay"
            secondLineText="anyone"
            onPress={() => {}}
          />
          <QuickAction
            icon="bank"
            firstLineText="Bank"
            secondLineText="transfer"
            onPress={() => {}}
          />
          <QuickAction
            icon="cellphone-charging"
            firstLineText="Mobile"
            secondLineText="recharge"
            onPress={() => {}}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 24, marginHorizontal: -16 }}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          <ActionPill
            icon="rocket-launch"
            iconColor="#4285F4"
            title="UPI Lite"
            subtitle="Activate"
            subtitleColor="#4285F4"
            onPress={() => {}}
          />
          <ActionPill
            icon="trophy"
            iconColor="#FBBC04"
            title="Rewards"
            subtitle="New"
            subtitleColor={theme.colors.onSurface}
            onPress={() => {}}
          />
           <ActionPill
            icon="contactless-payment"
            iconColor="#34A853"
            title="UPI ID"
            subtitle="saadsiddiqui927@okicici"
            subtitleColor={theme.colors.onSurface}
            onPress={() => {}}
          />
        </ScrollView>
      </ScrollView>
    </View>
  );
}
