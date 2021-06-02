import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import * as ImagePicker from 'react-native-image-picker';
import {ICAddUserProfle, ICloseRed} from '../../assets';
import {Button, Gap, Header, Link} from '../../component';
import {colors, fonts, getDataObject} from '../../utils';

const UploadPhoto = ({navigation}) => {
  const [form, setForm] = useState({});
  const [photo, setPhoto] = useState({
    uri: 'https://d1edrlpyc25xu0.cloudfront.net/kiwari-prod/image/upload/75r6s_jOHa/1507541871-avatar-mine.png',
  });
  getDataObject('user').then(res => {
    setForm(res);
  });
  const [hasPhoto, setHasPhoto] = useState(false);

  const onImageClick = () => {
    ImagePicker.launchImageLibrary({mediaType: 'mixed'}, response => {
      console.log('response ->', response);
      if (response.didCancel) {
        showMessage({
          message: 'Opss, you not choose any photo !',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        const source = {uri: response.assets[0].uri};
        setPhoto(source);
        setHasPhoto(true);
      }
    });
  };
  return (
    <View style={styles.page}>
      <Header text="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.avatar}>
          <TouchableOpacity
            style={styles.profileWrapper}
            onPress={onImageClick}>
            <Image source={photo} style={styles.profile} />
            {!hasPhoto && <ICAddUserProfle style={styles.addPhoto} />}
            {hasPhoto && <ICloseRed style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{form.fullName}</Text>
          <Text style={styles.job}>{form.job}</Text>
        </View>
        <View>
          <Button title="Upload and Continue" disable={!hasPhoto} />
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
    borderRadius: 110 / 2,
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
