import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PaperProvider } from 'react-native-paper';

import { Routes } from './src/routes/routes';
import Toast from 'react-native-toast-message';

import { theme } from './src/global/theme';

export const App = () => {
  const isDarkMode =
    useColorScheme() === 'dark';

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={
            isDarkMode
              ? 'light-content'
              : 'dark-content'
          }
        />

        <Routes />
        <Toast />
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;