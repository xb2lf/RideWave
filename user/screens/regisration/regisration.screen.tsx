/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-06 20:10:31
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-07 11:31:17
 * @Description:
 */
import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { windowHeight, windowWidth } from '@/themes/app.constant';
import styles from './styles';
import TitleView from '@/components/signup/title.view';
import Input from '@/components/common/input';
import Button from '@/components/common/button';
import color from '@/themes/app.colors';
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const RegisrationScreen = () => {
  const { colors } = useTheme();
  const Toast = useToast();
  const { user = '{}' } = useLocalSearchParams() as any;
  const parsedUser = JSON.parse(user);
  const [emailFormatWarning, setEmailFormatWarning] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: user ? parsedUser.phone_number : '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (formData.name.trim() === '' || formData.email.trim() === '') {
      Toast.show('Please fill the fields', {
        placement: 'bottom',
      });
      setLoading(false);
      return;
    }
    try {
      const res = await axios.put(
        `${process.env.EXPO_PUBLIC_SERVER_URI}/email-otp-request`,
        {
          user_id: parsedUser?.id,
          name: formData.name,
          email: formData.email,
        }
      );
      setLoading(false);
      const userData = {
        id: parsedUser.id,
        name: formData.name,
        email: formData.email,
        phone_number: parsedUser.phone_number,
        token: res.data.token,
      };
      router.push({
        pathname: '/(routes)/email-verification',
        params: { user: JSON.stringify(userData) },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show('Something went wrong! please re check your fields!', {
        type: 'danger',
        placement: 'bottom',
      });
    }
  };
  return (
    <ScrollView>
      <View>
        <Text
          style={{
            fontFamily: 'TT-Octosquares-Medium',
            fontSize: windowHeight(25),
            paddingTop: windowHeight(50),
            textAlign: 'center',
          }}
        >
          Ride Wave
        </Text>
        <View style={{ padding: windowWidth(20) }}>
          <View
            style={[styles.subView, { borderStartColor: colors.background }]}
          >
            <View style={styles.space}>
              <TitleView
                title='Create your account'
                subTitle='Explore your life by joining Ride Wave'
              />
              <Input
                title='Name'
                placeholder='Enter your name'
                value={formData?.name}
                onChangeText={(text) => handleChange('name', text)}
                showWarning={showWarning && formData.name === ''}
                warning='Please enter your name!'
              />
              <Input
                title='Phone Number'
                placeholder='Enter your phone number'
                value={parsedUser?.phone_number}
                disabled={true}
              />
              <Input
                title='Email Address'
                placeholder='Enter your email address'
                keyboardType='email-address'
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
                showWarning={
                  (showWarning && formData.name === '') ||
                  emailFormatWarning !== ''
                }
                warning={
                  emailFormatWarning !== ''
                    ? 'Please enter your email!'
                    : 'Please enter a validate email!'
                }
                emailFormatWarning={emailFormatWarning}
              />
              <View style={styles.margin}>
                <Button
                  title='Next'
                  backgroundColor={color.buttonBg}
                  textColor={color.whiteColor}
                  disabled={loading}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisrationScreen;
