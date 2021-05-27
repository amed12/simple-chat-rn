import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input, Loading} from '../../component';
import {colors, showAlert, useForm} from '../../utils';
import {FirebaseUtils} from '../../config';
import {useState} from 'react';
import {showMessage, hideMessage} from 'react-native-flash-message';

export default function Register({navigation}) {
  const [form, setForm] = useForm({
    fullName: '',
    job: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const onProcessForm = () => {
    setLoading(true);
    FirebaseUtils.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        setLoading(false);
        setForm('reset');
        console.log('register success', success);
      })
      .catch(error => {
        const errorMessage = error.message;
        setLoading(false);
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };
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
              onProcessForm();
            } else {
              showMessage({
                message: 'Please fill all data first !',
                type: 'default',
                backgroundColor: colors.error,
                color: colors.white,
              });
            }
          }}
        />
      </View>
      {loading && <Loading />}
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
