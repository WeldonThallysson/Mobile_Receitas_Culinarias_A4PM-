import React from 'react';

import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import ResetPassword from './reset-password.screen';

import { useAuth } from '../../../hooks/useAuth';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('../../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock(
  'react-native-vector-icons/MaterialIcons',
  () => 'Icon',
);

const mockHandleResetPassword = jest.fn();

const mockNavigate = jest.fn();

describe('ResetPassword Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      handleResetPassword:
        mockHandleResetPassword,
      loading: false,
    });

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });

    (useRoute as jest.Mock).mockReturnValue({
      params: {
        token: 'token-123',
      },
    });
  });

  it('should render screen correctly', () => {
    const { getByText, getByTestId } = render(
      <ResetPassword />,
    );

    expect(
      getByText('Redefinir senha'),
    ).toBeTruthy();

    expect(
      getByTestId('old-password-input'),
    ).toBeTruthy();

    expect(
      getByTestId('new-password-input'),
    ).toBeTruthy();

    expect(
      getByText('Redefinir'),
    ).toBeTruthy();
  });

  it('should update form fields correctly', () => {
    const { getByTestId } = render(
      <ResetPassword />,
    );

    const oldPasswordInput =
      getByTestId('old-password-input');

    const newPasswordInput =
      getByTestId('new-password-input');

    fireEvent.changeText(
      oldPasswordInput,
      '123456',
    );

    fireEvent.changeText(
      newPasswordInput,
      '654321',
    );

    expect(
      oldPasswordInput.props.value,
    ).toBe('123456');

    expect(
      newPasswordInput.props.value,
    ).toBe('654321');
  });

  it('should submit form successfully', async () => {
    const { getByTestId, getByText } = render(
      <ResetPassword />,
    );

    fireEvent.changeText(
      getByTestId('old-password-input'),
      '123456',
    );

    fireEvent.changeText(
      getByTestId('new-password-input'),
      '654321',
    );

    fireEvent.press(
      getByText('Redefinir'),
    );

    await waitFor(() => {
      expect(
        mockHandleResetPassword,
      ).toHaveBeenCalledWith({
        token: 'token-123',
        oldPassword: '123456',
        newPassword: '654321',
      });
    });

    expect(
      mockHandleResetPassword,
    ).toHaveBeenCalledTimes(1);

  });

  it('should navigate to login screen when pressing button', () => {
    const { getByText } = render(
      <ResetPassword />,
    );

    fireEvent.press(
      getByText(
        'Você possui uma conta? Realize o login',
      ),
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      'Login',
    );
  });

  it('should render loading state', () => {
    (useAuth as jest.Mock).mockReturnValue({
      handleResetPassword:
        mockHandleResetPassword,
      loading: true,
    });

    const { getByText } = render(
      <ResetPassword />,
    );

    expect(
      getByText('Redefinir'),
    ).toBeTruthy();
  });

  it('should submit empty fields because no validation exists', async () => {
    const { getByText } = render(
      <ResetPassword />,
    );

    fireEvent.press(
      getByText('Redefinir'),
    );

    await waitFor(() => {
      expect(
        mockHandleResetPassword,
      ).toHaveBeenCalledWith({
        token: 'token-123',
        oldPassword: '',
        newPassword: '',
      });
    });
  });
});