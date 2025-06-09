import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {
  const [orientationKey, setOrientationKey] = useState(0);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setOrientationKey(prev => prev + 1); 
    });

    return () => subscription?.remove?.(); 
  }, []);

  return (
    <Provider store={store}>
    <SafeAreaView style={{ flex: 1 }} key={orientationKey}>
      <AppNavigator />
    </SafeAreaView>
    </Provider>
  );
};

export default App;
