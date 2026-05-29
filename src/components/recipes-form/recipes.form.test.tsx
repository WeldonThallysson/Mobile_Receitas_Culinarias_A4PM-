import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import { RecipesForm } from './recipes.form';

jest.mock(
  '../../hooks/useCategories',
  () => ({
    useCategories: () => ({
      categories: [
        {
          id: 1,
          name: 'Massas',
        },
        {
          id: 2,
          name: 'Doces',
        },
      ],

      loadCategories: jest.fn(),
    }),
  }),
);

jest.mock(
  'react-native-paper-dropdown',
  () => {
    const React = require('react');

    const {
      TouchableOpacity,
      Text,
    } = require('react-native');

    return {
      Dropdown: ({
        onSelect,
        label,
      }: any) => (
        <TouchableOpacity
          testID="dropdown"
          onPress={() => onSelect('1')}
        >
          <Text>{label}</Text>
        </TouchableOpacity>
      ),
    };
  },
);

describe('RecipesForm', () => {
  const onClose = jest.fn();

  const onSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(
    'should render create recipe modal',
    () => {
      const { getByText } = render(
        <RecipesForm
          visible
          onClose={onClose}
          onSubmit={onSubmit}
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
    'should render edit recipe modal',
    () => {
      const recipe = {
        category_id: 1,
        name: 'Lasanha',
        preparation_time_minutes: 40,
        servings: 5,
        ingredients:
          'Queijo e massa',
        preparation_method:
          'Assar',
      };

      const { getByText } = render(
        <RecipesForm
          visible
          recipe={recipe}
          onClose={onClose}
          onSubmit={onSubmit}
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
    'should populate form fields when editing recipe',
    () => {
      const recipe = {
        category_id: 1,
        name: 'Macarrão',
        preparation_time_minutes: 10,
        servings: 2,
        ingredients: 'Molho de tomate',
        preparation_method:
          'Cozinhar',
      };

      const { getByDisplayValue } =
        render(
          <RecipesForm
            visible
            recipe={recipe}
            onClose={onClose}
            onSubmit={onSubmit}
          />,
        );

      expect(
        getByDisplayValue(
          'Macarrão',
        ),
      ).toBeTruthy();

      expect(
        getByDisplayValue('10'),
      ).toBeTruthy();

      expect(
        getByDisplayValue('2'),
      ).toBeTruthy();
    },
  );

  it(
    'should display validation errors',
    async () => {
      const { getByText } = render(
        <RecipesForm
          visible
          onClose={onClose}
          onSubmit={onSubmit}
        />,
      );

      fireEvent.press(
        getByText('Cadastrar'),
      );

      await waitFor(() => {
        expect(
          getByText(
            'Selecione uma categoria',
          ),
        ).toBeTruthy();

        expect(
          getByText(
            'Informe o nome',
          ),
        ).toBeTruthy();

        expect(
          getByText(
            'Informe o tempo',
          ),
        ).toBeTruthy();

        expect(
          getByText(
            'Informe as porções',
          ),
        ).toBeTruthy();

        expect(
          getByText(
            'Informe os ingredientes',
          ),
        ).toBeTruthy();

        expect(
          getByText(
            'Informe o modo de preparo',
          ),
        ).toBeTruthy();
      });
    },
  );

  it(
    'should submit form successfully',
    async () => {
      const {
        getByText,
        getByDisplayValue,
        getByPlaceholderText,
        getByTestId,
      } = render(
        <RecipesForm
          visible
          onClose={onClose}
          onSubmit={onSubmit}
        />,
      );

      fireEvent.press(
        getByTestId('dropdown'),
      );

      fireEvent.changeText(
        getByPlaceholderText('Nome da receita'),
        'Lasanha',
      );

      fireEvent.changeText(
        getByPlaceholderText('Tempo (min)'),
        '40',
      );

      fireEvent.changeText(
        getByPlaceholderText('Porções'),
        '5',
      );

      fireEvent.changeText(
        getByPlaceholderText('Ingredientes'),
        'Queijo e massa',
      );

      fireEvent.changeText(
        getByPlaceholderText('Modo de preparo'),
        'Assar',
      );

      fireEvent.press(
        getByText('Cadastrar'),
      );

      await waitFor(() => {
        expect(
          onSubmit,
        ).toHaveBeenCalledWith({
          category_id: 1,
          name: 'Lasanha',
          preparation_time_minutes: 40,
          servings: 5,
          ingredients:
            'Queijo e massa',
          preparation_method:
            'Assar',
        });

        expect(
          onClose,
        ).toHaveBeenCalled();
      });
    },
  );

  it(
    'should call onClose when cancel button is pressed',
    () => {
      const { getByText } = render(
        <RecipesForm
          visible
          onClose={onClose}
          onSubmit={onSubmit}
        />,
      );

      fireEvent.press(
        getByText('Cancelar'),
      );

      expect(
        onClose,
      ).toHaveBeenCalled();
    },
  );

  it(
    'should render loading state',
    () => {
      const { getByText } = render(
        <RecipesForm
          visible
          loading
          onClose={onClose}
          onSubmit={onSubmit}
        />,
      );

      expect(
        getByText('Cadastrar'),
      ).toBeTruthy();
    },
  );
});