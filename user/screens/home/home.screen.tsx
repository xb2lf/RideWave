/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-07 12:57:33
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 20:46:10
 * @Description:
 */
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';
import { commonStyles } from '@/styles/common.style';
import { external } from '@/styles/external.style';
import { windowHeight } from '@/themes/app.constant';
import LocationSearchBar from '@/components/location/location.search.bar';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import color from '@/themes/app.colors';
import RideCard from '@/components/ride/ride.card';

const HomeScreen = () => {
  const [recentRides, setrecentRides] = useState([]);

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
    setrecentRides(res.data.rides);
  };

  useEffect(() => {
    getRecentRides();
  }, []);

  return (
    <View style={[commonStyles.flexContainer, { backgroundColor: '#fff' }]}>
      <SafeAreaView style={styles.container}>
        <View style={[external.p_5, external.ph_20]}>
          <Text
            style={{
              fontFamily: 'TT-Octosquares-Medium',
              fontSize: windowHeight(25),
              textAlign: 'center',
            }}
          >
            Ride Wave
          </Text>
          <LocationSearchBar />
        </View>
        <View style={{ padding: 5 }}>
          <View
            style={[
              styles.rideContainer,
              { backgroundColor: color.whiteColor },
            ]}
          >
            <Text style={[styles.rideTitle, { color: color.regularText }]}>
              Recent Rides
            </Text>
            <ScrollView>
              {recentRides?.map((item: any, index: number) => (
                <RideCard item={item} key={index} />
              ))}
              {recentRides?.length === 0 && (
                <Text style={{ fontSize: 16 }}>
                  You don't have any ride history yet!
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
