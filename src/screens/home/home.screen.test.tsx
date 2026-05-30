import React from 'react';

import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import HomeScreen from './home.screen';

import { useAuth } from '../../hooks/useAuth';
import { useRecipes } from '../../hooks/useRecipes';

jest.mock(
  'react-native-vector-icons/MaterialIcons',
  () => 'MaterialIcons',
);

jest.mock('react-native-paper', () => {
  const React = require('react');

  const {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
  } = require('react-native');

  const Card = ({ children }: any) => (
    <View>{children}</View>
  );

  Card.Content = ({ children }: any) => (
    <View>{children}</View>
  );

  Card.Actions = ({ children }: any) => (
    <View>{children}</View>
  );

  Card.Title = ({ title }: any) => (
    <Text>{title}</Text>
  );

  const Dialog = ({
    children,
    visible,
  }: any) =>
    visible ? (
      <View>{children}</View>
    ) : null;

  Dialog.Title = ({ children }: any) => (
    <Text>{children}</Text>
  );

  Dialog.Content = ({ children }: any) => (
    <View>{children}</View>
  );

  Dialog.Actions = ({ children }: any) => (
    <View>{children}</View>
  );

  return {
       MD3LightTheme: {
      colors: {},
    },
    Text,

    ActivityIndicator,

    Divider: () => <View />,

    Portal: ({ children }: any) => children,

    Dialog,

    Searchbar: ({
      value,
      onChangeText,
      placeholder,
    }: any) => (
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    ),

    Card,

    Button: ({
      children,
      onPress,
    }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    ),

    IconButton: ({
      onPress,
      icon,
    }: any) => (
      <TouchableOpacity
        testID={`icon-button-${icon}`}
        onPress={onPress}
      >
        <Text>{icon}</Text>
      </TouchableOpacity>
    ),
  };
});

jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../hooks/useRecipes', () => ({
  useRecipes: jest.fn(),
}));

jest.mock(
  '../../components/recipes-form/recipes.form',
  () => {
    const React = require('react');

    const {
      View,
      Text,
      TouchableOpacity,
    } = require('react-native');

    return {
      RecipesForm: ({
        visible,
        onClose,
        onSubmit,
      }: any) => {
        if (!visible) {
          return null;
        }

        return (
          <View testID="recipes-form">
            <Text>Recipes Form</Text>

            <TouchableOpacity
              testID="submit-form"
              onPress={() =>
                onSubmit({
                  name: 'Receita Teste',
                  ingredients:
                    'Ingredientes',
                  preparationMethod:
                    'Modo de preparo',
                  preparationTimeMinutes: 20,
                  servings: 2,
                  categoryId: 1,
                })
              }
            >
              <Text>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              testID="close-form"
              onPress={onClose}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        );
      },
    };
  },
);


 
const mockedUseAuth =
  useAuth as jest.Mock;

const mockedUseRecipes =
  useRecipes as jest.Mock;

const mockLoadRecipes = jest.fn();

const mockHandleCreateRecipe =
  jest.fn().mockResolvedValue(undefined);

const mockHandleUpdateRecipe =
  jest.fn().mockResolvedValue(undefined);

const mockHandleDeleteRecipe =
  jest.fn().mockResolvedValue(undefined);

