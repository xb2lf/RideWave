/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-07 16:28:52
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 09:00:31
 * @Description:
 */
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AuthContainer from '@/utils/container/auth-container';
import { windowHeight, windowWidth } from '@/themes/app.constant';
import styles from './styles';
import Images from '@/utils/images';
import SignInText from '@/components/login/signin.text';
import { external } from '@/styles/external.style';
import Button from '@/components/common/button';
import { router } from 'expo-router';
import PhoneNumberInput from '@/components/login/phone-number.input';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';

const LoginScreen = () => {
  const Toast = useToast();
  const [countryCode, setCountryCode] = useState('+86');
  const [phone_number, setphone_number] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (phone_number === '' || countryCode === '') {
      Toast.show('Please fill the fields!', {
        placement: 'bottom',
      });
      return;
    }
    const phoneNumber = `+${countryCode}${phone_number}`;
    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_URI}/driver/send-otp`,
        {
          phone_number: phoneNumber,
        }
      );
      setLoading(false);
      const driver = {
        phone_number: phoneNumber,
      };
      router.push({
        pathname: '/(routes)/verification-phone-number',
        params: driver,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show('Something went wrong! please re check your phone number!', {
        type: 'danger',
        placement: 'bottom',
      });
    }
  };

  return (
    <AuthContainer
      topSpace={windowHeight(150)}
      imageShow={true}
      container={
        <View>
          <View>
            <View>
              <Image style={styles.transformLine} source={Images.line} />
              <SignInText />
              <View style={[external.mt_25, external.Pb_10]}>
                <PhoneNumberInput
                  phone_number={phone_number}
                  setphone_number={setphone_number}
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                />
                <View style={[external.mt_25, external.Pb_15]}>
                  <Button
                    title='Get Otp'
                    height={windowHeight(35)}
                    disabled={loading}
                    onPress={() => handleSubmit()}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: windowWidth(8),
                    paddingBottom: windowHeight(15),
                  }}
                >
                  <Text style={{ fontSize: windowWidth(12) }}>
                    Don't have any rider account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.push('/(routes)/signup')}
                  >
                    <Text style={{ color: 'blue', fontSize: windowHeight(12) }}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default LoginScreen;
