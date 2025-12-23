import QuickAction from '@/components/quick-action';
import { OFFERS_DATA } from '@/constants/home-data';
import React, { memo, useCallback } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

/**
 * Component to display offers and rewards.
 * Optimized with memo and callbacks.
 */
const OffersRewards = memo(function OffersRewards() {

  const handlePress = useCallback(() => {
    // Handle press
  }, []);

  return (
    <View>
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
            hasNotification={item.hasNotification}
            onPress={handlePress}
          />
        ))}
      </View>
    </View>
  );
});

export default OffersRewards;
