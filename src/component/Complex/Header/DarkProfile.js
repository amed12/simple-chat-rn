import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ImgDummyCS2} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {Button} from '../../Simple';

const DarkProfile = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="back-light" onPressButton={onPress} />
      <View style={styles.content}>
        <Text style={styles.name}>Ramli</Text>
        <Text style={styles.desc}>CS Product A</Text>
      </View>

      <Image source={ImgDummyCS2} style={styles.profile} />
    </View>
  );
};

export default DarkProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    paddingLeft: 20,
    paddingRight: 16,
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    borderRadius: 46 / 2,
    width: 46,
    height: 46,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    marginTop: 6,
    textAlign: 'center',
    color: colors.text.subTitle,
  },
});
