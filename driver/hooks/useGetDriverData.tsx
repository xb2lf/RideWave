/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-07 11:47:07
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 10:17:09
 * @Description:
 */
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const useGetDriverData = () => {
  const [driver, setDriver] = useState<DriverType>();
  const [loading, setLoading] = useState(true);

  const getLoggedInDriverData = async () => {
    setLoading(true);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLoading(false);
      setDriver(res.data.driver);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getLoggedInDriverData();
  }, []);

  return { loading, driver };
};

export default useGetDriverData;
