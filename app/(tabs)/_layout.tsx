import { MaterialIcons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { BottomNavigation, useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          activeColor={theme.dark ? '#D2E3FC' : '#001D35'} // Dark blue for light mode active icon, Light blue for dark mode active icon
          activeIndicatorStyle={{
            backgroundColor: theme.dark ? '#004A77' : '#D2E3FC', // Dark blue pill for dark mode, Light blue pill for light mode
          }}
          // inactiveColor is omitted to let Paper derive it from theme (onSurfaceVariant)
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            
            // Custom render for the "You" tab to show Avatar
            // if (route.name === 'profile') {
            //    return (
            //      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            //        <Avatar.Text 
            //          size={24} 
            //          label="S" 
            //          style={{ backgroundColor: '#8E24AA' }} 
            //          color="white"
            //          labelStyle={{ fontSize: 14, lineHeight: 24 }}
            //        />
            //      </View>
            //    );
            // }

            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            return label as any;
          }}
        />
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => {
            // Using filled home icon
            return <MaterialIcons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="money"
        options={{
          title: 'Money',
          tabBarIcon: ({ color, size }) => {
            return (
              <View style={{ 
                width: size, 
                height: size, 
                borderRadius: size / 2, 
                borderWidth: 2, 
                borderColor: color, 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                 <MaterialIcons name="currency-rupee" size={size - 8} color={color} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'You', // Renamed from Profile
                tabBarIcon: ({ color, size }) => {
            // Using filled home icon
            return <MaterialIcons name="person" size={size} color={color} />;
          },
          // tabBarIcon is handled in renderIcon for custom Avatar
        }}
      />
    
    </Tabs>
  );
}
