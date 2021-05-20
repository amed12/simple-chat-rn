import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useEffect} from 'react/cjs/react.development';
import {ILlogo} from '../../assets';
import {colors, fonts} from '../../utils';

function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('GetStarted');
    }, 1200);
  }, [navigation]);
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
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    fontWeight: '600',
    fontSize: 20,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
  },
});
