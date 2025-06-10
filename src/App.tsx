// // import React, { useEffect, useState } from 'react';
// // import { Dimensions } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import AppNavigator from './navigation/AppNavigator';
// // import { Provider } from 'react-redux';
// // import store from './store/store';
// // import { ThemeProvider } from './utils/ThemeContext';

// // const App = () => {

// //   return (
// //     <Provider store={store}>
// //     <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
// //        <ThemeProvider> 
// //       <AppNavigator />
// //         </ThemeProvider>
// //     </SafeAreaView>
// //     </Provider>
// //   );
// // };

// // export default App;
// // App.tsx
// import React, { useEffect, useState } from 'react';
// import NetInfo from '@react-native-community/netinfo';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Provider } from 'react-redux';
// import AppNavigator from './navigation/AppNavigator';
// import store from './store/store';
// import { ThemeProvider } from './utils/ThemeContext';
// import OfflineScreen from './genericComponents/OfflineScreen';

// const App = () => {
//   const [isConnected, setIsConnected] = useState(true);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener((state) => {
//       setIsConnected(state.isConnected ?? false);
//     });

//     NetInfo.fetch().then((state) => {
//       setIsConnected(state.isConnected ?? false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleRetry = () => {
//     NetInfo.fetch().then((state) => {
//       setIsConnected(state.isConnected ?? false);
//     });
//   };

//   return (
//     <Provider store={store}>
//       <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
//         <ThemeProvider>
//           {isConnected ? <AppNavigator /> : <OfflineScreen onRetry={handleRetry} />}
//         </ThemeProvider>
//       </SafeAreaView>
//     </Provider>
//   );
// };

// export default App;


import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import analytics from '@react-native-firebase/analytics';

export default function App() {

  useEffect(() => {
    logAppOpenEvent();
    verifyEvent()
  }, []);

  const logAppOpenEvent = async () => {
    await analytics().logAppOpen();
    console.log('App Open event logged');
  };

  const verifyEvent = async () => {
  const events = await analytics().getAppInstanceId();
  console.log('App instance ID:', events);
  
  // Alternative check
  analytics().logEvent('test_verification', {}).then(() => {
    console.log('Verification event sent successfully');
  });
};
  
  const logCustomEvent = async () => {
    await analytics().logEvent('product_view', {
      id: 'P12345',
      name: 'Gold Ring',
      category: 'Jewellery',
      price: 4999,
    });
    console.log('Custom event logged');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Firebase Analytics Demo</Text>
      <Button title="Log Product View Event" onPress={logCustomEvent} />
    </View>
  );
}
