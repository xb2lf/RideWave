/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-07 19:19:51
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-07 19:23:22
 * @Description:
 */
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { windowHeight, windowWidth } from '@/themes/app.constant';
import color from '@/themes/app.colors';

const ProgressBar = ({ fill }: { fill: number }) => {
  const bars = Array(2).fill(0);
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <View style={styles.container}>
        {bars.map((_, index) => (
          <View
            key={index}
            style={[index < fill ? styles.filledBar : styles.emptyBar]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: windowWidth(4),
    marginVertical: windowHeight(5),
  },
  filledBar: {
    backgroundColor: color.primary,
    flex: 1,
    height: windowHeight(1),
    borderRadius: 8,
    marginHorizontal: windowWidth(0.3),
  },
  emptyBar: {
    backgroundColor: color.subPrimary,
    flex: 1,
    height: windowHeight(1),
    borderRadius: 8,
    marginHorizontal: windowWidth(0.3),
  },
});

export default ProgressBar;
