import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILlogo} from '../../assets';

function Splash() {
  return (
    <View style={styles.container}>
      <ILlogo />
      <Text style={styles.title}>My Customer Services</Text>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    fontWeight: '600',
    fontSize: 20,
    color: '#112340',
    fontFamily: 'Nunito-SemiBold',
  },
});
