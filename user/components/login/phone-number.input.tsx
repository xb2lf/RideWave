/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-05 18:39:20
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-07 17:03:12
 * @Description:
 */
import { View, Text, TextInput, Platform } from 'react-native';
import { commonStyles } from '@/styles/common.style';
import { windowHeight, windowWidth, fontSizes } from '@/themes/app.constant';
import { external } from '@/styles/external.style';
import styles from '@/screens/login/styles';
import color from '@/themes/app.colors';
import SelectInput from '@/components/common/select-input';
import { countryItems } from '@/configs/country-list';

type PhoneNumberInputProps = {
  width?: number;
  phone_number: string;
  setphone_number: (value: string) => void;
  countryCode: string;
  setCountryCode: (value: string) => void;
};

export default function PhoneNumberInput({
  width,
  phone_number,
  setphone_number,
  countryCode,
  setCountryCode,
}: PhoneNumberInputProps) {
  return (
    <View>
      <Text
        style={[commonStyles.mediumTextBlack, { marginTop: windowHeight(8) }]}
      >
        Phone Number
      </Text>
      <View style={[external.fd_row, external.ai_center, external.mt_5]}>
        <View
          style={[
            styles.countryCodeContainer,
            {
              borderColor: color.border,
            },
          ]}
        >
          <SelectInput
            placeholder='Select your country'
            items={countryItems}
            value={countryCode}
            showWarning={false}
            warning='Please choose your country code!'
            onValueChange={(text) => setCountryCode(text)}
          />
        </View>
        <View
          style={[
            styles.phoneNumberInput,
            {
              width: width || windowWidth(346),
              borderColor: color.border,
            },
          ]}
        >
          <TextInput
            style={[commonStyles.regularText, { fontSize: fontSizes.FONT21 }]}
            placeholderTextColor={color.subtitle}
            placeholder={'Enter your number'}
            keyboardType='numeric'
            maxLength={11}
            value={phone_number}
            onChangeText={(text) => setphone_number(text)}
          />
        </View>
      </View>
    </View>
  );
}
