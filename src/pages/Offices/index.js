import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Offices = () => {
  return (
    <View style={styles.page}>
      <Text>Halaman Offices</Text>
      <Text>On Going</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  page: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
export default Offices;
