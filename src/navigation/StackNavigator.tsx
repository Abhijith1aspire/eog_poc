import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Calender from '../screens/Calender';
import { navigationEnum } from '../constants/navigationEnum';
import PhotoUpload from '../screens/PhotoUpload';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={navigationEnum.Home} component={Home} />
    <Stack.Screen name={navigationEnum.Calender} component={Calender} />
    <Stack.Screen name={navigationEnum.PhotoUpload} component={PhotoUpload} />
  </Stack.Navigator>
);

export default StackNavigator;
