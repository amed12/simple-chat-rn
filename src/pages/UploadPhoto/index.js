import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ICAddUserProfle, ICEmptyProfile} from '../../assets';
import {Button, Gap, Header, Link} from '../../component';
import {colors, fonts} from '../../utils';

const UploadPhoto = () => {
  return (
    <View style={styles.page}>
      <Header text="Upload Photo" />
      <View style={styles.content}>
        <View style={styles.avatar}>
          <View style={styles.profileWrapper}>
            <Image source={ICEmptyProfile} style={styles.profile} />
            <ICAddUserProfle style={styles.addPhoto} />
          </View>
          <Text style={styles.name}>Lina Maunya</Text>
          <Text style={styles.job}>Front End</Text>
        </View>
        <View>
          <Button title="Upload and Continue" />
          <Gap height={30} />
          <Link title="Skip for this" align="center" fontSize={16} />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profile: {
    width: 110,
    height: 110,
  },
  profileWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  job: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
  },
  content: {
    paddingHorizontal: 40,
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 64,
  },
  avatar: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});