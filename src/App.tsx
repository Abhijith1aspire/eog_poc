import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import store from './store/store';
import { ThemeProvider } from './utils/ThemeContext';
import OfflineScreen from './genericComponents/OfflineScreen';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  const handleRetry = () => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected ?? false);
    });
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <ThemeProvider>
          {isConnected ? <AppNavigator /> : <OfflineScreen onRetry={handleRetry} />}
        </ThemeProvider>
      </SafeAreaView>
    </Provider>
  );
};

export default App;

