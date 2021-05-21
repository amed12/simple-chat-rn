import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils';

const Offices = () => {
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text>Halaman Offices</Text>
        <Text>On Going</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
export default Offices;
