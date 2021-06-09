import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {colors} from '../Color';

const showAlert = (text, action) =>
  Alert.alert('Warning !!', text, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: action},
  ]);

const showError = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.error,
    color: colors.white,
  });
};

const showSuccess = message => {
  showMessage({
    message: message,
    type: 'success',
    color: colors.white,
  });
};
export {showAlert, showError, showSuccess};
