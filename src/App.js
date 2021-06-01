import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect } from 'react';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import { Qiscus } from './config';

export default function App() {
  useEffect(() => {
    Qiscus.init();
  }, []);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  );
}
