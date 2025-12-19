import React from 'react';
import { View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, padding: 16, justifyContent: 'center' }}>
      <Card style={{ backgroundColor: theme.colors.surface }}>
        <Card.Content style={{ alignItems: 'center' }}>
          <Text variant="headlineMedium" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Home</Text>
          <Text variant="bodyLarge" style={{ marginTop: 8 }}>Welcome to Google Pay</Text>
        </Card.Content>
      </Card>
    </View>
  );
}
