import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../screens/auth/login/login.screen';
import RegisterScreen from '../../screens/auth/register/register.screen';
import RecoverPassword from '../../screens/auth/recover-password/recover-password.screen';
import ResetPassword from '../../screens/auth/reset-password/reset-password.screen';

const Stack = createNativeStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="Register" component={RegisterScreen} />
      
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
