import { View, Text } from 'react-native';
import React from 'react';
import useGetUserData from '@/hooks/useGetUserData';
import Input from '@/components/common/input';
import Button from '@/components/common/button';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Profile = () => {
  const { user, loading } = useGetUserData();

  if (loading) {
    return null;
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('acssessToken');
    router.replace('/(routes)/login');
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
        Ny Profile
      </Text>
      <View style={{ padding: windowWidth(20) }}>
        <Input
          title='Name'
          placeholder={user?.name!}
          value={user?.name}
          disabled={true}
          onChangeText={(text) => console.log(text)}
        />
        <Input
          title='Email Adress'
          placeholder={user?.email!}
          value={user?.email}
          disabled={true}
          onChangeText={(text) => console.log(text)}
        />
        <Input
          title='Phone Numner'
          placeholder={user?.phone_number!}
          value={user?.phone_number}
          disabled={true}
          onChangeText={(text) => console.log(text)}
        />
        <View style={{ marginVertical: windowHeight(20) }}>
          <Button
            title='Log Out'
            backgroundColor='crimson'
            height={windowHeight(35)}
            onPress={handleLogout}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;
