import { PEOPLE } from '@/constants/home-data';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { memo, useCallback } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Appbar, Avatar, Text, useTheme } from 'react-native-paper';

/**
 * Screen for searching people.
 * Optimized with memo and callbacks.
 */
const SearchScreen = memo(function SearchScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredPeople = React.useMemo(() => {
    return PEOPLE.filter((person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const renderItem = useCallback(({ item }: { item: typeof PEOPLE[0] }) => {
    const initials = item.name.charAt(0).toUpperCase();
    const dummyNumber = "+91 98765 43210"; // Placeholder number as requested

    return (
      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => {
           router.push({
            pathname: "/pay-history",
            params: { name: item.name, image: item.image || "" },
          });
        }}
      >
        <View style={styles.avatarContainer}>
          {item.image ? (
            <Avatar.Image size={48} source={{ uri: item.image }} />
          ) : (
            <Avatar.Text
              size={48}
              label={initials}
              style={{ backgroundColor: theme.colors.primaryContainer }}
              color={theme.colors.onPrimaryContainer}
            />
          )}
        </View>
        <View style={styles.contactInfo}>
          <Text variant="titleMedium" style={{ color: theme.colors.onSurface, fontWeight:'800' }}>
            {item.name}
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {dummyNumber}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, [router, theme]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Appbar.BackAction onPress={handleBack} />
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
        <Text variant="titleMedium" style={{ marginBottom: 16, color: theme.colors.onSurface }}>
          People on GPay
        </Text>
        <FlatList
          data={filteredPeople}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.name + index}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </View>
  );
});

export default SearchScreen;

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
    paddingHorizontal: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
    justifyContent: 'center',
  },
});
