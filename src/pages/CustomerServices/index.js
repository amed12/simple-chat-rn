import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CustomerServices = () => {
  return (
    <View style={styles.page}>
      <Text>Halaman CS</Text>
      <Text>On Going</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  page: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
export default CustomerServices;
