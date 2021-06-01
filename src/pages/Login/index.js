import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ILlogo} from '../../assets';
import {Button, Gap, Input, Link, Loading} from '../../component/Simple';
import {Qiscus} from '../../config';
import {colors, fonts, useForm} from '../../utils';

export default function Login({navigation}) {
  const [form, setForm] = useForm({email: '', password: ''});
  const [loading, setLoading] = useState(false);
  const onProcessForm = () => {
    console.log('form', form);
    setLoading(true);
    if (form.email !== '' && form.password !== '') {
      Qiscus.qiscus
        .setUser(form.email, form.password)
        .then(res => {
          setLoading(false);
          console.log('qiscus', res);
          navigation.replace('MainApp');
        })
        .catch(err => {
          setLoading(false);
          console.log({...err});
          showMessage({
            message: err.response.text,
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        });
    } else {
      setLoading(false);
      showMessage({
        message: 'Please fill out email or password!',
        type: 'default',
        backgroundColor: colors.error,
        color: colors.white,
      });
    }
    // FirebaseUtils.auth()
    //   .signInWithEmailAndPassword(form.email, form.password)
    //   .then(res => {
    //     setLoading(false);
    //     console.log('utils', res);
    //     // navigation.replace('MainApp');
    //     // qiscus
    //     //   .setUser(userId, userKey)
    //     //   .then(res => console.log('success login', res))
    //     //   .catch(err => console.log('Failed login', err));
    //   })
    //   .catch(err => {
    //     setLoading(false);
    //     showMessage({
    //       message: err.message,
    //       type: 'default',
    //       backgroundColor: colors.error,
    //       color: colors.white,
    //     });
    //   });
  };
  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <ILlogo />
          <Text style={styles.textTitle}>Masuk dan mulai berkonsultasi</Text>
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            isSecureContext
          />
          <Gap height={10} />
          <Link title="Forgot My Password" fontSize={12} />
          <Gap height={40} />
          <Button title="Sign In" onPressButton={onProcessForm} />
          <Gap height={30} />
          <Link
            title="Create New Accounts"
            fontSize={16}
            align="center"
            onPress={() => navigation.navigate('Register')}
          />
          <Gap height={64} />
        </ScrollView>
      </View>

      {loading && <Loading />}
    </>
  );
}
const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
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
