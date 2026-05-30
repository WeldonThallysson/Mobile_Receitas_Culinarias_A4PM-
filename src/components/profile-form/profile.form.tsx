import { useEffect, useState } from 'react';

import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import {
  Button,
  Dialog,
  HelperText,
  Portal,
  TextInput,
} from 'react-native-paper';

import { Controller, useForm } from 'react-hook-form';

import { styles } from './profile.form.styles';
import { parseCPFOrEmail } from '../../utils/formatters/character';

export interface ProfileFormData {
  name: string;
  login: string;
  password: string;
}

interface ProfileFormProps {
  visible: boolean;
  loading?: boolean;

  initialData?: {
    name: string;
    login: string;
  } | null;

  onClose: () => void;

  onSubmit: (data: ProfileFormData) => Promise<void>;
}

export const ProfileForm = ({
  visible,
  loading = false,
  initialData,
  onClose,
  onSubmit,
}: ProfileFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });

  useEffect(() => {
    if (!visible) return;

    reset({
      name: initialData?.name ?? '',
      login: initialData?.login ?? '',
      password: '',
    });
  }, [visible, initialData]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = async (data: ProfileFormData) => {
    await onSubmit(data);

    reset();
    onClose();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={loading ? undefined : handleClose}>
        <Dialog.Title>Atualizar perfil</Dialog.Title>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 60}
     
        >
          <Dialog.ScrollArea>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.content}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <TextInput
                        testID="name-input"
                        label="Nome"
                        value={value}
                        onChangeText={onChange}
                        disabled={loading}
                      />
                      {errors?.name?.message && (
                        <HelperText type="error" visible={!!errors.name}>
                          {errors.name?.message}
                        </HelperText>
                      )}
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="login"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <TextInput
                        testID="login-input"
                        label="Login"
                        placeholder="E-mail ou CPF"
                        value={value}
                        onChangeText={(text) => onChange(parseCPFOrEmail(text))}
                        disabled={loading}
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
                        label="Senha"
                        secureTextEntry={!showPassword}
                        value={value}
                        onChangeText={onChange}
                        disabled={loading}
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
            </ScrollView>
          </Dialog.ScrollArea>
        </KeyboardAvoidingView>

        <Dialog.Actions>
          <Button disabled={loading} onPress={handleClose}>
            Cancelar
          </Button>

          <Button
            mode="contained"
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(handleFormSubmit)}
          >
            Salvar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
