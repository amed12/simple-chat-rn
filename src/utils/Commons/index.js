import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {colors} from '../Color';

const showAlert = text =>
  Alert.alert('Alert Title', text, [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

const showError = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.error,
    color: colors.white,
  });
};

export {showAlert, showError};
