import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input} from '../../component';
import {colors} from '../../utils';

export default function Register({navigation}) {
  return (
    <ScrollView style={styles.page}>
      <Header text="Register" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Input label="Full Name" />
        <Gap height={24} />
        <Input label="Pekerjaan" />
        <Gap height={24} />
        <Input label="Email" />
        <Gap height={24} />
        <Input label="Password" />
        <Gap height={40} />
        <Button
          title="Continue"
          onPressButton={() => navigation.navigate('UploadPhoto')}
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
