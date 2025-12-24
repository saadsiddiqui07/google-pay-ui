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
import { useRouter } from "expo-router";
import React, { memo, useCallback } from "react";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";

/**
 * Home screen component.
 * Optimized with memo and callbacks.
 */
const HomeScreen = memo(function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  const handleQuickActionPress = useCallback(() => {},
  []);

  const handleActionPillPress = useCallback(() => {},
  []);

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
            {QUICK_ACTIONS.map((action) => (
              <QuickAction
                key={action.icon}
                icon={action.icon}
                firstLineText={action.firstLineText}
                secondLineText={action.secondLineText}
                onPress={handleQuickActionPress}
              />
            ))}
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -16 }}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {ACTION_PILLS.map((pill) => (
              <ActionPill
                key={pill.icon}
                icon={pill.icon}
                iconColor={pill.iconColor}
                title={pill.title}
                subtitle={pill.subtitle}
                subtitleColor={pill.subtitleColor || theme.colors.onSurface}
                onPress={handleActionPillPress}
              />
            ))}
          </ScrollView>

          <PeopleGrid people={PEOPLE} />

          <BillsRecharges />

          <OffersRewards />

          <ManageMoney variant="home" />

          {/* List Items */}
          <View>
            {MANAGE_MONEY_DATA.map((item) => (
              <Option
                key={item.title}
                icon={item.icon}
                title={item.title}
                showChevron
                onPress={() => {
                  if (item.title === "See transaction history") {
                    router.navigate({
                      pathname: "/money",
                      params: { scrollTo: "history" },
                    });
                  }
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
});

export default HomeScreen;
