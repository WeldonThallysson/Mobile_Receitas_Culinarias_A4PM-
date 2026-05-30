import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';

import { Button, Text, TextInput } from 'react-native-paper';

import { useAuth } from '../../../hooks/useAuth';
import { styles } from './reset-password.screen.styles';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';

type FormData = {
  oldPassword: string;
  newPassword: string;
};
import { ResetPasswordRouteProp } from '../../../types/auth.routes.types';
const ResetPassword = () => {
  const { handleResetPassword, loading } = useAuth();
  const navigation = useNavigation<any>();
  const route = useRoute<ResetPasswordRouteProp>();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { token } = route.params;
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await handleResetPassword({
      token,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Redefinir senha</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          gap: 10,
        }}
      >
        <Controller
          control={control}
          name="oldPassword"
          render={({ field: { value, onChange } }) => (
            <TextInput
              testID="old-password-input"
              mode="outlined"
              label="Senha atual"
              secureTextEntry={!showOldPassword}
              value={value}
              onChangeText={onChange}
              right={
                <TextInput.Icon
                  icon={showOldPassword ? 'eye' : 'eye-off'}
                  onPress={() => setShowOldPassword((prev) => !prev)}
                />
              }
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
              secureTextEntry={!showNewPassword}
              value={value}
              onChangeText={onChange}
              right={
                <TextInput.Icon
                  icon={showNewPassword ? 'eye' : 'eye-off'}
                  onPress={() => setShowNewPassword((prev) => !prev)}
                />
              }
            />
          )}
        />
      </KeyboardAvoidingView>

      <Button
        mode="contained"
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      >
        Redefinir
      </Button>

      <Button mode="text" onPress={() => navigation.navigate('Login')}>
        <Text variant="bodyMedium">Você possui uma conta? Realize o login</Text>
      </Button>
    </View>
  );
};

export default ResetPassword;
