/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-08 10:24:05
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 20:12:39
 * @Description:
 */
import { View, Text } from 'react-native';
import React from 'react';
import useGetDriverData from '@/hooks/useGetDriverData';
import Input from '@/components/common/input';
import SelectInput from '@/components/common/select-input';
import Button from '@/components/common/button';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';
import { countryNameItems } from '@/configs/country-name-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Profile = () => {
  const { driver, loading } = useGetDriverData();

  if (loading) {
    return null;
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    router.replace('/(routes/login)');
  };
  return (
    <View style={{ paddingTop: windowHeight(70) }}>
      <Text
        style={{
          fontSize: fontSizes.FONT30,
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        My Profile
      </Text>
      <View style={{ padding: windowWidth(20) }}>
        <Input
          title='Name'
          value={driver?.name}
          onChangeText={(text) => console.log(text)}
          placeholder={driver?.name!}
          disabled={true}
        />
        <Input
          title='Email Adress'
          value={driver?.email}
          onChangeText={(text) => console.log(text)}
          placeholder={driver?.email!}
          disabled={true}
        />
        <Input
          title='Phone Number'
          value={driver?.phone_number}
          onChangeText={(text) => console.log(text)}
          placeholder={driver?.phone_number!}
          disabled={true}
        />
        <SelectInput
          title='Country'
          placeholder='Country'
          value={driver?.country}
          items={countryNameItems}
          disabled={true}
          onValueChange={(text) => console.log(text)}
        />
        <View style={{ marginVertical: windowHeight(25) }}>
          <Button
            title='Log Out'
            height={windowHeight(35)}
            backgroundColor='crimson'
            onPress={handleLogout}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;
