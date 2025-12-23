import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar, FAB, IconButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentInputScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useTheme();

  const name = (params.name as string) || "User";
  const image = params.image as string;
  const phone = "+91 00000 00000";

  const [amount, setAmount] = useState("");

  const formatAmount = (value: string) => {
    // Remove all non-numeric characters except decimal
    const cleanValue = value.replace(/[^0-9.]/g, "");
    
    // Split into integer and decimal parts
    const parts = cleanValue.split(".");
    
    // Handle integer part formatting (Indian Numbering System)
    let integerPart = parts[0];
    if (integerPart.length > 3) {
      const lastThree = integerPart.substring(integerPart.length - 3);
      const otherNumbers = integerPart.substring(0, integerPart.length - 3);
      integerPart = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    }
    
    // Reassemble
    if (parts.length > 1) {
      // Limit decimal to 2 digits
      return `${integerPart}.${parts[1].slice(0, 2)}`;
    }
    
    return integerPart;
  };

  const handleChangeText = (text: string) => {
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
  };

  const handlePay = () => {
    console.log("Pay", amount);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
       <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="close"
          size={24}
          onPress={() => router.back()}
          iconColor={theme.colors.onSurface}
        />
        <IconButton icon="dots-vertical" size={24} iconColor={theme.colors.onSurface} />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginTop: -60 }}>
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
                <Text variant="titleMedium" style={{ marginTop: 16, color: theme.colors.onSurface }}>
                Paying {name}
                </Text>
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>
                {phone}
                </Text>

                <View style={styles.inputContainer}>
                    <Text style={[styles.currencySymbol, { color: theme.colors.onSurface }]}>₹</Text>
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

                <View style={[styles.noteContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
                    <TextInput 
                        placeholder="Add a note"
                        placeholderTextColor={theme.colors.onSurfaceVariant}
                        style={{ color: theme.colors.onSurface, fontSize: 16, textAlign: 'center' }}
                    />
                </View>
            </View>

            {/* Pay Button - Only show if amount is entered */}
            {amount && amount !== "0" ? (
                <View style={styles.fabContainer}>
                    <FAB
                        icon="arrow-right"
                        style={{ backgroundColor: theme.colors.primary, borderRadius: 16 }}
                        color={theme.colors.onPrimary}
                        onPress={handlePay}
                    />
                </View>
            ) : null}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
  },
  noteContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 150,
    maxWidth: 300,
    alignItems: 'center',
  },
  fabContainer: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
  }
});
