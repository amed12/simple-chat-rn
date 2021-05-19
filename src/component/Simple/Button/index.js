import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Button({type, title, onPressButton}) {
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPressButton}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor: type === 'secondary' ? 'white' : '#0bcad4',
    paddingVertical: 10,
    borderRadius: 10,
  }),
  text: type => ({
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: type === 'secondary' ? '#112340' : 'white',
    fontFamily: 'Nunito-SemiBold',
  }),
});
