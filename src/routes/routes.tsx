import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './app.routes';
import AuthRoutes from './stacks/auth.routes';

import { getToken } from '../storage/auth.storage';
import { useAuthStore } from '../store/auth.store';

export const Routes = () => {
  const token = useAuthStore((state) => state.token);
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const loadToken = async () => {
      const tokenStored = await getToken();

      setToken(tokenStored);
    };

    loadToken();
  }, [setToken]);

  return (
    <NavigationContainer>
      {token ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};