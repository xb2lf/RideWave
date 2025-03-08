/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-06 10:57:57
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-07 17:07:28
 * @Description:
 */
import { View, Image, Platform } from 'react-native';
import React, { useState } from 'react';
import AuthContainer from '@/utils/container/auth-container';
import { windowHeight } from '@/themes/app.constant';
import styles from './styles';
import Images from '@/utils/images';
import SignInText from '@/components/login/signin.text';
import { external } from '@/styles/external.style';
import PhoneNumberInput from '@/components/login/phone-number.input';
import Button from '@/components/common/button';
import { router } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';

const LoginScreen = () => {
  const Toast = useToast();
  const [countryCode, setCountryCode] = useState('+86');
  const [phone_number, setphone_number] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSumbit = async () => {
    setLoading(true);
    if (countryCode.trim() === '' || phone_number.trim() === '') {
      Toast.show('Please fill the fields', {
        placement: 'bottom',
      });
      setLoading(false);
      return;
    }
    try {
      const phoneNumber = `+${countryCode}${phone_number}`;
      await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URI}/registration`, {
        phone_number: phoneNumber,
      });
      setLoading(false);
      router.push({
        pathname: '/(routes)/otp-verification?phoneNumber',
        params: { phoneNumber },
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
                    onPress={() => handleSumbit()}
                  />
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
