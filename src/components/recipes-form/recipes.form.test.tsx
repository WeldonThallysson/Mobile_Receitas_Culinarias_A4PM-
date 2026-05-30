import React from 'react';

import {
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

import RecipesForm from './recipes.form';

const mockLoadCategories = jest.fn();

jest.mock('../../hooks/useCategories', () => ({
  useCategories: () => ({
    categories: [
      {
        id: 1,
        name: 'Massas',
      },
      {
        id: 2,
        name: 'Carnes',
      },
    ],
    loadCategories: mockLoadCategories,
  }),
}));

jest.mock('react-native-paper', () => {
  const React = require('react');

  const {
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } = require('react-native');

  const DialogComponent = ({
    children,
  }: any) => <View>{children}</View>;

  DialogComponent.Title = ({
    children,
  }: any) => <Text>{children}</Text>;

  DialogComponent.ScrollArea = ({
    children,
  }: any) => <View>{children}</View>;

  DialogComponent.Actions = ({
    children,
  }: any) => <View>{children}</View>;

  return {
    Portal: ({ children }: any) => children,

    Dialog: DialogComponent,

    HelperText: ({
      children,
    }: any) => <Text>{children}</Text>,

    TextInput: ({
      label,
      value,
      onChangeText,
    }: any) => (
      <TextInput
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
      />
    ),

    Button: ({
      children,
      onPress,
      disabled,
    }: any) => (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
      >
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
  };
});

jest.mock(
  'react-native-paper-dropdown',
  () => {
    const React = require('react');

    const {
      TextInput,
    } = require('react-native');

    return {
      Dropdown: ({
        label,
        value,
        onSelect,
      }: any) => (
        <TextInput
          placeholder={label}
          value={value}
          onChangeText={onSelect}
        />
      ),
    };
  },
);

describe('RecipesForm', () => {
  const mockOnClose = jest.fn();

  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(
    'should render create mode',
    () => {
      const {
        getByText,
      } = render(
        <RecipesForm
          visible
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      expect(
        getByText('Nova receita'),
      ).toBeTruthy();

      expect(
        getByText('Cadastrar'),
      ).toBeTruthy();
    },
  );

  it(
    'should load categories on mount',
    () => {
      render(
        <RecipesForm
          visible
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      expect(
        mockLoadCategories,
      ).toHaveBeenCalledTimes(1);
    },
  );

  it(
    'should render edit mode',
    () => {
      const {
        getByText,
      } = render(
        <RecipesForm
          visible
          recipe={{
            category_id: 1,

            name: 'Lasanha',

            preparationTimeMinutes: 60,

            servings: 8,

            ingredients:
              'Queijo e molho',

            preparationMethod:
              'Assar',
          }}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      expect(
        getByText('Editar receita'),
      ).toBeTruthy();

      expect(
        getByText('Salvar'),
      ).toBeTruthy();
    },
  );

  it(
    'should populate fields when editing',
    () => {
      const {
        getByDisplayValue,
      } = render(
        <RecipesForm
          visible
          recipe={{
            category_id: 1,

            name: 'Lasanha',

            preparationTimeMinutes: 60,

            servings: 8,

            ingredients:
              'Queijo e molho',

            preparationMethod:
              'Assar',
          }}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      expect(
        getByDisplayValue(
          'Lasanha',
        ),
      ).toBeTruthy();

      expect(
        getByDisplayValue(
          '60',
        ),
      ).toBeTruthy();

      expect(
        getByDisplayValue(
          '8',
        ),
      ).toBeTruthy();
    },
  );

  it(
    'should call onClose when cancel button is pressed',
    () => {
      const {
        getByText,
      } = render(
        <RecipesForm
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
    'should render loading state',
    () => {
      const {
        getByText,
      } = render(
        <RecipesForm
          visible
          loading
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      expect(
        getByText('Cadastrar'),
      ).toBeTruthy();
    },
  );

  it(
    'should submit form successfully',
    async () => {
      const {
        getByPlaceholderText,
        getByText,
      } = render(
        <RecipesForm
          visible
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />,
      );

      fireEvent.changeText(
        getByPlaceholderText(
          'Categoria',
        ),
        '1',
      );

      fireEvent.changeText(
        getByPlaceholderText(
          'Nome da receita',
        ),
        'Lasanha',
      );

      fireEvent.changeText(
        getByPlaceholderText(
          'Tempo (min)',
        ),
        '60',
      );

      fireEvent.changeText(
        getByPlaceholderText(
          'Porções',
        ),
        '8',
      );

      fireEvent.changeText(
        getByPlaceholderText(
          'Ingredientes',
        ),
        'Queijo',
      );

      fireEvent.changeText(
        getByPlaceholderText(
          'Modo de preparo',
        ),
        'Assar',
      );

      fireEvent.press(
        getByText(
          'Cadastrar',
        ),
      );

      await waitFor(() => {
        expect(
          mockOnSubmit,
        ).toHaveBeenCalled();
      });
    },
  );
});