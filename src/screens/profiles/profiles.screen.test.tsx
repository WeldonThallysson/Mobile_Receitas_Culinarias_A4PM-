import React from 'react';

import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import {
  Pressable,
  Text,
  View,
} from 'react-native';

import ProfileScreen from './profiles.screen';

const mockLoadUser = jest.fn();

const mockHandleUpdateUser =
  jest.fn();

const mockUserId = 1;

jest.mock(
  '../../hooks/useAuth',
  () => ({
    useAuth: () => ({
      userId: mockUserId,
    }),
  }),
);

jest.mock(
  '../../hooks/useUsers',
  () => ({
    useUsers: () => ({
      selectedUser: {
        id: 1,
        name: 'teste',
        login: '09381036012',
        createdAt:
          '2026-05-28T03:06:55.000Z',
        updatedAt:
          '2026-05-29T14:02:21.000Z',
      },

      loadUser: mockLoadUser,

      handleUpdateUser:
        mockHandleUpdateUser,

      loading: false,
    }),
  }),
);

jest.mock('../../components/profile-form/profile.form', () => {
  const React = require('react');
  const { View, Pressable, Text } = require('react-native');

  const ProfileForm = ({ visible, onClose, onSubmit }: any) =>
    visible
      ? React.createElement(
          View,
          { testID: 'profile-form' },
          React.createElement(
            Pressable,
            {
              testID: 'submit-form',
              onPress: () =>
                onSubmit({
                  name: 'novo nome',
                  login: 'novo login',
                  password: '123456',
                }),
            },
            React.createElement(Text, null, 'Submit'),
          ),
          React.createElement(
            Pressable,
            { testID: 'close-form', onPress: onClose },
            React.createElement(Text, null, 'Close'),
          ),
        )
      : null;

  return {
    __esModule: true,
    ProfileForm,
  };
});

describe('ProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(
    'should render profile data',
    () => {
      const { getByText } =
        render(<ProfileScreen />);

      expect(
        getByText('Perfil'),
      ).toBeTruthy();

      expect(
        getByText(
          'Nome: teste',
        ),
      ).toBeTruthy();

      expect(
        getByText(
          'Login: 09381036012',
        ),
      ).toBeTruthy();
    },
  );

  it(
    'should call loadUser on mount',
    () => {
      render(<ProfileScreen />);

      expect(
        mockLoadUser,
      ).toHaveBeenCalledWith(1);
    },
  );

  it(
    'should open profile form',
    () => {
      const { getByTestId } =
        render(<ProfileScreen />);

      fireEvent.press(
        getByTestId(
          'open-profile-form',
        ),
      );

      expect(
        getByTestId(
          'profile-form',
        ),
      ).toBeTruthy();
    },
  );

  it(
    'should submit update user',
    async () => {
      const { getByTestId } =
        render(<ProfileScreen />);

      fireEvent.press(
        getByTestId(
          'open-profile-form',
        ),
      );

      fireEvent.press(
        getByTestId(
          'submit-form',
        ),
      );

      await waitFor(() => {
        expect(
          mockHandleUpdateUser,
        ).toHaveBeenCalledWith(
          1,
          {
            name: 'novo nome',
            login: 'novo login',
            password: '123456',
          },
        );
      });
    },
  );
});