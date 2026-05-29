import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../screens/auth/login/login.screen';
import RegisterScreen from '../../screens/auth/register/register.screen';

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
    </Stack.Navigator>
  );
};

export default AuthRoutes;
