import { fireEvent, render, waitFor } from '@testing-library/react-native';

import ResetPassword from './reset-password.screen';

const mockNavigate = jest.fn();
const mockHandleResetPassword = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    loading: false,
    handleResetPassword: mockHandleResetPassword,
  }),
}));

describe('ResetPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render reset password screen', () => {
    const { getByText } = render(<ResetPassword />);

    expect(getByText('Redefinir senha')).toBeTruthy();
    expect(getByText('Redefinir')).toBeTruthy();
  });

  it('should update form fields', () => {
    const { getByTestId } = render(<ResetPassword />);

    fireEvent.changeText(getByTestId('old-password-input'), 'old123');
    fireEvent.changeText(getByTestId('new-password-input'), 'new123');

    expect(getByTestId('old-password-input').props.value).toBe('old123');
    expect(getByTestId('new-password-input').props.value).toBe('new123');
  });

  it('should submit reset password successfully', async () => {
    const { getByTestId, getByText } = render(<ResetPassword />);

    fireEvent.changeText(getByTestId('old-password-input'), 'old123');
    fireEvent.changeText(getByTestId('new-password-input'), 'new123');

    fireEvent.press(getByText('Redefinir'));

    await waitFor(() => {
      expect(mockHandleResetPassword).toHaveBeenCalledWith({
        token: '',
        oldPassword: 'old123',
        newPassword: 'new123',
      });
    });
  });

  it('should navigate to login screen', () => {
    const { getByText } = render(<ResetPassword />);

    fireEvent.press(
      getByText('Você possui uma conta? Realize o login'),
    );

    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});