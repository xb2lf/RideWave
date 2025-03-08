/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-05 18:39:19
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 21:09:10
 * @Description:
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // flag to check if the component is mounted
    const getData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (isMounted) {
          setIsLoggedIn(!!accessToken);
        }
      } catch (error) {
        console.log('Failed to retrive access token from ssyncstorage', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
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

  return (
    <Redirect href={!isLoggedIn ? '/(routes)/onboarding' : '/(tabs)/home'} />
  );
}
