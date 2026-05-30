import React from 'react';

import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import ProfileScreen from './profiles.screen';

import { useAuth } from '../../hooks/useAuth';
import { useUsers } from '../../hooks/useUsers';

jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock(
  'react-native-vector-icons/MaterialIcons',
  () => 'Icon',
);

jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn(),
}));

jest.mock(
  '../../components/profile-form/profile.form',
  () => {
    const React = require('react');

    const {
      View,
      Text,
      TouchableOpacity,
    } = require('react-native');

    return {
      ProfileForm: ({
        visible,
        onClose,
        onSubmit,
      }: any) => {
        if (!visible) {
          return null;
        }

        return (
          <View testID="profile-form">
            <Text>Profile Form</Text>

            <TouchableOpacity
              testID="submit-profile-form"
              onPress={() =>
                onSubmit({
                  name: 'Novo Nome',
                  login: 'novo.login',
                  password: '123456',
                })
              }
            >
              <Text>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              testID="close-profile-form"
              onPress={onClose}
            >
              <Text>Fechar</Text>
            </TouchableOpacity>
          </View>
        );
      },
    };
  },
);

jest.mock(
  'react-native-paper',
  () => {
    const React = require('react');

    const {
      View,
      Text,
      TouchableOpacity,
    } = require('react-native');

    return {
      Text,

      Avatar: {
        Icon: () => (
          <View testID="avatar" />
        ),
      },

      Button: ({
        children,
        onPress,
      }: any) => (
        <TouchableOpacity
          onPress={onPress}
        >
          <Text>{children}</Text>
        </TouchableOpacity>
      ),
    };
  },
);

const mockedUseAuth =
  useAuth as jest.Mock;

const mockedUseUsers =
  useUsers as jest.Mock;

const mockLoadUser = jest
  .fn()
  .mockResolvedValue(undefined);

const mockHandleUpdateUser = jest
  .fn()
  .mockResolvedValue(undefined);

describe('ProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseAuth.mockReturnValue({
      userId: 1,
    });

    mockedUseUsers.mockReturnValue({
      selectedUser: {
        id: 1,
        name: 'Weldon',
        login: 'weldon',
      },
      loadUser: mockLoadUser,
      handleUpdateUser:
        mockHandleUpdateUser,
      loading: false,
    });
  });

  it('should render screen correctly', () => {
    const {
      getByText,
      getByTestId,
    } = render(
      <ProfileScreen />,
    );

    expect(
      getByTestId('avatar'),
    ).toBeTruthy();

    expect(
      getByText('Weldon'),
    ).toBeTruthy();

    expect(
      getByText('weldon'),
    ).toBeTruthy();

    expect(
      getByText(
        'Atualizar Perfil',
      ),
    ).toBeTruthy();
  });

  it('should load user on mount', () => {
    render(<ProfileScreen />);

    expect(
      mockLoadUser,
    ).toHaveBeenCalledWith(1);
  });

  it('should open profile modal', () => {
    const {
      getByText,
      getByTestId,
    } = render(
      <ProfileScreen />,
    );

    fireEvent.press(
      getByText(
        'Atualizar Perfil',
      ),
    );

    expect(
      getByTestId(
        'profile-form',
      ),
    ).toBeTruthy();
  });

  it('should close profile modal', () => {
    const {
      getByText,
      getByTestId,
      queryByTestId,
    } = render(
      <ProfileScreen />,
    );

    fireEvent.press(
      getByText(
        'Atualizar Perfil',
      ),
    );

    fireEvent.press(
      getByTestId(
        'close-profile-form',
      ),
    );

    expect(
      queryByTestId(
        'profile-form',
      ),
    ).toBeNull();
  });

  it('should update user successfully', async () => {
    const {
      getByText,
      getByTestId,
    } = render(
      <ProfileScreen />,
    );

    fireEvent.press(
      getByText(
        'Atualizar Perfil',
      ),
    );

    fireEvent.press(
      getByTestId(
        'submit-profile-form',
      ),
    );

    await waitFor(() => {
      expect(
        mockHandleUpdateUser,
      ).toHaveBeenCalledWith(
        1,
        {
          name: 'Novo Nome',
          login: 'novo.login',
          password: '123456',
        },
      );
    });

    expect(
      mockLoadUser,
    ).toHaveBeenCalledTimes(2);
  });

  it('should not update user when userId is undefined', async () => {
    mockedUseAuth.mockReturnValue({
      userId: undefined,
    });

    const {
      getByText,
      getByTestId,
    } = render(
      <ProfileScreen />,
    );

    fireEvent.press(
      getByText(
        'Atualizar Perfil',
      ),
    );

    fireEvent.press(
      getByTestId(
        'submit-profile-form',
      ),
    );

    await waitFor(() => {
      expect(
        mockHandleUpdateUser,
      ).not.toHaveBeenCalled();
    });
  });

  it('should render empty user data', () => {
    mockedUseUsers.mockReturnValue({
      selectedUser: undefined,
      loadUser: mockLoadUser,
      handleUpdateUser:
        mockHandleUpdateUser,
      loading: false,
    });

    const {
      getByText,
    } = render(
      <ProfileScreen />,
    );

    expect(
      getByText(
        'Atualizar Perfil',
      ),
    ).toBeTruthy();
  });
});