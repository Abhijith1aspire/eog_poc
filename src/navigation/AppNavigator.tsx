import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Calender from '../screens/Calender';
import Home from '../screens/Home';
import { navigationEnum } from '../constants/navigationEnum';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Drawer.Navigator>
             <Drawer.Screen
        name={navigationEnum.BottomTabNavigator}
        component={BottomTabNavigator}
        
      />
            <Drawer.Screen name={navigationEnum.Home} component={Home} />
            <Drawer.Screen name={navigationEnum.Calender} component={Calender} />
        </Drawer.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
