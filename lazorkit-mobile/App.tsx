import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LazorkitProvider } from './src/providers/LazorkitProvider';
import { LoginScreen } from './src/screens/LoginScreen';
import { SendScreen } from './src/screens/SendScreen';

const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text>,
        }}
      />
      <Tab.Screen 
        name="Send" 
        component={SendScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color }}>💸</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <LazorkitProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <MainApp />
        </View>
      </NavigationContainer>
    </LazorkitProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
