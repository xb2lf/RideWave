import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import AuthContainer from '@/utils/container/auth-container';
import { windowHeight } from '@/themes/app.constant';
import SignInText from '@/components/login/signin.text';
import OTPTextInput from 'react-native-otp-textinput';
import Button from '@/components/common/button';
import { external } from '@/styles/external.style';
import color from '@/themes/app.colors';
import { commonStyles } from '@/styles/common.style';
import styles from './styles';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmailVerificationScreen = () => {
  const Toast = useToast();
  const driver = useLocalSearchParams() as any;
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
        `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/registration-driver`,
        {
          token: driver?.token,
          otp: otpNumbers,
        }
      );
      setLoader(false);
      await AsyncStorage.setItem('accessToken', res.data.accessToken);
      router.push('/(tabs)/home');
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
    if (driver.name === '' || driver.email === '') {
      Toast.show('Something went wrong! please re check your email address!', {
        placement: 'bottom',
      });
      return;
    }
    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/email-otp-request`,
        {
          ...driver,
        }
      );
    } catch (error) {
      console.log(error);
      Toast.show('Something went wrong! please re check your email address!', {
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
            title='Email Verification'
            subtitle='Check your email address for the otp!'
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
              height={windowHeight(30)}
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

export default EmailVerificationScreen;
