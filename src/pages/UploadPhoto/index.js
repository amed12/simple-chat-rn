import React from 'react';
import {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ICAddUserProfle, ICloseRed} from '../../assets';
import {Button, Gap, Header, Link} from '../../component';
import {colors, fonts} from '../../utils';

const UploadPhoto = ({route, navigation}) => {
  const {form} = route.params;
  const [hasPhoto, setHasPhoto] = useState(false);
  console.log('route param', form);
  return (
    <View style={styles.page}>
      <Header text="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.avatar}>
          <View style={styles.profileWrapper}>
            <Image
              source={{
                uri: form.avatarUrl,
              }}
              style={styles.profile}
            />
            {!hasPhoto && <ICAddUserProfle style={styles.addPhoto} />}
            {hasPhoto && <ICloseRed style={styles.addPhoto} />}
          </View>
          <Text style={styles.name}>{form.fullName}</Text>
          <Text style={styles.job}>{form.job}</Text>
        </View>
        <View>
          <Button title="Upload and Continue" disable />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            fontSize={16}
            onPress={() => navigation.replace('MainApp')}
          />
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
