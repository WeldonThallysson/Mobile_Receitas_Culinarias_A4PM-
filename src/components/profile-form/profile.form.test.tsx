
import React from 'react';

import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import {
  ProfileForm,
} from './profile.form';

jest.mock(
  'react-native-paper',
  () => {
    const React = require('react');

    const {
      Text,
      TextInput,
      TouchableOpacity,
      View,
    } = require('react-native');

    const Button = ({
      children,
      onPress,
      disabled,
      testID,
    }: any) => (
      <TouchableOpacity
        testID={testID}
        onPress={onPress}
        disabled={disabled}
      >
        <Text>{children}</Text>
      </TouchableOpacity>
    );

    const Dialog = ({
      children,
      visible,
    }: any) =>
      visible ? (
        <View>{children}</View>
      ) : null;

    Dialog.Title = ({
      children,
    }: any) => (
      <Text>{children}</Text>
    );

    Dialog.ScrollArea = ({
      children,
    }: any) => (
      <View>{children}</View>
    );

    Dialog.Actions = ({
      children,
    }: any) => (
      <View>{children}</View>
    );

    return {
      Portal: ({
        children,
      }: any) => <>{children}</>,

      Dialog,

      Button,

      TextInput,

      HelperText: ({
        children,
      }: any) => (
        <Text>{children}</Text>
      ),
    };
  },
);

describe(
  'ProfileForm',
  () => {
    const mockOnClose =
      jest.fn();

    const mockOnSubmit =
      jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it(
      'should render form when visible',
      () => {
        const {
          getByText,
        } = render(
          <ProfileForm
            visible
            onClose={mockOnClose}
            onSubmit={mockOnSubmit}
          />,
        );

        expect(
          getByText(
            'Atualizar perfil',
          ),
        ).toBeTruthy();

        expect(
          getByText('Cancelar'),
        ).toBeTruthy();

        expect(
          getByText('Salvar'),
        ).toBeTruthy();
      },
    );

    it(
      'should not render when invisible',
      () => {
        const {
          queryByText,
        } = render(
          <ProfileForm
            visible={false}
            onClose={mockOnClose}
            onSubmit={mockOnSubmit}
          />,
        );

        expect(
          queryByText(
            'Atualizar perfil',
          ),
        ).toBeNull();
      },
    );

    it(
      'should populate initial data',
      async () => {
        const {
          getByTestId,
        } = render(
          <ProfileForm
            visible
            initialData={{
              name: 'Weldon',
              login: 'weldon',
            }}
            onClose={mockOnClose}
            onSubmit={mockOnSubmit}
          />,
        );

        await waitFor(() => {
          expect(
            getByTestId(
              'name-input',
            ).props.value,
          ).toBe('Weldon');

          expect(
            getByTestId(
              'login-input',
            ).props.value,
          ).toBe('weldon');
        });
      },
    );

    it(
      'should call onClose when cancel button is pressed',
      () => {
        const {
          getByText,
        } = render(
          <ProfileForm
            visible
            onClose={mockOnClose}
            onSubmit={mockOnSubmit}
          />,
        );

        fireEvent.press(
          getByText('Cancelar'),
        );

        expect(
          mockOnClose,
        ).toHaveBeenCalledTimes(
          1,
        );
      },
    );

    it(
      'should submit form successfully',
      async () => {
        mockOnSubmit.mockResolvedValue(
          undefined,
        );

        const {
          getByTestId,
          getByText,
        } = render(
          <ProfileForm
            visible
            onClose={mockOnClose}
            onSubmit={mockOnSubmit}
          />,
        );

        fireEvent.changeText(
          getByTestId(
            'name-input',
          ),
          'Novo Nome',
        );

        fireEvent.changeText(
          getByTestId(
            'login-input',
          ),
          'novo.login',
        );

        fireEvent.changeText(
          getByTestId(
            'password-input',
          ),
          '123456',
        );

        fireEvent.press(
          getByText('Salvar'),
        );

        await waitFor(() => {
          expect(
            mockOnSubmit,
          ).toHaveBeenCalledWith({
            name: 'Novo Nome',
            login: 'novo.login',
            password: '123456',
          });
        });

        expect(
          mockOnClose,
        ).toHaveBeenCalled();
      },
    );

    it(
      'should submit form with initial data edited',
      async () => {
        mockOnSubmit.mockResolvedValue(
          undefined,
        );

        const {
          getByTestId,
          getByText,
        } = render(
          <ProfileForm
            visible
            initialData={{
              name: 'João',
              login: 'joao',
            }}
            onClose={mockOnClose}
            onSubmit={mockOnSubmit}
          />,
        );

        fireEvent.changeText(
          getByTestId(
            'name-input',
          ),
          'João Silva',
        );

        fireEvent.changeText(
          getByTestId(
            'login-input',
          ),
          'joao.silva',
        );

        fireEvent.changeText(
          getByTestId(
            'password-input',
          ),
          'novaSenha',
        );

        fireEvent.press(
          getByText('Salvar'),
        );

        await waitFor(() => {
          expect(
            mockOnSubmit,
          ).toHaveBeenCalledWith({
            name: 'João Silva',
            login: 'joao.silva',
            password: 'novaSenha',
          });
        });
      },
    );

    it(
      'should render loading state',
      () => {
        const {
          getByText,
        } = render(
          <ProfileForm
            visible
            loading
            onClose={mockOnClose}
            onSubmit={mockOnSubmit}
          />,
        );

        expect(
          getByText('Salvar'),
        ).toBeTruthy();

        expect(
          getByText('Cancelar'),
        ).toBeTruthy();
      },
    );

    it(
      'should clear password when initialData changes',
      async () => {
        const {
          getByTestId,
          rerender,
        } = render(
          <ProfileForm
            visible
            initialData={{
              name: 'User 1',
              login: 'user1',
            }}
            onClose={mockOnClose}
            onSubmit={mockOnSubmit}
          />,
        );

        fireEvent.changeText(
          getByTestId(
            'password-input',
          ),
          '123456',
        );

        rerender(
          <ProfileForm
            visible
            initialData={{
              name: 'User 2',
              login: 'user2',
            }}
            onClose={mockOnClose}
            onSubmit={mockOnSubmit}
          />,
        );

        await waitFor(() => {
          expect(
            getByTestId(
              'password-input',
            ).props.value,
          ).toBe('');
        });
      },
    );
  },
);