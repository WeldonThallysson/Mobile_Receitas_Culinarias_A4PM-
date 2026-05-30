import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { Button, Text, TextInput } from 'react-native-paper';

import { useAuth } from '../../../hooks/useAuth';
import { styles } from './register.screen.styles';

import { useNavigation } from '@react-navigation/native';

import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { parseCPFOrEmail } from '../../../utils/formatters/character';

type FormData = {
  name: string;
  login: string;
  password: string;
};

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const { handleRegister, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await handleRegister(data);
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
        <Text variant="headlineMedium">Cadastro</Text>

        <View style={{ gap: 10 }}>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <TextInput
                testID="name-input"
                mode="outlined"
                label="Nome"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="login"
            render={({ field: { value, onChange } }) => (
              <TextInput
                testID="login-input"
                mode="outlined"
                label="Login"
                placeholder="E-mail ou CPF"
                value={value}
                onChangeText={(text) => onChange(parseCPFOrEmail(text))}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <TextInput
                testID="password-input"
                mode="outlined"
                label="Senha"
                secureTextEntry={!showPassword}
                value={value}
                onChangeText={onChange}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye' : 'eye-off'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
            )}
          />
        </View>

        <Button
          mode="contained"
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        >
          Cadastrar
        </Button>

        <Button mode="text" onPress={() => navigation.navigate('Login')}>
          <Text variant="bodyMedium">Você possui uma conta? Realize o login</Text>
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
