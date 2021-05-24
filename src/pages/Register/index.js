import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input} from '../../component';
import {colors, showAlert, useForm} from '../../utils';

export default function Register({navigation}) {
  const [form, setForm] = useForm({
    fullName: '',
    job: '',
    email: '',
    password: '',
  });
  return (
    <ScrollView style={styles.page} showsHorizontalScrollIndicator={false}>
      <Header text="Register" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Input
          label="Full Name"
          value={form.fullName}
          onChangeText={value => setForm('fullName', value)}
        />
        <Gap height={24} />
        <Input
          value={form.job}
          label="Pekerjaan"
          onChangeText={value => setForm('job', value)}
        />
        <Gap height={24} />
        <Input
          value={form.email}
          label="Email"
          onChangeText={value => setForm('email', value)}
        />
        <Gap height={24} />
        <Input
          value={form.password}
          label="Password"
          onChangeText={value => setForm('password', value)}
          isSecureContext={true}
        />
        <Gap height={40} />
        <Button
          title="Continue"
          onPressButton={() => {
            if (
              form.fullName !== '' &&
              form.job !== '' &&
              form.email !== '' &&
              form.password !== ''
            ) {
              navigation.navigate('UploadPhoto');
            } else {
              showAlert('Please fill form first !');
            }
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white},
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
