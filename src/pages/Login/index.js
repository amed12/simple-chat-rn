import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useState} from 'react/cjs/react.development';
import xs from 'xstream';
import flattenConcurently from 'xstream/extra/flattenConcurrently';
import {ILlogo} from '../../assets';
import {Button, Gap, Input, Link} from '../../component/Simple';
import {Qiscus} from '../../config';
import {colors, fonts, showError, useForm} from '../../utils';

export default function Login({navigation}) {
  const storage = useAsyncStorage('qiscus');
  const [form, setForm] = useForm({email: '', password: ''});
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const onProcessForm = () => {
    console.log('form', form);
    dispatch({type: 'SET_LOADING', value: true});
    if (form.email !== '' && form.password !== '') {
      Qiscus.qiscus
        .setUser(form.email, form.password)
        .then(res => {
          dispatch({type: 'SET_LOADING', value: false});
          console.log('qiscus', res);
        })
        .catch(err => {
          dispatch({type: 'SET_LOADING', value: false});
          console.log({...err});
          const {text} = err.response;
          let jsonObject = JSON.parse(text);
          showError(jsonObject.error.message);
        });
    } else {
      dispatch({type: 'SET_LOADING', value: false});
      showError('Please fill out email or password!');
    }
  };
  useEffect(() => {
    const subscription = Qiscus.login$()
      .map(it => it.user)
      .take(1)
      .map(data => xs.fromPromise(storage.setItem(JSON.stringify(data))))
      .compose(flattenConcurently)
      .subscribe({
        next() {
          setIsLogin(true);
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [storage]);

  useEffect(() => {
    if (isLogin) {
      navigation.replace('MainApp');
    }
  }, [isLogin, navigation]);
  return (
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
