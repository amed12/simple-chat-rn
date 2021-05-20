import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, fonts} from '../../../utils';

const Link = ({title, fontSize, align}) => {
  return (
    <View>
      <Text style={styles.text(fontSize, align)}>{title}</Text>
    </View>
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
