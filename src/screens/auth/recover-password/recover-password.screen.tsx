import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

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
import { parseCPFOrEmail } from '../../../utils/formatters/character';

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 60}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', gap: 12, paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text variant="headlineMedium">Recuperar senha</Text>

        <View style={{ gap: 10 }}>
          <Controller
            control={control}
            name="login"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  mode="outlined"
                  label="Login"
                  placeholder="E-mail ou CPF"
                  value={value}
                  onChangeText={(text) => onChange(parseCPFOrEmail(text))}
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
        </View>

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RecoverPassword;
