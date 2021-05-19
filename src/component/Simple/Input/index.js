import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const Input = ({title}) => {
  return (
    <View>
      <Text style={styles.label}>{title}</Text>
      <TextInput style={styles.input} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#e9e9e9',
    borderRadius: 10,
    padding: 12,
  },
  label: {
    fontSize: 16,
    color: '#7d8797',
    marginBottom: 6,
    fontFamily: 'Nunito-Reguler',
  },
});
