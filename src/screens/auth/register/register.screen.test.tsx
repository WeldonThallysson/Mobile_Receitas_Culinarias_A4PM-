import { fireEvent, render, waitFor } from '@testing-library/react-native';

import RegisterScreen from './register.screen';

const mockNavigate = jest.fn();
const mockHandleRegister = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    loading: false,
    handleRegister: mockHandleRegister,
  }),
}));

describe('RegisterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render register screen', () => {
    const { getByText } = render(<RegisterScreen />);

    expect(getByText('Cadastro')).toBeTruthy();
    expect(getByText('Cadastrar')).toBeTruthy();
  });

  it('should update form fields', () => {
    const { getByTestId } = render(<RegisterScreen />);

    fireEvent.changeText(getByTestId('name-input'), 'John Doe');
    fireEvent.changeText(getByTestId('login-input'), 'john');
    fireEvent.changeText(getByTestId('password-input'), '123456');

    expect(getByTestId('name-input').props.value).toBe('John Doe');
    expect(getByTestId('login-input').props.value).toBe('john');
    expect(getByTestId('password-input').props.value).toBe('123456');
  });

  it('should submit register form successfully', async () => {
    const { getByTestId, getByText } = render(<RegisterScreen />);

    fireEvent.changeText(getByTestId('name-input'), 'John Doe');
    fireEvent.changeText(getByTestId('login-input'), 'john');
    fireEvent.changeText(getByTestId('password-input'), '123456');

    fireEvent.press(getByText('Cadastrar'));

    await waitFor(() => {
      expect(mockHandleRegister).toHaveBeenCalledWith({
        name: 'John Doe',
        login: 'john',
        password: '123456',
      });
    });
  });

  it('should navigate to login screen', () => {
    const { getByText } = render(<RegisterScreen />);

    fireEvent.press(
      getByText('Você possui uma conta? Realize o login'),
    );

    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});