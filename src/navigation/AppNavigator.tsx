import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import { navigationEnum } from '../constants/navigationEnum';
import CalendarScreen from '../screens/Calender';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ headerShown: true }}
        >
            <Drawer.Screen
                name={navigationEnum.BottomTabNavigator}
                component={BottomTabNavigator}
            />

        </Drawer.Navigator>
    </NavigationContainer> 
);

export default AppNavigator;
