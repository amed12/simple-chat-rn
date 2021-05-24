import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {ILlogo} from '../../assets';
import {Button, Gap, Input, Link} from '../../component/Simple';
import {colors, fonts} from '../../utils';

export default function Login({navigation}) {
  return (
    <ScrollView style={styles.page}>
      <ILlogo />
      <Text style={styles.textTitle}>Masuk dan mulai berkonsultasi</Text>
      <Input label="Email Address" />
      <Gap height={24} />
      <Input label="Password" />
      <Gap height={10} />
      <Link title="Forgot My Password" fontSize={12} />
      <Gap height={40} />
      <Button
        title="Sign In"
        onPressButton={() => navigation.replace('MainApp')}
      />
      <Gap height={30} />
      <Link
        title="Create New Accounts"
        fontSize={16}
        align="center"
        onPress={() => navigation.navigate('Register')}
      />
      <Gap height={64} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: {
    padding: 40,
    flex: 1,
    backgroundColor: 'white',
  },
  textTitle: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    marginTop: 40,
    maxWidth: 153,
  },
});
