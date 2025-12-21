import Option from "@/components/option";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Surface, Text, useTheme } from "react-native-paper";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const CONTAINER_HEIGHT = screenHeight / 4;

const Options = React.memo(() => {
  return (
    <View style={{ marginTop: 24 }}>
      <Option
        icon="credit-card-outline"
        title="Pay with credit or debit cards"
        subtitle="Pay bills with your card"
        rightElement={
          <Text style={{ color: "#4285F4", fontWeight: "500" }}>Add</Text>
        }
      />
      <Option
        icon="qrcode"
        title="Your QR code"
        subtitle="Use to receive money from any UPI app"
      />
      <Option
        icon="account-heart-outline"
        title="UPI Circle"
        subtitle="Help people you trust make UPI payments"
        rightElement={
          <View
            style={{
              backgroundColor: "#A8C7FA",
              paddingHorizontal: 8,
              paddingVertical: 2,
              borderRadius: 12,
            }}
          >
            <Text
              style={{ color: "#001D35", fontSize: 10, fontWeight: "bold" }}
            >
              New
            </Text>
          </View>
        }
      />
      <Option icon="cog-outline" title="Settings" />
      <Option icon="account-circle-outline" title="Manage Google account" />
      <Option icon="help-circle-outline" title="Get help" />
      <Option icon="web" title="Language" subtitle="English" />
    </View>
  );
});

Options.displayName = 'Options';

const PaymentMethods = React.memo(() => {
  const theme = useTheme();
  return (
    <Surface
      style={[
        styles.paymentCard,
        { backgroundColor: theme.dark ? "#1e1e1e" : "#eeeeeeff" },
      ]}
      elevation={2}
    >
      <View style={styles.paymentCardHeader}>
        <Text
          variant="titleMedium"
          style={{ color: theme.colors.onSurface, fontWeight: "500" }}
        >
          Set up payment methods 1/3
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={theme.colors.onSurfaceVariant}
        />
      </View>

      <View style={styles.paymentMethodsRow}>
        <PaymentMethodItem
          icon="bank-outline"
          title="Bank account"
          subtitle="1 account"
        />
        <PaymentMethodItem
          icon="credit-card-plus-outline"
          title="RuPay credit card"
          subtitle="Pay with UPI"
          badge
          highlight
        />
        <PaymentMethodItem
          icon="lightning-bolt-outline"
          title="UPI Lite"
          subtitle="Pay PIN-free"
          badge
          highlight
        />
      </View>
    </Surface>
  );
});

PaymentMethods.displayName = 'PaymentMethods';

const Rewards = React.memo(() => {
  return (
    <View style={styles.rewardsRow}>
      <TouchableOpacity
        style={[styles.rewardPill, { backgroundColor: "#38203D" }]}
      >
        <MaterialCommunityIcons
          name="ticket-percent-outline"
          size={24}
          color="#D88BF8"
          style={{ marginRight: 12 }}
        />
        <View>
          <Text
            variant="titleMedium"
            style={{ color: "#D88BF8", fontWeight: "bold" }}
          >
            20 rewards
          </Text>
          <Text variant="bodySmall" style={{ color: "#D88BF8" }}>
            View now
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.rewardPill, { backgroundColor: "#1A3338" }]}
      >
        <MaterialCommunityIcons
          name="account-group-outline"
          size={24}
          color="#6AD0D6"
          style={{ marginRight: 12 }}
        />
        <View>
          <Text
            variant="titleMedium"
            style={{ color: "#6AD0D6", fontWeight: "bold" }}
          >
            Get ₹201
          </Text>
          <Text variant="bodySmall" style={{ color: "#6AD0D6" }}>
            Refer a friend
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});

Rewards.displayName = 'Rewards';

