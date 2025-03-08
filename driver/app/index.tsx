/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-05 18:39:17
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 20:14:16
 * @Description:
 */
import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function index() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // flag to check if the component is mounted

    const getData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (isMounted) {
          setisLoggedIn(!!accessToken);
        }
      } catch (error) {
        console.log(
          'Failed to retrieve access token from async storage',
          error
        );
      } finally {
        if (isMounted) {
          setisLoading(false);
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return null;
  }

  return <Redirect href={!isLoggedIn ? '/(routes)/login' : '/(tabs)/home'} />;
}
