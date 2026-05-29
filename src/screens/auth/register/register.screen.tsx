import { View, Pressable } from 'react-native';

import { Button, Text, TextInput } from 'react-native-paper';

import { useAuth } from '../../../hooks/useAuth';
import { styles } from './register.screen.styles';

import { useNavigation } from '@react-navigation/native';

import { Controller, useForm } from 'react-hook-form';

type FormData = {
  name: string;
  login: string;
  password: string;
};

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const { handleRegister, loading } = useAuth();

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
    <View style={styles.container}>
      <Text variant="headlineMedium">Cadastro</Text>

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
            value={value}
            onChangeText={onChange}
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
        Cadastrar
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

export default RegisterScreen;