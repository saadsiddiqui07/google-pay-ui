import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Button, Divider, IconButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionHistory() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();

  const getParam = (param: string | string[] | undefined): string => {
    if (Array.isArray(param)) return param[0];
    return param || "";
  };

  // Mock data if params are missing (for development/preview)
  const transaction = {
    name: getParam(params.name) || "Bill Gates",
    amount: getParam(params.amount) || "₹9,000",
    date: getParam(params.date) || "January 09, 2023 at 03:22 PM",
    status: "Completed",
    phone: "+91 99999 00000",
    upiId: "billgates001-1@okicici",
    sender: "Saad siddiqui",
    senderBank: "Federal Bank",
    senderUpi: "saadsiddiqui@okicici",
    googleTransId: "AICAgGG4bhyAoo",
    upiTransId: "123456789100",
    bankLast4: "1234",
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.onBackground} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <IconButton icon="share-variant" iconColor={theme.colors.onBackground} size={20} />
          <IconButton icon="dots-vertical" iconColor={theme.colors.onBackground} size={20} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
             {/* Use a placeholder or the passed image */}
            <Image
              source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg" }}
              style={styles.avatar}
            />
          </View>
          <Text style={[styles.toText, { color: theme.colors.onBackground }]}>
            To {transaction.name}
          </Text>
          <Text style={[styles.phoneText, { color: theme.colors.onSurfaceVariant }]}>
            {transaction.phone}
          </Text>
          <Text style={[styles.amountText, { color: theme.colors.onBackground }]}>
            {transaction.amount}
          </Text>
          
          <View style={styles.statusContainer}>
             <MaterialIcons name="check-circle" size={16} color={theme.colors.secondary} />
             <Text style={[styles.statusText, { color: theme.colors.onBackground }]}>
               {transaction.status} • {transaction.date}
             </Text>
          </View>
        </View>

        {/* Details Card */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
            {/* Bank Header */}
            <View style={styles.cardHeader}>
                <View style={styles.bankInfo}>
                    <View style={styles.bankLogoPlaceholder}>
                        <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 10}}>BANK</Text>
                    </View>
                    <View>
                        <Text style={[styles.bankName, { color: theme.colors.onBackground }]}>Federal Bank</Text>
                        <Text style={[styles.bankAccount, { color: theme.colors.onBackground }]}>XXXXXXXXXX{transaction.bankLast4}</Text>
                    </View>
                </View>
                <MaterialIcons name="keyboard-arrow-down" size={24} color={theme.colors.onSurfaceVariant} />
            </View>
            
            <Divider style={{ backgroundColor: theme.colors.outline, opacity: 0.2 }} />

            <View style={styles.cardBody}>
                <View style={styles.detailRow}>
                    <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>UPI transaction ID</Text>
                    <Text style={[styles.value, { color: theme.colors.onBackground }]}>{transaction.upiTransId}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>To: <Text style={{fontWeight: 'bold', color: theme.colors.onBackground}}>{transaction.name.toUpperCase()}</Text></Text>
                    <Text style={[styles.value, { color: theme.colors.onBackground }]}>{transaction.upiId}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>From: <Text style={{fontWeight: 'bold', color: theme.colors.onBackground}}>{transaction.sender}</Text> ({transaction.senderBank})</Text>
                    <Text style={[styles.value, { color: theme.colors.onBackground }]}>{transaction.senderUpi}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>Google Transaction ID</Text>
                    <Text style={[styles.value, { color: theme.colors.onBackground }]}>{transaction.googleTransId}</Text>
                </View>
            </View>

             <View style={styles.footerLogo}>
                <Text style={{color: theme.colors.onSurfaceVariant, fontSize: 10, textAlign: 'center'}}>POWERED BY</Text>
                <Text style={{color: theme.colors.onSurfaceVariant, fontSize: 16, fontWeight: 'bold', textAlign: 'center', fontStyle: 'italic'}}>UPI</Text>
             </View>
        </View>

      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <Button 
            mode="contained" 
            onPress={() => {}} 
            style={[styles.button, { backgroundColor: '#8AB4F8' }]}
            labelStyle={{ color: '#000' }}
        >
            Having issues?
        </Button>
        <Button 
            mode="outlined" 
            onPress={() => {}} 
            style={[styles.button, { borderColor: theme.colors.outline }]}
            textColor={theme.colors.onBackground}
        >
            Split with friends
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerRight: {
    flexDirection: "row",
  },
  scrollContent: {
    paddingBottom: 80,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 12,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  toText: {
    fontSize: 16,
    fontWeight: "500",
  },
  phoneText: {
    fontSize: 14,
    marginTop: 4,
  },
  amountText: {
    fontSize: 48,
    fontWeight: "400",
    marginTop: 10,
    marginBottom: 10,
  },
  statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
  },
  statusText: {
      fontSize: 14,
  },
  card: {
      marginHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
      padding: 16,
  },
  cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
  },
  bankInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  bankLogoPlaceholder: {
      width: 40, 
      height: 24, 
      backgroundColor: '#fff', 
      borderWidth: 1, 
      borderColor: '#ccc', 
      justifyContent: 'center', 
      alignItems: 'center',
      borderRadius: 2
  },
  bankName: {
      fontWeight: 'bold',
      fontSize: 14,
  },
  bankAccount: {
      fontSize: 14,
  },
  cardBody: {
      marginTop: 16,
      gap: 16,
  },
  detailRow: {
      gap: 2,
  },
  label: {
      fontSize: 12,
  },
  value: {
      fontSize: 14,
  },
  footerLogo: {
      marginTop: 24,
      alignItems: 'center',
      opacity: 0.7,
  },
  footer: {
    //   position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 12,
      paddingHorizontal: 16,
  },
  button: {
      flex: 1,
      borderRadius: 24,
  }
});
