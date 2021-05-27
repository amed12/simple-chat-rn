import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const Loading = () => {
  return (
    <View style={styles.page}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default Loading;
const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.loadingBackground,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  text: {
    marginTop: 16,
    color: colors.primary,
    fontFamily: fonts.primary[600],
    fontSize: 18,
  },
});
