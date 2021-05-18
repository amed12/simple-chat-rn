import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILlogo} from './assets';

export default function App() {
  return (
    <View style={styles.container}>
      <ILlogo />
      <Text>My Customer Services</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});
