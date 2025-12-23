import { MaterialIcons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { memo, useCallback, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Avatar,
  FAB,
  IconButton,
  Button as PaperButton,
  RadioButton,
  Text,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const banks = [
  {
    id: "1",
    name: "Axis Bank",
    account: "••••6784",
    upi: "username@axis.com",
    logo: require("../assets/images/axis-bank.png"),
  },
  {
    id: "2",
    name: "HDFC Bank",
    account: "••••4321",
    upi: "username@hdfc.com",
    logo: require("../assets/images/bank-logo.png"),
  },
];

/**
 * Screen for payment input.
 * Optimized with memo and callbacks.
 */
const PaymentInputScreen = memo(function PaymentInputScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useTheme();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [isLoading, setIsLoading] = useState(false);

  const name = (params.name as string) || "User";
  const image = params.image as string;
  const phone = "+91 00000 00000";

  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("1");

  const openBottomSheet = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetRef.current?.present();
  }, []);

  const closeBottomSheet = useCallback(() => {
    if (!isLoading) {
      bottomSheetRef.current?.close();
    }
  }, [isLoading]);

  const handlePayment = useCallback(() => {
    if (!amount || !selectedBank) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      closeBottomSheet();
      router.push({ pathname: "/payment-success", params: { amount, name } });
    }, 2000);
  }, [amount, closeBottomSheet, router, selectedBank, name]);

  const formatAmount = useCallback((value: string) => {
    // Remove all non-numeric characters except decimal
    const cleanValue = value.replace(/[^0-9.]/g, "");

    // Split into integer and decimal parts
    const parts = cleanValue.split(".");

    // Handle integer part formatting (Indian Numbering System)
    let integerPart = parts[0];
    if (integerPart.length > 3) {
      const lastThree = integerPart.substring(integerPart.length - 3);
      const otherNumbers = integerPart.substring(0, integerPart.length - 3);
      integerPart =
        otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    }

    // Reassemble
    if (parts.length > 1) {
      // Limit decimal to 2 digits
      return `${integerPart}.${parts[1].slice(0, 2)}`;
    }

    return integerPart;
  }, []);

  const handleChangeText = useCallback(
    (text: string) => {
      // If text ends with a decimal and we already have one, ignore
      if (text.endsWith(".") && amount.includes(".")) {
        return;
      }

      if (text === "") {
        setAmount("");
        return;
      }

      // Get raw number for processing
      const raw = text.replace(/,/g, "");

      // Prevent multiple decimals
      if ((raw.match(/\./g) || []).length > 1) {
        return;
      }
      setAmount(formatAmount(raw));
    },
    [amount, formatAmount]
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={theme.dark ? 0.55 : 0.38} // controls how dull the background is
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="close"
          size={24}
          onPress={handleBack}
          iconColor={theme.colors.onSurface}
        />
        <IconButton
          icon="dots-vertical"
          size={24}
          iconColor={theme.colors.onSurface}
        />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginTop: -60,
            }}
          >
            {image ? (
              <Avatar.Image size={64} source={{ uri: image }} />
            ) : (
              <Avatar.Text
                size={64}
                label={name.charAt(0).toUpperCase()}
                style={{ backgroundColor: theme.colors.primaryContainer }}
                color={theme.colors.onPrimaryContainer}
              />
            )}
            <Text
              variant="titleMedium"
              style={{ marginTop: 16, color: theme.colors.onSurface }}
            >
              Paying {name}
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
            >
              {phone}
            </Text>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.currencySymbol,
                  { color: theme.colors.onSurface },
                ]}
              >
                ₹
              </Text>
              <TextInput
                style={[styles.amountInput, { color: theme.colors.onSurface }]}
                value={amount}
                onChangeText={handleChangeText}
                keyboardType="decimal-pad"
                autoFocus
                placeholder="0"
                placeholderTextColor={theme.colors.onSurfaceVariant}
                cursorColor={theme.colors.primary}
              />
            </View>

            <View
              style={[
                styles.noteContainer,
                {
                  backgroundColor: theme.colors.surfaceVariant,
                  paddingVertical: Platform.OS === "ios" ? 12 : 0,
                },
              ]}
            >
              <TextInput
                placeholder="Add a note"
                placeholderTextColor={theme.colors.onSurfaceVariant}
                style={{
                  color: theme.colors.onSurface,
                  fontSize: 16,
                  textAlign: "center",
                }}
              />
            </View>
          </View>

          {/* Pay Button - Triggers Bottom Sheet */}
          {amount && amount !== "0" ? (
            <View style={styles.fabContainer}>
              <FAB
                icon="arrow-right"
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: 16,
                }}
                color={theme.colors.onPrimary}
                onPress={openBottomSheet}
              />
            </View>
          ) : null}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <BottomSheetModalProvider>
        <BottomSheetModal
          backdropComponent={renderBackdrop}
          ref={bottomSheetRef}
          enableDynamicSizing
          backgroundStyle={{ backgroundColor: theme.colors.surfaceVariant }}
          handleIndicatorStyle={{
            backgroundColor: theme.colors.inverseSurface,
          }}
        >
          <BottomSheetView
            style={{
              paddingBottom: 16,
            }}
          >
            {isLoading ? (
              <View
                style={{ flex: 1, alignItems: "center", gap: 8, padding: 12 }}
              >
                <MaterialIcons
                  name="lock"
                  size={32}
                  color={theme.colors.primary}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    gap: 12,
                  }}
                >
                  <ActivityIndicator animating={true} size={18} theme={theme} />
                  <Text
                    variant="bodyLarge"
                    style={{
                      color: theme.colors.onSurfaceVariant,
                      fontWeight: "700",
                    }}
                  >
                    Processing payment securely...
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  padding: 16,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.onSurfaceVariant,
                    fontSize: 12,
                    marginBottom: 12,
                    fontWeight: "bold",
                    paddingHorizontal: 16,
                  }}
                >
                  CHOOSE ACCOUNT TO PAY
                </Text>

                {banks.map((bank) => (
                  <TouchableOpacity
                    key={bank.id}
                    style={[styles.bankRow]}
                    onPress={() => setSelectedBank(bank.id)}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={bank.logo}
                        style={styles.bankLogo}
                        resizeMode="contain"
                      />
                      <View style={{ marginLeft: 12 }}>
                        <Text
                          variant="bodyLarge"
                          style={{
                            color: theme.colors.onSurface,
                            fontWeight: "500",
                          }}
                        >
                          {bank.name} {bank.account}
                        </Text>
                        <Text
                          variant="bodySmall"
                          style={{ color: theme.colors.onSurfaceVariant }}
                        >
                          {bank.upi}
                        </Text>
                      </View>
                    </View>
                    <RadioButton
                      value={bank.id}
                      status={
                        selectedBank === bank.id ? "checked" : "unchecked"
                      }
                      onPress={() => setSelectedBank(bank.id)}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                ))}

                <View style={{ marginVertical: 8 }}>
                  <PaperButton
                    mode="contained"
                    onPress={handlePayment}
                    style={{ borderRadius: 24 }}
                    contentStyle={{ height: 48 }}
                    icon="lock"
                    buttonColor={theme.colors.primary}
                    textColor={theme.colors.onPrimary}
                  >
                    Pay securely ₹{amount}
                  </PaperButton>
                </View>
              </View>
            )}
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
});

export default PaymentInputScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  currencySymbol: {
    fontSize: 56,
    fontWeight: "400",
    marginRight: 4,
  },
  amountInput: {
    fontSize: 56,
    fontWeight: "400",
    minWidth: 50,
    textAlign: "center",
  },
  noteContainer: {
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 150,
    maxWidth: 300,
    alignItems: "center",
  },
  fabContainer: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  bankRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    // paddingHorizontal: 16,
  },
  bankLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  loadingCotainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
