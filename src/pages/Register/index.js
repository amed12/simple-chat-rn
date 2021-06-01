import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Button, Gap, Header, Input, Loading} from '../../component';
import {Qiscus} from '../../config';
import {colors, useForm} from '../../utils';

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
    Qiscus.qiscus
      .setUser(form.email, form.password)
      .then(success => {
        setLoading(false);
        setForm('reset');
        navigation.replace('UploadPhoto');
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
    <>
      <View style={styles.page}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <Header text="Register" onPress={() => navigation.goBack()} />
          <View style={styles.content}>
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
                if (form.email !== '' && form.password !== '') {
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
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white},
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
