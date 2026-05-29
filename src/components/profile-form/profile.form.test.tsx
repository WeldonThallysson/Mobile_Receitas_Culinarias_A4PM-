import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { ProfileForm } from './profile.form';

const mockOnClose = jest.fn();
const mockOnSubmit = jest.fn();

describe('ProfileForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form when visible', () => {
    const { getByText } = render(
      <ProfileForm
        visible
        loading={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    expect(getByText('Atualizar perfil')).toBeTruthy();
  });

  it('should update form fields', () => {
    const { getByTestId } = render(
      <ProfileForm
        visible
        loading={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    fireEvent.changeText(getByTestId('name-input'), 'novo nome');
    fireEvent.changeText(getByTestId('login-input'), 'novo login');
    fireEvent.changeText(getByTestId('password-input'), '123');

    expect(getByTestId('name-input').props.value).toBe('novo nome');
    expect(getByTestId('login-input').props.value).toBe('novo login');
    expect(getByTestId('password-input').props.value).toBe('123');
  });

  it('should submit form correctly', async () => {
    const { getByText, getByTestId } = render(
      <ProfileForm
        visible
        loading={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    fireEvent.changeText(getByTestId('name-input'), 'novo nome');
    fireEvent.changeText(getByTestId('login-input'), 'novo login');
    fireEvent.changeText(getByTestId('password-input'), '123456');

    fireEvent.press(getByText('Salvar'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'novo nome',
        login: 'novo login',
        password: '123456',
      });
    });
  });

  it('should call onClose when cancel is pressed', () => {
    const { getByText } = render(
      <ProfileForm
        visible
        loading={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    fireEvent.press(getByText('Cancelar'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not render when not visible', () => {
    const { queryByText } = render(
      <ProfileForm
        visible={false}
        loading={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    expect(queryByText('Atualizar perfil')).toBeNull();
  });
});