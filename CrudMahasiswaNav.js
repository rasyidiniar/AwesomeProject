import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapSigns, faPlusCircle, faPencilAlt, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import CreateData from './Createdata';
import DataMahasiswa from './Listdata';
import Editdata from './Editdata';
import { WebView } from 'react-native-webview';

function HomeScreen() {
  console.log("Navigated to HomeScreen");
  return <CreateData />;
}

function DataMahasiswaScreen() {
  console.log("Navigated to DataMahasiswaScreen");
  return <DataMahasiswa />;
}

function EditScreen() {
  console.log("Navigated to EditScreen");
  return <Editdata />;
}

function MapScreen() {
  console.log("Navigated to MapScreen");
  return (
    <WebView
      source={{ uri: 'https://pgpblleaflet-rarr.vercel.app/home' }}
    />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#A63238', // Mengubah warna latar belakang tab bar
          },
        }}
        tabBarOptions={{
          activeTintColor: 'white', // Tab label and icon color when active
          inactiveTintColor: '#AD852E', // Tab label and icon color when inactive
        }}
      >
        <Tab.Screen 
          name="Tambah" 
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon 
                icon={faPlusCircle} 
                color={color} // Use the active or inactive color
                size={20} 
              />
            ),
            tabBarLabel: 'Tambah'
          }}
        />
        <Tab.Screen
          name="Daftar Desa Wisata" 
          component={DataMahasiswaScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon 
                icon={faMapSigns} 
                color={color} // Use the active or inactive color
                size={20} 
              />
            ),
            tabBarLabel: 'Daftar Desa Wisata'
          }}
        />
        <Tab.Screen
          name="Edit" 
          component={EditScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon 
                icon={faPencilAlt} 
                color={color} // Use the active or inactive color
                size={20} 
              />
            ),
            tabBarLabel: 'Edit'
          }}
        />
        <Tab.Screen
          name="Peta" 
          component={MapScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon 
                icon={faMapMarkedAlt} 
                color={color} // Use the active or inactive color
                size={20} 
              />
            ),
            tabBarLabel: 'Peta'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
