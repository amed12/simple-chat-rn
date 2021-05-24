import {Alert} from 'react-native';

const showAlert = text =>
  Alert.alert('Alert Title', text, [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

export {showAlert};
