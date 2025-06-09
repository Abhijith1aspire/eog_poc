import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { navigationEnum } from '../constants/navigationEnum';

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      {/* Default navigation to home (BottomTabNavigator) */}
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate(navigationEnum.BottomTabNavigator)}
      />
      
      {/* Custom item to navigate to Calender inside the stack */}
      <DrawerItem
        label="Calender"
        onPress={() => navigation.navigate(navigationEnum.Calender)}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
