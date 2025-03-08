/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-07 12:50:05
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 20:56:42
 * @Description:
 */
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';
import fonts from '@/themes/app.fonts';
import color from '@/themes/app.colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const History = () => {
  const [recentRides, setRecentRides] = useState([]);

  const getRecentRides = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const res = await axios.get(
      `${process.env.EXPO_PUBLIC_SERVER_URI}/get-rides`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setRecentRides(res.data.rides);
  };

  useEffect(() => {
    getRecentRides();
  }, []);
  return (
    <View
      style={[
        styles.rideContainer,
        { backgroundColor: color.lightGray, paddingTop: windowHeight(40) },
      ]}
    >
      <Text
        style={[
          styles.rideTitle,
          { color: color.primaryText, fontWeight: 600 },
        ]}
      >
        Ride History
      </Text>
      <ScrollView></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rideContainer: {
    paddingHorizontal: windowWidth(20),
    paddingTop: windowHeight(5),
    paddingBottom: windowHeight(10),
  },
  rideTitle: {
    marginVertical: windowHeight(5),
    fontSize: fontSizes.FONT25,
    fontFamily: fonts.medium,
  },
});

export default History;
