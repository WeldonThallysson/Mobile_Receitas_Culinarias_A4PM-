import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './app.routes';
import AuthRoutes from './stacks/auth.routes';

import { getToken } from '../storage/auth.storage';
import { useAuthStore } from '../store/auth.store';

export const Routes = () => {
  const [token, setToken] = useState<string | null>(null);
  const tokenAuth = useAuthStore(
    (state) => state.token,
  );

  useEffect(() => {
    const loadToken = async () => {
      const tokenStored = await getToken();

      setToken(tokenStored);

    };

    loadToken();
  }, [tokenAuth]);

  return (
    <NavigationContainer>
      {token ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};