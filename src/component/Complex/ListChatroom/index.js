import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ICDummyCS} from '../../../assets';
import {colors, fonts} from '../../../utils';

const ListChatroom = () => {
  return (
    <View style={styles.container}>
      <Image source={ICDummyCS} style={styles.avatar} />
      <View>
        <Text style={styles.name}> Achmad samsul</Text>
        <Text style={styles.desc}> Wah kamu habis ...</Text>
      </View>
    </View>
  );
};

export default ListChatroom;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
  },
  avatar: {width: 46, height: 46, borderRadius: 46 / 2, marginRight: 12},
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
  },
});
