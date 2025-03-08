/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-07 08:42:45
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 09:14:05
 * @Description:
 */
import { StyleSheet } from 'react-native';
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant';
import color from '@/themes/app.colors';
import { commonStyles } from '@/styles/common.style';
import fonts from '@/themes/app.fonts';

const styles = StyleSheet.create({
  otpTextInput: {
    backgroundColor: color.lightGray,
    borderColor: color.lightGray,
    borderWidth: 0.5,
    borderRadius: 6,
    width: windowWidth(60),
    height: windowHeight(40),
    borderBottomWidth: 0.5,
    color: color.subtitle,
    textAlign: 'center',
    fontSize: fontSizes.FONT22,
    marginTop: windowHeight(10),
  },
  signUpText: {
    ...commonStyles.mediumTextBlack12,
    fontFamily: fonts.bold,
    paddingHorizontal: 5,
  },
});

export default styles;
