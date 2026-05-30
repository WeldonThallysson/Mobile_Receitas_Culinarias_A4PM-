import React from 'react';

import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import RecoverPassword from './recover-password.screen';

import { useAuth } from '../../../hooks/useAuth';

import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

const mockHandleRecoverPassword = jest.fn();

const mockNavigate = jest.fn();

describe('RecoverPassword Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      handleRecoverPassword:
        mockHandleRecoverPassword,
      loading: false,
    });

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  it('should render screen correctly', () => {
    const { getByText, getByTestId } = render(
      <RecoverPassword />,
    );

    expect(
      getByText('Recuperar senha'),
    ).toBeTruthy();

    expect(
      getByTestId('login-input'),
    ).toBeTruthy();

    expect(getByText('Recuperar')).toBeTruthy();

    expect(
      getByText(
        'Você possui uma conta? Realize o login',
      ),
    ).toBeTruthy();
  });

  it('should update login input value', () => {
    const { getByTestId } = render(
      <RecoverPassword />,
    );

    const input = getByTestId('login-input');

    fireEvent.changeText(input, 'user123');

    expect(input.props.value).toBe('user123');
  });

  it('should submit form successfully', async () => {
    const { getByTestId, getByText } = render(
      <RecoverPassword />,
    );

    fireEvent.changeText(
      getByTestId('login-input'),
      'user123',
    );

    fireEvent.press(getByText('Recuperar'));

    await waitFor(() => {
      expect(
        mockHandleRecoverPassword,
      ).toHaveBeenCalledWith({
        login: 'user123',
      });
    });

    expect(
      mockHandleRecoverPassword,
    ).toHaveBeenCalledTimes(1);
  });

  it('should display validation error when login is empty', async () => {
    const { getByText } = render(
      <RecoverPassword />,
    );

    fireEvent.press(getByText('Recuperar'));

    await waitFor(() => {
      expect(
        getByText('Informe o login'),
      ).toBeTruthy();
    });

    expect(
      mockHandleRecoverPassword,
    ).not.toHaveBeenCalled();
  });

  it('should navigate to login screen', () => {
    const { getByText } = render(
      <RecoverPassword />,
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
      handleRecoverPassword:
        mockHandleRecoverPassword,
      loading: true,
    });

    const { getByText } = render(
      <RecoverPassword />,
    );

    expect(getByText('Recuperar')).toBeTruthy();
  });
});