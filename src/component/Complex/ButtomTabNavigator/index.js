import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Qiscus} from '../../../config';
import {colors, showAlert} from '../../../utils';
import {TabItem} from '../../Simple';

const ButtomNavigation = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onPressOffices = () => {
          if (index === 2) {
            showAlert('mau log out ?', () => {
              AsyncStorage.removeItem('qiscus')
                .then(() => {
                  navigation.replace('GetStarted');
                  Qiscus.qiscus.disconnect();
                })
                .catch(error => {
                  console.log('error when trying to logout', error);
                });
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabItem
            key={index}
            title={label}
            active={isFocused}
            onPress={onPressOffices}
            // onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};

export default ButtomNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 38,
    paddingVertical: 12,
    backgroundColor: colors.secondary,
  },
});
