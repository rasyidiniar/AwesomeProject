import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Profil from './App';
import Mahasiswa from './Mahasiswa';
import { faUser, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';

function HomeScreen() {
  return (
      <Profil/>
  );
}

function DataMahasiswaScreen() {
  return (
    <Mahasiswa/>
  );
}

function WebScreen() {
  return (
    <WebView
        source={{ uri: 'https://github.com/rasyidiniar' }}
      />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* screenOptions={{
          headerStyle: { backgroundColor: '#007AFF' },
          tabBarStyle: { backgroundColor: '#222428' }, 
        }} */}
      
        <Tab.Screen name="Profil" component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUser} color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Mahasiswa" component={DataMahasiswaScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUserGraduate} color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="GitHub" component={WebScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUserGraduate} color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}