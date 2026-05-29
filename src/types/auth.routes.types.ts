
import {
  RouteProp,
} from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RecoverPassword: undefined;

  ResetPassword: {
    token: string;
  };
};

export type ResetPasswordRouteProp =
  RouteProp<
    AuthStackParamList,
    'ResetPassword'
  >;