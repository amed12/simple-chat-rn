import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ILlogo} from '../../assets';
import {BGgetstarted} from '../../assets/Icon';
import {Button} from '../../component/Simple';

export default function GetStarted() {
  return (
    <ImageBackground source={BGgetstarted} style={styles.page}>
      <View>
        <ILlogo />
        <Text style={styles.titleText}>
          Konsultasi pelanggan jadi lebih mudah & fleksibel
        </Text>
      </View>

      <View>
        <Button title="Get Started" />
        <View style={{height: 16}} />
        <Button type="secondary" title="Sign In" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    justifyContent: 'space-between',
    flex: 1,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
    marginTop: 91,
  },
});
