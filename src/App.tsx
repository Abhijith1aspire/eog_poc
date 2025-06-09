import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {

  return (
    <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <AppNavigator />
    </SafeAreaView>
    </Provider>
  );
};

export default App;
