import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';

const Link = ({title, fontSize, align, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text(fontSize, align)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Link;
const styles = StyleSheet.create({
  text: (fontSize, align) => ({
    fontSize: fontSize,
    color: colors.text.secondary,
    fontFamily: fonts.primary.normal,
    textDecorationLine: 'underline',
    textAlign: align,
  }),
});
