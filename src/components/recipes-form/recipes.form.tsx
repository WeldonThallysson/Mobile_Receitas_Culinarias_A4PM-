import { useEffect } from 'react';

import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import {
  Button,
  Dialog,
  HelperText,
  Portal,
  TextInput,
} from 'react-native-paper';

import { Dropdown } from 'react-native-paper-dropdown';

import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { ICreateRecipeRequest } from '../../interfaces/api/recipe.interface';

import { useCategories } from '../../hooks/useCategories';

import { RecipeFormData, recipeSchema } from '../../schemas/recipe.schema';

import { styles } from './recipes.form.styles';

interface IRecipesFormProps {
  visible: boolean;
  loading?: boolean;

  recipe?: any | null;

  onClose: () => void;

  onSubmit: (data: ICreateRecipeRequest) => Promise<void>;
}

export const RecipesForm = ({
  visible,
  loading = false,
  recipe,
  onClose,
  onSubmit,
}: IRecipesFormProps) => {
  const { categories, loadCategories } = useCategories();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),

    defaultValues: {
      category_id: '',
      name: '',
      preparationTimeMinutes: '',

      servings: '',

      ingredients: '',

      preparationMethod: '',
    },
  });

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    if (recipe) {
      reset({
         category_id: recipe?.category?.id
        ? String(recipe?.category?.id)
        : '',
        name: recipe.name,

        preparationTimeMinutes: String(recipe.preparationTimeMinutes),

        servings: String(recipe.servings),

        ingredients: recipe.ingredients,

        preparationMethod: recipe.preparationMethod,
      });

      return;
    }

    reset({
      category_id: '',
      name: '',
      preparationTimeMinutes: '',

      servings: '',

      ingredients: '',

      preparationMethod: '',
    });
  }, [recipe, visible]);

  const handleClose = () => {
    reset();

    onClose();
  };

  const handleFormSubmit = async (data: RecipeFormData) => {
    await onSubmit({
      category_id: Number(data?.category_id),

      name: data.name,

      preparationTimeMinutes: Number(data.preparationTimeMinutes),

      servings: Number(data.servings),

      ingredients: data.ingredients,

      preparationMethod: data.preparationMethod,
    });

    reset();

    onClose();
  };

 
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={loading ? undefined : handleClose}
        style={styles.dialog}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Dialog.Title>
            {recipe ? 'Editar receita' : 'Nova receita'}
          </Dialog.Title>

          <Dialog.ScrollArea>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.content}>
                <Controller
                  control={control}
                  name="category_id"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Dropdown
                        label="Categoria"
                        value={value}
                        onSelect={onChange}
                        options={categories.map(category => ({
                          label: category.name,
                          value: String(category.id),
                        }))}
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <TextInput
                        mode="outlined"
                        label="Nome da receita"
                        value={value}
                        disabled={loading}
                        onChangeText={onChange}
                      />
                      {errors?.name?.message && (
                        <HelperText type="error" visible={!!errors.name}>
                          {errors.name?.message}
                        </HelperText>
                      )}
                    </>
                  )}
                />

                <View style={styles.row}>
                  <Controller
                    control={control}
                    name="preparationTimeMinutes"
                    render={({ field: { value, onChange } }) => (
                      <View style={styles.flex}>
                        <TextInput
                          mode="outlined"
                          label="Tempo (min)"
                          keyboardType="numeric"
                          value={value}
                          disabled={loading}
                          onChangeText={onChange}
                        />

                        {errors?.preparationTimeMinutes?.message && (
                          <HelperText
                            type="error"
                            visible={!!errors.preparationTimeMinutes}
                          >
                            {errors.preparationTimeMinutes?.message}
                          </HelperText>
                        )}
                      </View>
                    )}
                  />

                  <Controller
                    control={control}
                    name="servings"
                    render={({ field: { value, onChange } }) => (
                      <View style={styles.flex}>
                        <TextInput
                          mode="outlined"
                          label="Porções"
                          keyboardType="numeric"
                          value={value}
                          disabled={loading}
                          onChangeText={onChange}
                        />

                        {errors?.servings?.message && (
                          <HelperText type="error" visible={!!errors.servings}>
                            {errors.servings?.message}
                          </HelperText>
                        )}
                      </View>
                    )}
                  />
                </View>

                <Controller
                  control={control}
                  name="ingredients"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <TextInput
                        mode="outlined"
                        label="Ingredientes"
                        multiline
                        numberOfLines={5}
                        value={value}
                        disabled={loading}
                        onChangeText={onChange}
                      />

                      {errors?.ingredients?.message && (
                        <HelperText type="error" visible={!!errors.ingredients}>
                          {errors.ingredients?.message}
                        </HelperText>
                      )}
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="preparationMethod"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <TextInput
                        mode="outlined"
                        label="Modo de preparo"
                        multiline
                        numberOfLines={7}
                        value={value}
                        disabled={loading}
                        onChangeText={onChange}
                      />

                      {errors?.preparationMethod?.message && (
                        <HelperText
                          type="error"
                          visible={!!errors.preparationMethod}
                        >
                          {errors.preparationMethod?.message}
                        </HelperText>
                      )}
                    </>
                  )}
                />
              </View>
            </ScrollView>
          </Dialog.ScrollArea>

          <Dialog.Actions>
            <Button disabled={loading} onPress={handleClose}>
              Cancelar
            </Button>

            <Button
              mode="contained"
              loading={loading}
              disabled={loading}
              onPress={handleSubmit(handleFormSubmit)}
            >
              {recipe ? 'Salvar' : 'Cadastrar'}
            </Button>
          </Dialog.Actions>
        </KeyboardAvoidingView>
      </Dialog>
    </Portal>
  );
};

export default RecipesForm;
