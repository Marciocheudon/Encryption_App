import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import EncryptedTextsScreen from './screens/EncryptedTextsScreen';
import DecryptScreen from './screens/DecryptScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Criptografar Texto" component={HomeScreen} />
        <Stack.Screen name="Textos Criptografados" component={EncryptedTextsScreen} />
        <Stack.Screen name="Descriptografar Texto" component={DecryptScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
