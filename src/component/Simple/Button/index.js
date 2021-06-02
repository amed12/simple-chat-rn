import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
  if (disable) {
    return (
      <View style={styles.disableBg}>
        <Text style={styles.disableText}>{title}</Text>
      </View>
    );
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
  disableBg: {
    backgroundColor: colors.button.disable.background,
    paddingVertical: 10,
    borderRadius: 10,
  },
  disableText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.button.disable.text,
    fontFamily: fonts.primary[600],
  },
});
