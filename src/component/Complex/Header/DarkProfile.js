import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button} from '../../Simple';

const DarkProfile = ({onPress, chatRoomInfo}) => {
  return (
    <View style={styles.container}>
      <Button type="icon-only" icon="back-light" onPressButton={onPress} />
      <View style={styles.content}>
        <Text style={styles.name}>{chatRoomInfo.title}</Text>
        <Text style={styles.desc}>{chatRoomInfo.description}</Text>
      </View>

      <Image source={chatRoomInfo.profile} style={styles.profile} />
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
