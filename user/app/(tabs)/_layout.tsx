/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-05 18:39:19
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 10:33:09
 * @Description:
 */
import { Tabs } from 'expo-router';
import { Person } from '@/assets/icons/person';
import color from '@/themes/app.colors';
import { Car, CarPrimary, Category, Home, HomeLight } from '@/utils/icons';

export default function _layout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'home') {
              iconName = focused ? (
                <Home colors={color.buttonBg} width={24} height={24} />
              ) : (
                <HomeLight />
              );
            } else if (route.name === 'services/index') {
              iconName = (
                <Category colors={focused ? color.buttonBg : '#8F8F8F'} />
              );
            } else if (route.name === 'history/index') {
              iconName = focused ? (
                <CarPrimary fill={color.buttonBg} />
              ) : (
                <Car colors='#8F8F8F' />
              );
            } else if (route.name === 'profile/index') {
              iconName = <Person fill={focused ? color.buttonBg : '#8F8F8F'} />;
            }

            return iconName;
          },
        };
      }}
    >
      <Tabs.Screen name='home' />
      <Tabs.Screen name='services/index' />
      <Tabs.Screen name='history/index' />
      <Tabs.Screen name='profile/index' />
    </Tabs>
  );
}
