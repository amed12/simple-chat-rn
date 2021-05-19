import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

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
    color: '#7d8797',
    fontFamily: 'Nunito-Regular',
    textDecorationLine: 'underline',
    textAlign: align,
  }),
});
