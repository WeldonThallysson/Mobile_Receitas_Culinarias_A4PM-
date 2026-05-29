import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import HomeScreen from './home.screen';

const mockLogout = jest.fn();

const mockLoadRecipes =
  jest.fn();

const mockHandleCreateRecipe =
  jest.fn();

const mockHandleUpdateRecipe =
  jest.fn();

const mockHandleDeleteRecipe =
  jest.fn();

jest.mock(
  '../../hooks/useAuth',
  () => ({
    useAuth: () => ({
      message:
        'Bem-vindo ao sistema',

      logout: mockLogout,
    }),
  }),
);

jest.mock(
  '../../hooks/useRecipes',
  () => ({
    useRecipes: () => ({
      recipes: [
        {
          id: 1,

          name:
            'Macarrão com Queijo',

          ingredients:
            'Macarrão, queijo e leite',

          preparation_method:
            'Misture tudo',

          preparation_time_minutes: 10,

          servings: 2,

          category: {
            id: 1,
            name: 'Massas',
          },
        },
      ],

      loading: false,

      loadRecipes:
        mockLoadRecipes,

      handleCreateRecipe:
        mockHandleCreateRecipe,

      handleUpdateRecipe:
        mockHandleUpdateRecipe,

      handleDeleteRecipe:
        mockHandleDeleteRecipe,
    }),
  }),
);

jest.mock(
  '../../components/recipes-form/recipes.form',
  () => {
    const React = require('react');

    const {
      View,
      Pressable,
      Text,
    } = require('react-native');

    return {
      RecipesForm: ({
        visible,
        onSubmit,
      }: any) =>
        visible ? (
          <View testID="recipes-form">
            <Pressable
              testID="submit-form"
              onPress={() =>
                onSubmit({
                  category_id: 1,

                  name:
                    'Nova Receita',

                  preparation_time_minutes: 10,

                  servings: 2,

                  ingredients:
                    'Ingredientes',

                  preparation_method:
                    'Modo de preparo',
                })
              }
            >
              <Text>
                Submit
              </Text>
            </Pressable>
          </View>
        ) : null,
    };
  },
);

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(
    'should render home screen',
    () => {
      const { getByText } =
        render(<HomeScreen />);

      expect(
        getByText(
          'Receitas culinárias',
        ),
      ).toBeTruthy();

      expect(
        getByText(
          'Bem-vindo ao sistema',
        ),
      ).toBeTruthy();
    },
  );

  it(
    'should render recipe card',
    () => {
      const { getByText } =
        render(<HomeScreen />);

      expect(
        getByText(
          'Macarrão com Queijo',
        ),
      ).toBeTruthy();

      expect(
        getByText('Massas'),
      ).toBeTruthy();

      expect(
        getByText(
          'Ingredientes',
        ),
      ).toBeTruthy();

      expect(
        getByText(
          'Modo de preparo',
        ),
      ).toBeTruthy();
    },
  );

  it(
    'should call loadRecipes on mount',
    () => {
      render(<HomeScreen />);

      expect(
        mockLoadRecipes,
      ).toHaveBeenCalled();
    },
  );

  it(
    'should filter recipes by search',
    () => {
      const {
        getByPlaceholderText,
        queryByText,
      } = render(
        <HomeScreen />,
      );

      fireEvent.changeText(
        getByPlaceholderText(
          'Buscar receitas...',
        ),
        'Pizza',
      );

      expect(
        queryByText(
          'Macarrão com Queijo',
        ),
      ).toBeNull();
    },
  );

  it(
    'should open create recipe modal',
    () => {
      const {
        getByText,
        getByTestId,
      } = render(
        <HomeScreen />,
      );

      fireEvent.press(
        getByText(
          'Cadastrar nova receita',
        ),
      );

      expect(
        getByTestId(
          'recipes-form',
        ),
      ).toBeTruthy();
    },
  );

  it(
    'should create recipe successfully',
    async () => {
      const {
        getByText,
        getByTestId,
      } = render(
        <HomeScreen />,
      );

      fireEvent.press(
        getByText(
          'Cadastrar nova receita',
        ),
      );

      fireEvent.press(
        getByTestId(
          'submit-form',
        ),
      );

      await waitFor(() => {
        expect(
          mockHandleCreateRecipe,
        ).toHaveBeenCalledWith({
          category_id: 1,

          name:
            'Nova Receita',

          preparation_time_minutes: 10,

          servings: 2,

          ingredients:
            'Ingredientes',

          preparation_method:
            'Modo de preparo',
        });
      });
    },
  );

  it(
    'should open delete modal',
    () => {
      const {
        getByTestId,
        getByText,
      } = render(
        <HomeScreen />,
      );

      fireEvent.press(
        getByTestId(
          'delete-button-1',
        ),
      );

      expect(
        getByText(
          'Excluir receita',
        ),
      ).toBeTruthy();
    },
  );

  it(
    'should delete recipe successfully',
    async () => {
      const {
        getByTestId,
        getByText,
      } = render(
        <HomeScreen />,
      );

      fireEvent.press(
        getByTestId(
          'delete-button-1',
        ),
      );

      fireEvent.press(
        getByText('Excluir'),
      );

      await waitFor(() => {
        expect(
          mockHandleDeleteRecipe,
        ).toHaveBeenCalledWith(
          1,
        );
      });
    },
  );

  it(
    'should logout successfully',
    () => {
      const { getByTestId } =
        render(<HomeScreen />);

      fireEvent.press(
        getByTestId(
          'logout-button',
        ),
      );

      expect(
        mockLogout,
      ).toHaveBeenCalled();
    },
  );
});