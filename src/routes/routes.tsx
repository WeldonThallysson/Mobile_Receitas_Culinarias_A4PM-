import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './app.routes';
import AuthRoutes from './stacks/auth.routes'

import { useAuthStore } from '../store/auth.store';

export const Routes = () => {
  const token = useAuthStore(
    (state) => state.token,
  );

  return (
    <NavigationContainer>
      {token ? (
        <AppRoutes />
      ) : (
        <AuthRoutes />
      )}
    </NavigationContainer>
  );
};