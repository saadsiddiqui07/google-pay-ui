import QuickAction from '@/components/quick-action';
import { BILLS_AND_RECHARGES_DATA } from '@/constants/home-data';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

export default function BillsRecharges() {
  const theme = useTheme();

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
          Bills & recharges
        </Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text variant="titleMedium" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
            Manage
          </Text>
          <Icon source="chevron-right" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          // justifyContent: 'space-between', // Not needed if items fill the width, but good for safety
        }}
      >
        {BILLS_AND_RECHARGES_DATA.map((item, index) => (
          <View key={index} style={{ marginBottom: 16 }}>
            <QuickAction
              icon={item.icon}
              firstLineText={item.title}
              secondLineText={item.subtitle}
              iconBackgroundColor={item.color}
              iconColor={item.iconColor}
              isImage={item.isImage}
              variant="circular"
              onPress={() => {}}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
