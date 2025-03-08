/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-06 13:42:42
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-08 19:59:03
 * @Description:
 */
import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import fonts from '@/themes/app.fonts';
import { windowWidth, windowHeight } from '@/themes/app.constant';
import color from '@/themes/app.colors';
import RNPickerSelect from 'react-native-picker-select';

type InputProps = {
  title?: string;
  placeholder: string;
  items: { label: string; value: string }[];
  value?: string;
  warning?: string;
  onValueChange: (val: string) => void;
  showWarning?: boolean;
  disabled?: boolean;
};

const SelectInput = ({
  title,
  placeholder,
  items,
  value,
  warning,
  onValueChange,
  showWarning,
  disabled,
}: InputProps) => {
  const { colors } = useTheme();
  return (
    <View>
      {title && (
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      )}
      {Platform.OS === 'ios' ? (
        <RNPickerSelect
          items={items.map((item, index) => ({
            ...item,
            key: `${item.label}-${index}`,
          }))}
          placeholder={{ label: placeholder, value }}
          style={{
            inputIOS: {
              ...styles.input,
              backgroundColor: color.lightGray,
              borderColor: colors.border,
              height: windowHeight(39),
            },
            inputAndroid: {
              ...styles.input,
              backgroundColor: color.lightGray,
              borderColor: colors.border,
              height: windowHeight(39),
              color: '#000',
            },
          }}
          itemKey='value'
          value={value}
          disabled={disabled}
          onValueChange={onValueChange}
        />
      ) : (
        <View
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <RNPickerSelect
            items={items.map((item, index) => ({
              ...item,
              key: `${item.label}-${index}`,
            }))}
            placeholder={{ label: placeholder, value }}
            style={{
              inputIOS: {
                ...styles.input,
                backgroundColor: color.lightGray,
                borderColor: colors.border,
                height: windowHeight(39),
              },
              inputAndroid: {
                ...styles.input,
                backgroundColor: color.lightGray,
                borderColor: colors.border,
                height: windowHeight(39),
                color: '#000',
              },
            }}
            itemKey='value'
            value={value}
            disabled={disabled}
            onValueChange={onValueChange}
          />
        </View>
      )}

      {showWarning && <Text style={[styles.warning]}>{warning}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.medium,
    fontSize: windowWidth(20),
    marginVertical: windowHeight(8),
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
    height: windowHeight(30),
    color: color.secondaryFont,
    paddingHorizontal: 10,
  },
  warning: {
    color: color.red,
    marginTop: 3,
  },
});

export default SelectInput;
