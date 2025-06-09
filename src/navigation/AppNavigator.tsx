import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
            />
        </Drawer.Navigator>
    </NavigationContainer>

);

export default AppNavigator;
