import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ILlogo} from '../../assets';
import {BGgetstarted} from '../../assets/Icon';
import {Button, Gap} from '../../component/Simple';
import {colors, fonts} from '../../utils';

export default function GetStarted({navigation}) {
  return (
    <ImageBackground source={BGgetstarted} style={styles.page}>
      <View>
        <ILlogo />
        <Text style={styles.titleText}>
          Konsultasi pelanggan jadi lebih mudah & fleksibel
        </Text>
      </View>

      <View>
        <Button
          title="Get Started"
          onPressButton={() => navigation.navigate('Register')}
        />
        <Gap height={16} width={0} />
        <Button
          type="secondary"
          title="Sign In"
          onPressButton={() => navigation.replace('Login')}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: colors.white,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.white,
    marginTop: 60,
    fontFamily: fonts.primary[600],
  },
});
