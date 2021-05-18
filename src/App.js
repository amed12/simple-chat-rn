import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function App() {
  return (
    <View>
      <Text style={styles.textAlign}>Hello world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textAlign: {
    textAlign: 'center',
  },
});
