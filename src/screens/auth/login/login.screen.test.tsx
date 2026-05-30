import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import LoginScreen from './login.screen';

const mockNavigate = jest.fn();
const mockHandleLogin = jest.fn();

jest.mock(
  'react-native-vector-icons/MaterialIcons',
  () => 'Icon',
);
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    loading: false,
    handleLogin: mockHandleLogin,
  }),
}));

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login screen correctly', () => {
    const { getByText, getByTestId } = render(
      <LoginScreen />,
    );

    expect(
      getByText('Receitas Culinárias'),
    ).toBeTruthy();

    expect(
      getByTestId('login-input'),
    ).toBeTruthy();

    expect(
      getByTestId('password-input'),
    ).toBeTruthy();

    expect(getByText('Entrar')).toBeTruthy();
  });

  it('should display validation errors', async () => {
    const { getByText } = render(<LoginScreen />);

    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(
        getByText('Informe o login'),
      ).toBeTruthy();

      expect(
        getByText('Informe a senha'),
      ).toBeTruthy();
    });

    expect(mockHandleLogin).not.toHaveBeenCalled();
  });

  it('should submit login form successfully', async () => {
    const { getByTestId, getByText } = render(
      <LoginScreen />,
    );

    fireEvent.changeText(
      getByTestId('login-input'),
      'admin',
    );

    fireEvent.changeText(
      getByTestId('password-input'),
      '123456',
    );

    fireEvent.press(getByText('Entrar'));

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalledWith({
        login: 'admin',
        password: '123456',
      });
    });

    expect(mockHandleLogin).toHaveBeenCalledTimes(1);
  });

  it('should navigate to register screen', () => {
    const { getByText } = render(<LoginScreen />);

    fireEvent.press(
      getByText(
        'Ainda não possui uma conta? crie agora!',
      ),
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      'Register',
    );
  });

  it('should navigate to recover password screen', () => {
    const { getByText } = render(<LoginScreen />);

    fireEvent.press(
      getByText('Recuperar senha'),
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      'RecoverPassword',
    );
  });

  it('should show loading state', () => {
    jest.doMock('../../../hooks/useAuth', () => ({
      useAuth: () => ({
        loading: true,
        handleLogin: mockHandleLogin,
      }),
    }));

    const { getByText } = render(
      <LoginScreen />,
    );

    expect(getByText('Entrar')).toBeTruthy();
  });
});