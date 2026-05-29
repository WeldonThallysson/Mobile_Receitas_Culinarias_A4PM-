import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PaperProvider } from 'react-native-paper';

import { Routes } from './src/routes/routes';

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
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;