const Header = React.memo(() => {
  const theme = useTheme();
  return (
    <View style={[styles.header, { height: CONTAINER_HEIGHT }]}>
      <LottieView
        source={require("../../assets/wallet.json")}
        autoPlay
        style={[
          StyleSheet.absoluteFill,
          { left: screenWidth / 2 - screenWidth / 3.5 },
        ]}
        resizeMode="contain"
      />
      {/* Menu Icon */}
      <View style={[styles.menuIcon, { top: CONTAINER_HEIGHT / 3 }]}>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={24}
          color={theme.colors.onSurface}
        />
      </View>

      <View style={styles.userInfo}>
        <Text
          variant="headlineMedium"
          style={[styles.nameText, { color: theme.colors.onSurface }]}
        >
          Saad Siddiqui
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.phoneText, { color: theme.colors.onSurfaceVariant }]}
        >
          8655030041
        </Text>
      </View>

      {/* Avatar Section */}
      <View style={[styles.avatarContainer, { top: screenHeight / 7.5 }]}>
        <Avatar.Text
          size={80}
          label="S"
          style={styles.avatar}
          labelStyle={styles.avatarLabel}
        />
        <View style={styles.qrBadge}>
          <MaterialCommunityIcons name="qrcode" size={20} color="white" />
        </View>
      </View>

      <View
        style={{
          width: screenWidth / 4,
          height: 8,
          backgroundColor: theme.colors.onSurfaceDisabled,
          bottom: CONTAINER_HEIGHT / 4,
          position: "absolute",
          borderRadius: 12,
          left: 16,
        }}
      />
    </View>
  );
});

Header.displayName = 'Header';

export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <Header />

      {/* Body Content */}
      <View style={styles.body}>
        {/* Rewards & Referrals */}
        <Rewards />

        {/* Payment Methods Card */}
        <PaymentMethods />

        {/* Options List */}
        <Options />
      </View>
    </ScrollView>
  );
}

const PaymentMethodItem = React.memo(({
  icon,
  title,
  subtitle,
  badge,
  highlight,
}: {
  icon: any;
  title: string;
  subtitle: string;
  badge?: boolean;
  highlight?: boolean;
}) => {
  const theme = useTheme();

  return (
    <View style={styles.paymentMethodItem}>
      <View style={styles.iconWrapper}>
        {highlight && <View style={styles.dottedCircle} />}
        <MaterialCommunityIcons name={icon} size={32} color="#4285F4" />
        {badge && (
          <View style={styles.plusBadge}>
            <MaterialCommunityIcons name="plus" size={10} color="black" />
          </View>
        )}
      </View>
      <Text
        style={[styles.paymentMethodTitle, { color: theme.colors.onSurface }]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.paymentMethodSubtitle,
          { color: theme.colors.onSurfaceVariant },
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
});

PaymentMethodItem.displayName = 'PaymentMethodItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  menuIcon: {
    position: "absolute",
    right: 20,
    zIndex: 1,
  },
  userInfo: {
    justifyContent: "center",
    gap: 4, // Reduced gap
    marginTop: 36,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    color: "white",
    fontWeight: "700", // Adjusted weight
  },
  phoneText: {
    color: "white",
    fontSize: 16,
    opacity: 0.9,
  },
  emailText: {
    color: "white",
    fontSize: 16,
    opacity: 0.9,
  },
  avatarContainer: {
    position: "absolute",
    right: 24,
  },
  avatar: {
    backgroundColor: "#9C27B0",
  },
  avatarLabel: {
    fontSize: 36,
    color: "white",
  },
  qrBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#424242",
    borderRadius: 20,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 18, // Space for avatar overlap
  },
  rewardsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  rewardPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 28, // Pill shape
  },
  paymentCard: {
    borderRadius: 16,
    padding: 16,
  },
  paymentCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  paymentMethodsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // Align tops
  },
  paymentMethodItem: {
    alignItems: "center",
    width: "30%",
  },
  iconWrapper: {
    marginBottom: 12,
    position: "relative",
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  dottedCircle: {
    position: "absolute",
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderWidth: 1,
    borderColor: "#555",
    borderStyle: "dashed",
    borderRadius: 30,
  },
  plusBadge: {
    position: "absolute",
    bottom: 0,
    right: -4,
    backgroundColor: "#A8C7FA", // Light blue
    borderRadius: 10,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentMethodTitle: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 4,
  },
  paymentMethodSubtitle: {
    color: "#aaa",
    fontSize: 10,
    textAlign: "center",
  },
});
