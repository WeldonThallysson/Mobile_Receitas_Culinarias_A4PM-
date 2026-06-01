import { useEffect, useState } from 'react';
import { View } from 'react-native';

import {
  Avatar,
  Button,
  Text,
} from 'react-native-paper';

import { useAuth } from '../../hooks/useAuth';
import { useUsers } from '../../hooks/useUsers';

import { ProfileForm } from '../../components/profile-form/profile.form';

import { styles } from './profiles.screen.styles';

import { IUpdateUserRequest } from '../../interfaces/api/users.interface';

const ProfileScreen = () => {
  const { userId } = useAuth();

  const {
    selectedUser,
    loadUser,
    handleUpdateUser,
    loading,
  } = useUsers();

  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    if (userId) {
      loadUser(userId);
    }
  }, [userId]);

  const onSubmit = async (
    data: IUpdateUserRequest,
  ) => {
    if (!userId) {
      return;
    }

    await handleUpdateUser(
      userId,
      data,
    );

    await loadUser(userId);
  };

  return (
    <View style={styles.container}>
      <Avatar.Icon
        size={100}
        icon="account"
        style={styles.avatar}
      />

      <Text
        variant="headlineSmall"
        style={styles.name}
      >
        {selectedUser?.name}
      </Text>

      <Text
        variant="bodyLarge"
        style={styles.login}
      >
        {selectedUser?.login}
      </Text>

 

      <Button
        testID="update-profile-button"
        mode="contained"
        icon="account-edit"
        style={styles.button}
        onPress={() =>
          setVisible(true)
        }
      >
        Atualizar Perfil
      </Button>

      <ProfileForm
        visible={visible}
        loading={loading}
        initialData={selectedUser}
        onClose={() =>
          setVisible(false)
        }
        onSubmit={onSubmit}
      />
    </View>
  );
};

export default ProfileScreen;