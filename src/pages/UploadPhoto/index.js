import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {ICAddUserProfle, ICloseRed} from '../../assets';
import {Button, Gap, Header, Link} from '../../component';
import {Qiscus} from '../../config';
import {colors, fonts, showError} from '../../utils';

const UploadPhoto = ({route, navigation}) => {
  const {form} = route.params;
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState({uri: form.avatarUrl});
  const [photoBase64, setPhotoData] = useState('');
  const updateProfile = () => {
    Qiscus.qiscus
      .updateProfile({
        name: form.fullName, // String
        avatar_url: photoBase64,
      })
      .then(res => {
        console.log('update profile success', res);
        navigation.replace('MainApp');
      })
      .catch(err => {
        console.log(err);
      });
  };
  const onImageClick = () => {
    ImagePicker.launchImageLibrary(
      {includeBase64: true, quality: 0.5, maxWidth: 200, maxHeight: 200},
      response => {
        console.log('response ->', response);
        if (response.didCancel) {
          showError('Opss, you not choose any photo !');
        } else {
          const source = {uri: response.assets[0].uri};
          setPhotoData(
            `data:${response.assets[0].type};base64, ${response.assets[0].base64}`,
          );
          setPhoto(source);
          setHasPhoto(true);
        }
      },
    );
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
          <Button
            title="Upload and Continue"
            disable={!hasPhoto}
            onPressButton={updateProfile}
          />
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
