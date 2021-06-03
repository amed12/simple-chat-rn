import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import {Qiscus} from './config';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import {Loading} from './component';

export default function App() {
  useEffect(() => {
    Qiscus.init();
  }, []);
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};
