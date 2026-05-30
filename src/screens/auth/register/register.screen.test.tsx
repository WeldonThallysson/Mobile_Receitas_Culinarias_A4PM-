import React from 'react';

import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import RegisterScreen from './register.screen';

import { useAuth } from '../../../hooks/useAuth';

import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

const mockHandleRegister = jest.fn();

const mockNavigate = jest.fn();

describe('RegisterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      handleRegister: mockHandleRegister,
      loading: false,
    });

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  it('should render screen correctly', () => {
    const { getByText, getByTestId } = render(
      <RegisterScreen />,
    );

    expect(getByText('Cadastro')).toBeTruthy();

    expect(
      getByTestId('name-input'),
    ).toBeTruthy();

    expect(
      getByTestId('login-input'),
    ).toBeTruthy();

    expect(
      getByTestId('password-input'),
    ).toBeTruthy();

    expect(
      getByText('Cadastrar'),
    ).toBeTruthy();
  });

  it('should update form fields correctly', () => {
    const { getByTestId } = render(
      <RegisterScreen />,
    );

    const nameInput =
      getByTestId('name-input');

    const loginInput =
      getByTestId('login-input');

    const passwordInput =
      getByTestId('password-input');

    fireEvent.changeText(
      nameInput,
      'Weldon',
    );

    fireEvent.changeText(
      loginInput,
      'admin',
    );

    fireEvent.changeText(
      passwordInput,
      '123456',
    );

    expect(nameInput.props.value).toBe(
      'Weldon',
    );

    expect(loginInput.props.value).toBe(
      'admin',
    );

    expect(passwordInput.props.value).toBe(
      '123456',
    );
  });

  it('should submit form successfully', async () => {
    const { getByTestId, getByText } = render(
      <RegisterScreen />,
    );

    fireEvent.changeText(
      getByTestId('name-input'),
      'Weldon',
    );

    fireEvent.changeText(
      getByTestId('login-input'),
      'admin',
    );

    fireEvent.changeText(
      getByTestId('password-input'),
      '123456',
    );

    fireEvent.press(
      getByText('Cadastrar'),
    );

    await waitFor(() => {
      expect(
        mockHandleRegister,
      ).toHaveBeenCalledWith({
        name: 'Weldon',
        login: 'admin',
        password: '123456',
      });
    });

    expect(
      mockHandleRegister,
    ).toHaveBeenCalledTimes(1);
  });

  it('should navigate to login screen', () => {
    const { getByText } = render(
      <RegisterScreen />,
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
      handleRegister: mockHandleRegister,
      loading: true,
    });

    const { getByText } = render(
      <RegisterScreen />,
    );

    expect(
      getByText('Cadastrar'),
    ).toBeTruthy();
  });

  it('should submit empty fields because no validation exists', async () => {
    const { getByText } = render(
      <RegisterScreen />,
    );

    fireEvent.press(
      getByText('Cadastrar'),
    );

    await waitFor(() => {
      expect(
        mockHandleRegister,
      ).toHaveBeenCalledWith({
        name: '',
        login: '',
        password: '',
      });
    });
  });
});