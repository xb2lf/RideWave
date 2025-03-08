/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-08 10:22:57
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 19:46:42
 * @Description:
 */
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import color from '@/themes/app.colors';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RideCard from '@/components/ride/ride.card';
import fonts from '@/themes/app.fonts';

const Rides = () => {
  const [recentRides, setRecentRides] = useState([]);

  const getRecentRides = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const res = await axios.get(
      `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/get-rides`,
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
      <ScrollView>
        {recentRides.map((item: any, index: number) => (
          <RideCard key={index} item={item} />
        ))}
      </ScrollView>
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

export default Rides;
