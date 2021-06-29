import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors, fonts} from '../../../utils';

type Props = {
  label: String,
  onChangeText: Function,
  isSecureContext: Boolean,
}
const Input = (props: Props) => {
  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.tertiary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.isSecureContext}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: border => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    padding: 12,
  }),
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
    fontFamily: fonts.primary.normal,
  },
});
/*
state untuk inisiasi awal akan menjadi patokan tipe data apa dia
misal :
const dummy = setState(''); -> string
 */
