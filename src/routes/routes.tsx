import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './app.routes';
import AuthRoutes from './stacks/auth.routes';

import { getToken } from '../storage/auth.storage';

export const Routes = () => {
  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const tokenStored = await getToken();

      setToken(tokenStored);

      setLoading(false);
    };

    loadToken();
  }, []);

  return (
    <NavigationContainer>
      {token ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};