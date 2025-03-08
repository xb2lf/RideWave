import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import SignInText from '@/components/login/signin.text';
import Button from '@/components/common/button';
import { external } from '@/styles/external.style';
import { router, useLocalSearchParams } from 'expo-router';
import { commonStyles } from '@/styles/common.style';
import color from '@/themes/app.colors';
import OTPTextInput from 'react-native-otp-textinput';
import styles from './styles';
import AuthContainer from '@/utils/container/auth-container';
import { windowHeight } from '@/themes/app.constant';
import axios from 'axios';
import { Toast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneNumberVerificationScreen = () => {
  const driver = useLocalSearchParams();
  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmit = async () => {
    if (otp === '') {
      Toast.show('Please fill the fields!', {
        placement: 'bottom',
      });
      return;
    }
    setLoader(true);
    const otpNumbers = `${otp}`;
    if (driver.name) {
      try {
        const res = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/verify-otp`,
          {
            ...driver,
            phone_number: driver.phone_number,
            otp: otpNumbers,
          }
        );
        const driverData = {
          ...driver,
          token: res.data.token,
        };
        setLoader(false);
        router.push({
          pathname: '/(routes)/email-verification',
          params: driverData,
        });
      } catch (error) {
        setLoader(false);
        Toast.show('Your otp is incorrect or expired!', {
          placement: 'bottom',
          type: 'danger',
        });
      }
    } else {
      try {
        const res = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/login`,
          {
            phone_number: driver.phone_number,
            otp: otpNumbers,
          }
        );
        setLoader(false);
        await AsyncStorage.setItem('accessToken', res.data.accessToken);
        router.push('/(tabs)/home');
      } catch (error) {
        setLoader(false);
        Toast.show('Your otp is incorrect or expired!', {
          placement: 'bottom',
          type: 'danger',
        });
      }
    }
  };

  const handleReSend = async () => {
    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/send-otp`,
        {
          phone_number: driver.phone_number,
        }
      );
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
            title={'Phone Number Verification'}
            subtitle={'Check your phone number for the otp!'}
          />
          <OTPTextInput
            handleTextChange={(code) => setOtp(code)}
            inputCount={4}
            textInputStyle={styles.otpTextInput}
            tintColor={color.subtitle}
            autoFocus={false}
          />
          <View style={[external.mt_30]}>
            <Button
              title='Verify'
              height={windowHeight(30)}
              onPress={() => handleSubmit()}
              disabled={loader}
            />
          </View>
          <View style={[external.mb_15]}>
            <View
              style={[
                external.pt_10,
                external.Pb_10,
                {
                  flexDirection: 'row',
                  gap: 5,
                  justifyContent: 'center',
                },
              ]}
            >
              <Text style={[commonStyles.regularText]}>Not Received yet?</Text>
              <TouchableOpacity onPress={handleReSend}>
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

export default PhoneNumberVerificationScreen;
