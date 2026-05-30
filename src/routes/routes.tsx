import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './app.routes';
import AuthRoutes from './stacks/auth.routes';

import { getAuth } from '../storage/auth.storage';
import { useAuthStore } from '../store/auth.store';

export const Routes = () => {
  const token = useAuthStore((state) => state.token);
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const loadAuthFromStorage = async () => {
      const authData = await getAuth();

      if (authData) {
        setAuth({
          userId: authData.userId,
          token: authData.token,
          message: authData.message,
        });
      }
    };

    loadAuthFromStorage();
  }, [setAuth]);

  return (
    <NavigationContainer>
      {token ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};