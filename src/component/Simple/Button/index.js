import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';
import ButtonSendIcon from './BtnIconSend';
import IconOnly from './IconOnly';

export default function Button({type, title, onPressButton, icon, disable}) {
  if (type === 'icon-only') {
    return <IconOnly icon={icon} onPress={onPressButton} />;
  }
  if (type === 'btn-icon-send') {
    return <ButtonSendIcon disable={disable} />;
  }
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPressButton}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor:
      type === 'secondary'
        ? colors.button.secondary.background
        : colors.button.primary.background,
    paddingVertical: 10,
    borderRadius: 10,
  }),
  text: type => ({
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color:
      type === 'secondary'
        ? colors.button.secondary.text
        : colors.button.primary.text,
    fontFamily: fonts.primary[600],
  }),
});
