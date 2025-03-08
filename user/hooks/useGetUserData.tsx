/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-07 11:47:07
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-07 11:59:20
 * @Description:
 */
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const useGetUserData = () => {
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState(true);

  const getLoggedInUserData = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const res = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URI}/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setLoading(false);
      setUser(res.data.user);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getLoggedInUserData();
  }, []);

  return { loading, user };
};

export default useGetUserData;
