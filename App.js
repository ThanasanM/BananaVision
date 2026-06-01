import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './page/LoginScreen';
import CreateAccountScreen from './page/CreateAccountScreen';
import BananaVisionScreen from './page/BananaVisionScreenGust'; 
import ForgotPasswordScreen from './page/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="BananaVision" 
        screenOptions={{ 
          headerShown: false, 
          animation: 'slide_from_right' 
        }} 
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="BananaVision" component={BananaVisionScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}