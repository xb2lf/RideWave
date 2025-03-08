import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles';
import Header from '@/components/common/header';
import { rideData } from '@/configs/constants';
import RenderRideItem from '@/components/ride/render.ride.item';
import { useTheme } from '@react-navigation/native';
import RideCard from '@/components/ride/ride.card';
import useGetDriverData from '@/hooks/useGetDriverData';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { windowHeight, windowWidth } from '@/themes/app.constant';
import { Gps, Location } from '@/utils/icons';
import color from '@/themes/app.colors';
import Button from '@/components/common/button';
import axios from 'axios';
import { Toast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as GeoLocation from 'expo-location';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { router } from 'expo-router';

const HomeScreen = () => {
  const { colors } = useTheme();
  const notificationListener = useRef<any>();
  const { driver, loading: driverDataLoading } = useGetDriverData();
  const [userData, setUserData] = useState<any>(null);
  const [isOn, setIsOn] = useState<boolean>(false);
  const [loading, setloading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [region, setRegion] = useState<any>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [currentLocationName, setcurrentLocationName] = useState('');
  const [destinationLocationName, setdestinationLocationName] = useState('');
  const [distance, setdistance] = useState<number>(0);
  const [wsConnected, setWsConnected] = useState(false);
  const [marker, setMarker] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [lastLocation, setLastLocation] = useState<any>(null);
  const [recentRides, setrecentRides] = useState([]);
  const ws = new WebSocket('ws://192.168.1.102:8080');

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const fetchStatus = async () => {
    const status: string | null = await AsyncStorage.getItem('status');
    setIsOn(status === 'active' ? true : false);
  };

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Toast.show('Failed to get push token for push notification!', {
          type: 'danger',
        });
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        Toast.show('Failed to get project id for push notification!', {
          type: 'danger',
        });
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(pushTokenString);
        // return pushTokenString;
      } catch (e: unknown) {
        Toast.show(`${e}`, {
          type: 'danger',
        });
      }
    } else {
      Toast.show('Must use physical device for Push Notifications', {
        type: 'danger',
      });
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  const sendLocationUpdate = async (location: any) => {
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
      if (res.data) {
        if (ws.readyState === WebSocket.OPEN) {
          const message = JSON.stringify({
            type: 'locationUpdate',
            data: location,
            role: 'driver',
            driver: res.data.driver.id!,
          });
          ws.send(message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendPushNotification = async (expoPushToken: string, data: any) => {
    try {
      const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Ride Request Accepted!',
        body: `Your driver is on the way!`,
        data: { orderData: data },
      };
      await axios.post('https://exp.host/--/api/v2/push/send', message);
    } catch (error) {
      console.log(error);
    }
  };

  // calculate distance
  const haversineDistance = (coords1: any, coords2: any) => {
    const toRad = (x: any) => (x * Math.PI) / 180;

    const R = 6371e3; // Radius of the Earth in meters
    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);
    const deltaLat = toRad(coords2.latitude - coords1.latitude);
    const deltaLon = toRad(coords2.longitude - coords1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in meters
    return distance;
  };

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
    setrecentRides(res.data.rides);
  };

  const handleStatusChange = async () => {
    if (!loading) {
      setloading(true);
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const changeStatus = await axios.put(
          `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/update-status`,
          { status: !isOn ? 'active' : 'inactive' },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (changeStatus.data) {
          setIsOn((prevVal: boolean) => !prevVal);
          await AsyncStorage.setItem('status', changeStatus.data.driver.status);
        }
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        Toast.show((error as Error).message, {
          type: 'danger',
          placement: 'bottom',
        });
      }
    }
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const acceptRideHandler = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    try {
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/new-ride`,
        {
          userId: userData?.id!,
          charge: (distance * parseInt(driver?.rate!)).toFixed(2),
          status: 'Processing',
          currentLocationName,
          destinationLocationName,
          distance,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = {
        ...driver,
        currentLocation,
        marker,
        distance,
      };
      const driverPushToken = 'ExponentPushToken[A22bNzKGUMegAXVEqzDnUx]';
      await sendPushNotification(driverPushToken, data);

      const rideData = {
        user: userData,
        currentLocation,
        marker,
        driver,
        distance,
        rideData: res.data.newRide,
      };
      router.push({
        pathname: '/(routes)/ride-details',
        params: { orderData: JSON.stringify(rideData) },
      });
    } catch (error) {
      console.log(error);
      Toast.show((error as Error).message, {
        type: 'danger',
        placement: 'bottom',
      });
    }
  };

  useEffect(() => {
    getRecentRides();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // Handle the notification and extract data
        const orderData = JSON.parse(
          notification.request.content.data.orderData
        );
        setIsModalVisible(true);
        setCurrentLocation({
          latitude: orderData.currentLocation.latitude,
          longitude: orderData.currentLocation.longitude,
        });
        setMarker({
          latitude: orderData.marker.latitude,
          longitude: orderData.marker.longitude,
        });
        setRegion({
          latitude:
            (orderData.currentLocation.latitude + orderData.marker.latitude) /
            2,
          longitude:
            (orderData.currentLocation.longitude + orderData.marker.longitude) /
            2,
          latitudeDelta:
            Math.abs(
              orderData.currentLocation.latitude - orderData.marker.latitude
            ) * 2,
          longitudeDelta:
            Math.abs(
              orderData.currentLocation.longitude - orderData.marker.longitude
            ) * 2,
        });
        setdistance(orderData.distance);
        setcurrentLocationName(orderData.currentLocationName);
        setdestinationLocationName(orderData.destinationLocation);
        setUserData(orderData.user);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  // socket updates
  useEffect(() => {
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      setWsConnected(true);
    };
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log('Received message:', message);
      // Handle received location updates here
    };
    ws.onerror = (e: any) => {
      console.log('WebSocket error:', e.message);
    };
    ws.onclose = (e) => {
      console.log('WebSocket closed:', e.code, e.reason);
    };

    return () => {
      ws.close();
    };
  }, []);

  // update location
  useEffect(() => {
    (async () => {
      let { status } = await GeoLocation.requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show('Please give us to access your location to use this app!');
        return;
      }
      await GeoLocation.watchPositionAsync(
        {
          accuracy: GeoLocation.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        async (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { latitude, longitude };
          if (
            !lastLocation ||
            haversineDistance(lastLocation, newLocation) > 200
          ) {
            setCurrentLocation(newLocation);
            setLastLocation(newLocation);
            if (ws.readyState === WebSocket.OPEN) {
              await sendLocationUpdate(newLocation);
            }
          }
        }
      );
    })();
  }, []);

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.spaceBelow}>
        <Header isOn={isOn} toggleSwitch={() => handleStatusChange()} />
        <FlatList
          data={rideData}
          numColumns={2}
          renderItem={({ item }) => (
            <RenderRideItem key={item.id} item={item} colors={colors} />
          )}
        />
        <View style={[styles.rideContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.rideTitle, { color: colors.text }]}>
            Recent Rides
          </Text>
          <ScrollView>
            {recentRides?.map((item: any, index: number) => (
              <RideCard item={item} key={index} />
            ))}
            {recentRides?.length === 0 && (
              <Text>You didn't take any ride yet!</Text>
            )}
          </ScrollView>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={handleClose}
        >
          <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
            <View>
              <Text style={styles.modalTitle}>New Ride Request Received!</Text>
              <MapView
                style={{ height: windowHeight(180) }}
                region={region}
                onRegionChangeComplete={(region) => setRegion(region)}
              >
                {marker && <Marker coordinate={marker} />}
                {currentLocation && <Marker coordinate={currentLocation} />}
                {marker && currentLocation && (
                  <MapViewDirections
                    origin={currentLocation}
                    destination={marker}
                    apikey={process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY!}
                    strokeWidth={4}
                    strokeColor='blue'
                  />
                )}
              </MapView>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.leftView}>
                  <Location colors={colors.text} />
                  <View
                    style={[
                      styles.verticaldot,
                      { borderColor: color.buttonBg },
                    ]}
                  />
                  <Gps colors={colors.text} />
                </View>
                <View style={styles.rightView}>
                  <Text style={[styles.pickup, { color: colors.text }]}>
                    {currentLocationName}
                  </Text>
                  <View style={styles.border} />
                  <Text style={[styles.drop, { color: colors.text }]}>
                    {destinationLocationName}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  paddingTop: windowHeight(5),
                  fontSize: windowHeight(14),
                }}
              >
                Distance: {distance} km
              </Text>
              <Text
                style={{
                  paddingVertical: windowHeight(5),
                  paddingBottom: windowHeight(5),
                  fontSize: windowHeight(14),
                }}
              >
                Amount:
                {(distance * parseInt(driver?.rate!) || 0).toFixed(2)} BDT
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: windowHeight(5),
                }}
              >
                <Button
                  title='Decline'
                  onPress={handleClose}
                  width={windowWidth(120)}
                  height={windowHeight(30)}
                  backgroundColor='crimson'
                />
                <Button
                  title='Accept'
                  onPress={() => acceptRideHandler()}
                  width={windowWidth(120)}
                  height={windowHeight(30)}
                />
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HomeScreen;