const recipesMock = [
  {
    id: 1,
    name: 'Lasanha',
    ingredients: 'Queijo',
    preparationMethod: 'Assar',
    preparationTimeMinutes: 40,
    servings: 5,
    category: {
      name: 'Massas',
    },
  },
  {
    id: 2,
    name: 'Bolo',
    ingredients: 'Chocolate',
    preparationMethod: 'Misturar',
    preparationTimeMinutes: 60,
    servings: 8,
    category: {
      name: 'Sobremesa',
    },
  },
];

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseAuth.mockReturnValue({
      message: 'Olá usuário',
    });

    mockedUseRecipes.mockReturnValue({
      recipes: recipesMock,
      loading: false,
      loadRecipes: mockLoadRecipes,
      handleCreateRecipe:
        mockHandleCreateRecipe,
      handleUpdateRecipe:
        mockHandleUpdateRecipe,
      handleDeleteRecipe:
        mockHandleDeleteRecipe,
    });
  });

  it('should render screen correctly', () => {
    const { getByText } = render(
      <HomeScreen />,
    );

    expect(
      getByText('Olá usuário'),
    ).toBeTruthy();

    expect(
      getByText('Lasanha'),
    ).toBeTruthy();

    expect(
      getByText('Bolo'),
    ).toBeTruthy();
  });

  it('should call loadRecipes on mount', () => {
    render(<HomeScreen />);

    expect(
      mockLoadRecipes,
    ).toHaveBeenCalled();
  });

  it('should filter recipes correctly', async () => {
    const {
      getByPlaceholderText,
      queryByText,
    } = render(<HomeScreen />);

    fireEvent.changeText(
      getByPlaceholderText(
        'Buscar receitas...',
      ),
      'Lasanha',
    );

    await waitFor(() => {
      expect(
        queryByText('Lasanha'),
      ).toBeTruthy();

      expect(
        queryByText('Bolo'),
      ).toBeNull();
    });
  });

  it('should open create modal', () => {
    const {
      getByText,
      getByTestId,
    } = render(<HomeScreen />);

    fireEvent.press(
      getByText(
        'Cadastrar nova receita',
      ),
    );

    expect(
      getByTestId('recipes-form'),
    ).toBeTruthy();
  });

  it('should close create modal', () => {
    const {
      getByText,
      getByTestId,
      queryByTestId,
    } = render(<HomeScreen />);

    fireEvent.press(
      getByText(
        'Cadastrar nova receita',
      ),
    );

    fireEvent.press(
      getByTestId('close-form'),
    );

    expect(
      queryByTestId('recipes-form'),
    ).toBeNull();
  });

  it('should create recipe successfully', async () => {
    const {
      getByText,
      getByTestId,
    } = render(<HomeScreen />);

    fireEvent.press(
      getByText(
        'Cadastrar nova receita',
      ),
    );

    fireEvent.press(
      getByTestId('submit-form'),
    );

    await waitFor(() => {
      expect(
        mockHandleCreateRecipe,
      ).toHaveBeenCalled();
    });

    expect(
      mockHandleCreateRecipe,
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Receita Teste',
      }),
    );
  });

  it('should open edit modal', () => {
    const {
      getAllByText,
      getByTestId,
    } = render(<HomeScreen />);

    fireEvent.press(
      getAllByText('Editar')[0],
    );

    expect(
      getByTestId('recipes-form'),
    ).toBeTruthy();
  });

  it('should update recipe successfully', async () => {
    const {
      getAllByText,
      getByTestId,
    } = render(<HomeScreen />);

    fireEvent.press(
      getAllByText('Editar')[0],
    );

    fireEvent.press(
      getByTestId('submit-form'),
    );

    await waitFor(() => {
      expect(
        mockHandleUpdateRecipe,
      ).toHaveBeenCalled();
    });

    expect(
      mockHandleUpdateRecipe,
    ).toHaveBeenCalledWith(
      1,
      expect.objectContaining({
        name: 'Receita Teste',
      }),
    );
  });

  it('should open delete modal', () => {
  const {
    getAllByTestId,
    getByText,
  } = render(<HomeScreen />);

  fireEvent.press(
    getAllByTestId(
      'icon-button-delete',
    )[0],
  );

  expect(
    getByText(
      'Deseja realmente excluir essa receita?',
    ),
  ).toBeTruthy();
});

  it('should delete recipe successfully', async () => {
  const {
    getAllByTestId,
    getByText,
  } = render(<HomeScreen />);

  fireEvent.press(
    getAllByTestId(
      'icon-button-delete',
    )[0],
  );

  fireEvent.press(
    getByText('Excluir'),
  );

  await waitFor(() => {
    expect(
      mockHandleDeleteRecipe,
    ).toHaveBeenCalledWith(1);
  });
});

  it('should render empty state', () => {
    mockedUseRecipes.mockReturnValue({
      recipes: [],
      loading: false,
      loadRecipes: mockLoadRecipes,
      handleCreateRecipe:
        mockHandleCreateRecipe,
      handleUpdateRecipe:
        mockHandleUpdateRecipe,
      handleDeleteRecipe:
        mockHandleDeleteRecipe,
    });

    const { getByText } = render(
      <HomeScreen />,
    );

    expect(
      getByText(
        'Nenhuma receita encontrada',
      ),
    ).toBeTruthy();
  });

  it('should render search empty state', async () => {
    const {
      getByPlaceholderText,
      getByText,
    } = render(<HomeScreen />);

    fireEvent.changeText(
      getByPlaceholderText(
        'Buscar receitas...',
      ),
      'Pizza',
    );

    await waitFor(() => {
      expect(
        getByText(
          'Você ainda não cadastrou essa receita - Pizza',
        ),
      ).toBeTruthy();
    });
  });
});