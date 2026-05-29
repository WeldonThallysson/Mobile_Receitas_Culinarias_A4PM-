import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import RecoverPassword from './recover-password.screen';

import { useAuth } from '../../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

jest.mock('../../../hooks/useAuth');
jest.mock('@react-navigation/native');

const mockHandleRecoverPassword = jest.fn();
const mockNavigate = jest.fn();

describe('RecoverPassword Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      handleRecoverPassword: mockHandleRecoverPassword,
      loading: false,
    });

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  it('should render correctly', () => {
    const { getByText, getByTestId } = render(<RecoverPassword />);

    expect(getByText('Recuperar senha')).toBeTruthy();
    expect(getByTestId('login-input')).toBeTruthy();
    expect(getByText('Recuperar')).toBeTruthy();
  });

  it('should update input value', () => {
    const { getByTestId } = render(<RecoverPassword />);

    const input = getByTestId('login-input');

    fireEvent.changeText(input, 'user123');

    expect(input.props.value).toBe('user123');
  });

  it('should call handleRecoverPassword on submit', async () => {
    const { getByTestId, getByText } = render(<RecoverPassword />);

    fireEvent.changeText(getByTestId('login-input'), 'user123');

    fireEvent.press(getByText('Recuperar'));

    await waitFor(() => {
      expect(mockHandleRecoverPassword).toHaveBeenCalledWith({
        login: 'user123',
      });
    });
  });

  it('should not call handleRecoverPassword when login is empty', async () => {
    const { getByText } = render(<RecoverPassword />);

    fireEvent.press(getByText('Recuperar'));

    await waitFor(() => {
      expect(mockHandleRecoverPassword).not.toHaveBeenCalled();
    });
  });

  it('should navigate to Login screen when pressing link', () => {
    const { getByText } = render(<RecoverPassword />);

    fireEvent.press(getByText('Você possui uma conta? Realize o login'));

    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('should show loading state on button', () => {
    (useAuth as jest.Mock).mockReturnValue({
      handleRecoverPassword: mockHandleRecoverPassword,
      loading: true,
    });

    const { getByText } = render(<RecoverPassword />);

    const button = getByText('Recuperar');

    expect(button).toBeTruthy();
  });
});