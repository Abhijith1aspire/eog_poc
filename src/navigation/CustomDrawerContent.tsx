import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { navigationEnum } from '../constants/navigationEnum';
 
const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
 
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Calender"
        onPress={() =>
          navigation.navigate('BottomTabNavigator', {
            screen: 'Home',
            params: { screen: navigationEnum.Calender },
          })
        }
      />
       <DrawerItem
        label="Photo Upload"
        onPress={() =>
          navigation.navigate('BottomTabNavigator', {
            screen: 'Home',
            params: { screen: navigationEnum.PhotoUpload },
          })
        }
      />
    </DrawerContentScrollView>
  );
};
 
export default CustomDrawerContent;
 