import ActionPill from "@/components/action-pill";
import BillsRecharges from "@/components/bills-recharges";
import HomeBanner from "@/components/home-banner";
import ManageMoney from "@/components/manage-money";
import OffersRewards from "@/components/offers-rewards";
import Option from "@/components/option";
import PeopleGrid from "@/components/people-grid";
import QuickAction from "@/components/quick-action";
import {
  ACTION_PILLS,
  MANAGE_MONEY_DATA,
  PEOPLE,
  QUICK_ACTIONS,
} from "@/constants/home-data";
import React from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <HomeBanner />
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: -20,
            gap: 24,
            paddingTop: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {QUICK_ACTIONS.map((action, index) => (
              <QuickAction
                key={index}
                icon={action.icon}
                firstLineText={action.firstLineText}
                secondLineText={action.secondLineText}
                onPress={() => {}}
              />
            ))}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -16 }}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {ACTION_PILLS.map((pill, index) => (
              <ActionPill
                key={index}
                icon={pill.icon}
                iconColor={pill.iconColor}
                title={pill.title}
                subtitle={pill.subtitle}
                subtitleColor={pill.subtitleColor || theme.colors.onSurface}
                onPress={() => {}}
              />
            ))}
          </ScrollView>

          <PeopleGrid people={PEOPLE} />

          <BillsRecharges />

          <OffersRewards />

          <ManageMoney variant="home" />

          {/* List Items */}
          <View>
            {MANAGE_MONEY_DATA.map((item, index) => (
              <Option
                key={index}
                icon={item.icon}
                title={item.title}
                showChevron
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}