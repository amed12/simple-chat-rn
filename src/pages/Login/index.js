import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {ILlogo} from '../../assets';
import {Button, Gap, Input, Link} from '../../component/Simple';

export default function Login() {
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
      <Button title="Sign In" />
      <Gap height={30} />
      <Link title="Create New Accounts" fontSize={16} align="center" />
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
    fontFamily: 'Nunito-SemiBold',
    color: '#112340',
    marginVertical: 40,
    marginTop: 40,
    maxWidth: 153,
  },
});
