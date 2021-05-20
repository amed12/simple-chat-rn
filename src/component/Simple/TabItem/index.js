import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  ICCSActive,
  ICCSInactive,
  ICMessageActive,
  ICMessageInActive,
  ICOfficeActive,
  ICOfficeInActive,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (title === 'CS') {
      return active ? <ICCSActive /> : <ICCSInactive />;
    }
    if (title === 'Messages') {
      return active ? <ICMessageActive /> : <ICMessageInActive />;
    }
    if (title === 'Offices') {
      return active ? <ICOfficeActive /> : <ICOfficeInActive />;
    }
    return <ICCSActive />;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;
const styles = StyleSheet.create({
  container: {alignItems: 'center'},
  text: active => ({
    fontSize: 10,
    color: active ? colors.text.menuActive : colors.text.menuInactive,
    fontFamily: fonts.primary[600],
    marginTop: 4,
  }),
});
