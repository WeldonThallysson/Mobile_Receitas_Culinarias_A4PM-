import { Pressable, View } from 'react-native';

import { Button, Text, TextInput } from 'react-native-paper';

import { useAuth } from '../../../hooks/useAuth';
import { styles } from './reset-password.screen.styles';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Controller, useForm } from 'react-hook-form';

type FormData = {
  oldPassword: string;
  newPassword: string;
};
import { ResetPasswordRouteProp } from '../../../types/auth.routes.types'; 
const ResetPassword = () => {
  const { handleResetPassword, loading } = useAuth();
  const navigation = useNavigation<any>();
  const route =
    useRoute<ResetPasswordRouteProp>();

const { token } = route.params;
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const onSubmit = async (
    data: FormData,
  ) => {
    await handleResetPassword({
      token,
      oldPassword:
        data.oldPassword,
      newPassword:
        data.newPassword,
    });

    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Redefinir senha</Text>

      <Controller
        control={control}
        name="oldPassword"
        render={({ field: { value, onChange } }) => (
          <TextInput
            testID="old-password-input"
            mode="outlined"
            label="Senha atual"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="newPassword"
        render={({ field: { value, onChange } }) => (
          <TextInput
            testID="new-password-input"
            mode="outlined"
            label="Nova senha"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Button
        mode="contained"
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      >
        Redefinir
      </Button>

      <Button
        mode="text" onPress={() => navigation.navigate('Login')}>
        <Text variant="bodyMedium">
          Você possui uma conta? Realize o login
        </Text>
      </Button>
    </View>
  );
};

export default ResetPassword;