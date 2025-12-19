import QuickAction from '@/components/quick-action';
import { OFFERS_DATA } from '@/constants/home-data';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function OffersRewards() {

  return (
    <View style={{ marginTop: 24 }}>
      <Text variant="titleLarge" style={{ marginBottom: 16, fontWeight: 'bold' }}>
        Offers & rewards
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {OFFERS_DATA.map((item, index) => (
          <QuickAction
            key={index}
            icon={item.icon}
            firstLineText={item.title}
            iconBackgroundColor={item.color}
            iconColor={item.iconColor}
            isImage={item.isImage}
            variant="circular"
            onPress={() => {}}
          />
        ))}
      </View>
    </View>
  );
}
