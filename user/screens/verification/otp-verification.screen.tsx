/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-06 12:44:18
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 09:17:17
 * @Description:
 */
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AuthContainer from '@/utils/container/auth-container';
import { windowHeight } from '@/themes/app.constant';
import SignInText from '@/components/login/signin.text';
import OTPTextInput from 'react-native-otp-textinput';
import styles from './styles';
import color from '@/themes/app.colors';
import { external } from '@/styles/external.style';
import Button from '@/components/common/button';
import { router, useLocalSearchParams } from 'expo-router';
import { commonStyles } from '@/styles/common.style';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpVerificationScreen = () => {
  const Toast = useToast();
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSumbit = async () => {
    setLoader(true);
    if (otp === '') {
      Toast.show('Please fill the fields', {
        placement: 'bottom',
      });
      setLoader(false);
      return;
    }
    try {
      const otpNumbers = `${otp}`;
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URI}/verify-otp`,
        {
          phone_number: phoneNumber,
          otp: otpNumbers,
        }
      );
      setLoader(false);
      if (res.data.user.email === null) {
        router.push({
          pathname: '/(routes)/registration',
          params: { user: JSON.stringify(res.data.user) },
        });
        Toast.show('Account verified!');
      } else {
        await AsyncStorage.setItem('accessToken', res.data.accessToken);
        router.push('/(tabs)/home');
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      Toast.show('Something went wrong! please re check your otp!', {
        type: 'danger',
        placement: 'bottom',
      });
    }
  };

  const handleReSend = async () => {
    if (phoneNumber === '') {
      Toast.show('Something went wrong! please re check your phone number!', {
        placement: 'bottom',
      });
      return;
    }
    try {
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URI}/registration`, {
        phone_number: phoneNumber,
      });
    } catch (error) {
      console.log(error);
      Toast.show('Something went wrong! please re check your phone number!', {
        type: 'danger',
        placement: 'bottom',
      });
    }
  };
  return (
    <AuthContainer
      topSpace={windowHeight(240)}
      imageShow={true}
      container={
        <View>
          <SignInText
            title='OTP Verification'
            subtitle='Check your phone number for the otp!'
          />
          <OTPTextInput
            handleTextChange={(otp) => setOtp(otp)}
            inputCount={4}
            textInputStyle={styles.otpTextInput}
            tintColor={color.subtitle}
            autoFocus={false}
          />
          <View style={[external.mt_30]}>
            <Button
              title='Verify'
              disabled={loader}
              onPress={() => handleSumbit()}
            />
          </View>
          <View style={[external.mb_15]}>
            <View
              style={[
                external.pt_10,
                external.Pb_10,
                { flexDirection: 'row', gap: 5, justifyContent: 'center' },
              ]}
            >
              <Text style={[commonStyles.regularText]}>Not Received yet?</Text>
              <TouchableOpacity onPress={() => handleReSend()}>
                <Text style={[styles.signUpText, { color: '#000' }]}>
                  Resend it
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default OtpVerificationScreen;
