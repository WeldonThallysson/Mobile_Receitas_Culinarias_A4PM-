import { Pressable, View } from 'react-native';

import { Button, HelperText, Text, TextInput } from 'react-native-paper';

import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '../../../hooks/useAuth';

import { useNavigation } from '@react-navigation/native';

import {
  RecoverPasswordFormData,
  recoverPasswordSchema,
} from '../../../schemas/recover-password.schema';

import { styles } from './recover-password.screen.styles';

const RecoverPassword = () => {
  const navigation = useNavigation<any>();

  const { handleRecoverPassword, loading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordFormData>({
    resolver: zodResolver(recoverPasswordSchema),

    defaultValues: {
      login: '',
    },
  });

  const onSubmit = async (data: RecoverPasswordFormData) => {
    await handleRecoverPassword({
      login: data.login,
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Recuperar senha</Text>

      <Controller
        control={control}
        name="login"
        render={({ field: { value, onChange } }) => (
          <>
            <TextInput
              mode="outlined"
              label="Login"
              value={value}
              onChangeText={onChange}
              testID="login-input"
            />

            {errors.login?.message && (
              <HelperText type="error" visible={!!errors.login}>
                {errors.login?.message}
              </HelperText>
            )}
          </>
        )}
      />

      <Button
        mode="contained"
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      >
        Recuperar
      </Button>
      <Button mode="text" onPress={() => navigation.navigate('Login')}>
        <Text variant="bodyMedium">Você possui uma conta? Realize o login</Text>
      </Button>
    </View>
  );
};

export default RecoverPassword;
