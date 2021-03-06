const mainColors = {
  green1: '#0bcad4',
  dark1: '#112340',
  dark2: '#495A75',
  dark3: '#8092af',
  grey1: '#7d8797',
  grey2: '#e9e9e9',
  grey3: '#edeef0',
  grey4: '#EDFCFD',
  grey5: '#b1b7c2',
  grey6: '#979797',
  blue1: '#0066cb',
  black1: '#000000',
  black2: 'rgba(0, 0 ,0 , 0.5)',
  red1: '#e06379',
  green2: '#94ca62',
};

export const colors = {
  primary: mainColors.green1,
  secondary: mainColors.dark1,
  tertiary: mainColors.blue1,
  white: 'white',
  black: 'black',
  cardLight: mainColors.grey4,
  disable: mainColors.grey3,
  text: {
    primary: mainColors.dark1,
    secondary: mainColors.grey1,
    menuInactive: mainColors.dark2,
    menuActive: mainColors.green1,
    subTitle: mainColors.dark3,
  },
  button: {
    primary: {
      background: mainColors.green1,
      text: 'white',
    },
    secondary: {
      background: 'white',
      text: mainColors.dark1,
    },
    disable: {
      background: mainColors.grey3,
      text: mainColors.grey5,
    },
  },
  border: mainColors.grey2,
  loadingBackground: mainColors.black2,
  error: mainColors.red1,
  unreadButton: mainColors.green2,
  timeMessageItem: mainColors.grey6,
};
