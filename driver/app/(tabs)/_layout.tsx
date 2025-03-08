/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-05 18:39:17
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 19:43:31
 * @Description:
 */
import { Tabs } from 'expo-router';
import React from 'react';
import { Person } from '@/assets/icons/person';
import color from '@/themes/app.colors';
import { Home, HomeLight, History } from '@/utils/icons';

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
            } else if (route.name === 'rides/index') {
              iconName = (
                <History colors={focused ? color.buttonBg : '#8F8F8F'} />
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
      <Tabs.Screen name='rides/index' />
      <Tabs.Screen name='profile/index' />
    </Tabs>
  );
}

{
  /* <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Home colors={color.buttonBg} width={24} height={24} />
            ) : (
              <HomeLight />
            ),
        }}
      /> */
}
