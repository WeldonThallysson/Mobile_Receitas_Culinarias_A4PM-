import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { Button, HelperText, Text, TextInput } from 'react-native-paper';

import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/useAuth';

import { LoginFormData, loginSchema } from '../../../schemas/login.schema';

import { styles } from './login.screen.styles';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import { parseCPFOrEmail } from '../../../utils/formatters/character';

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const { handleLogin, loading } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await handleLogin(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 60}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', gap: 10, paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Icon name="restaurant-menu" size={80} color="#2563EB" />

        <Text variant="headlineMedium" style={styles.title}>
          Receitas Culinárias
        </Text>

        <Text style={styles.subtitle}>Organize suas receitas favoritas</Text>
      </View>
        <View style={{ gap: 10 }}>
          <Controller
            control={control}
            name="login"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  testID="login-input"
                  mode="outlined"
                  label="Login"
                  placeholder="E-mail ou CPF"
                  value={value}
                  onChangeText={(text) => onChange(parseCPFOrEmail(text))}
                />
                {errors?.login?.message && (
                  <HelperText type="error" visible={!!errors.login}>
                    {errors.login?.message}
                  </HelperText>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <>
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
                {errors.password?.message && (
                  <HelperText type="error" visible={!!errors.password}>
                    {errors.password?.message}
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
        Entrar
      </Button>

      <Button mode="text" onPress={() => navigation.navigate('Register')}>
        Ainda não possui uma conta? crie agora!
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('RecoverPassword')}
      >
        Recuperar senha
      </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
