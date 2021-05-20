import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ICBackDark} from '../../../assets';
import {colors} from '../../../utils';
import {Gap} from '../../Simple';

const Header = ({text}) => {
  return (
    <View style={styles.container}>
      <ICBackDark />
      <Text style={styles.text}>{text}</Text>
      <Gap width={8} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    color: colors.text.primary,
  },
});
