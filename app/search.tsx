import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

export default function SearchScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <View style={[styles.searchContainer, { backgroundColor: theme.dark ? '#303134' : '#F1F3F4' }]}>
          <MaterialIcons name="search" size={24} color={theme.colors.onSurfaceVariant} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Pay by name or phone number"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            style={[styles.input, { color: theme.colors.onSurface }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
      </Appbar.Header>
      
      <View style={styles.content}>
        {/* Placeholder for search results */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
