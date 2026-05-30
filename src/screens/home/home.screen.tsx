import { useEffect, useMemo, useState } from 'react';

import { FlatList, View } from 'react-native';

import {
  Appbar,
  Button,
  Card,
  Dialog,
  Divider,
  IconButton,
  Portal,
  Searchbar,
  Text,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../hooks/useAuth';

import { useRecipes } from '../../hooks/useRecipes';

import { RecipesForm } from '../../components/recipes-form/recipes.form';

import { ICreateRecipeRequest } from '../../interfaces/api/recipe.interface';

import { styles } from './home.screen.styles';
import { theme } from '../../global/theme';

const HomeScreen = () => {
  const { message } = useAuth();

  const {
    recipes,
    loading,
    loadRecipes,
    handleCreateRecipe,
    handleUpdateRecipe,
    handleDeleteRecipe,
  } = useRecipes();

  const [search, setSearch] = useState('');

  const [formVisible, setFormVisible] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [recipeToDelete, setRecipeToDelete] = useState<number | null>(null);

  useEffect(() => {
    loadRecipes();
  }, []);

  const filteredRecipes = useMemo(() => {
    if (!search.trim()) {
      return recipes;
    }

    return recipes.filter(recipe =>
      recipe.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [recipes, search]);

  const openCreateModal = () => {
    setSelectedRecipe(null);

    setFormVisible(true);
  };

  const openEditModal = (recipe: any) => {
    setSelectedRecipe(recipe);

    setFormVisible(true);
  };

  const closeFormModal = () => {
    setFormVisible(false);

    setSelectedRecipe(null);
  };

  const handleSubmitRecipe = async (data: ICreateRecipeRequest) => {
    try {
      setSubmitLoading(true);

      if (selectedRecipe) {
        await handleUpdateRecipe(selectedRecipe.id, data);
      } else {
        await handleCreateRecipe(data);
      }

      await loadRecipes();
    } finally {
      setSubmitLoading(false);
    }
  };

  const openDeleteModal = (id: number) => {
    setRecipeToDelete(id);

    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);

    setRecipeToDelete(null);
  };

  const confirmDeleteRecipe = async () => {
    if (!recipeToDelete) {
      return;
    }

    await handleDeleteRecipe(recipeToDelete);

    await loadRecipes();

    closeDeleteModal();
  };

  const subMessage = "Gerencie suas receitas culinárias de forma simples"
  return (
    <View style={styles.container}>
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => String(item.id)}
        refreshing={loading}
        onRefresh={loadRecipes}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <>
            <View style={styles.hero}>
              {message && (
                <Text variant="headlineMedium" style={styles.heroTitle}>
                  {message}
                </Text>
              )}

              {!message ? (
                <Text variant="headlineMedium" style={styles.heroTitle}>
                  {subMessage}
                </Text>
              ) : (
                <Text variant="bodyLarge" style={styles.heroSubtitle}>
                 {subMessage}
                </Text>
              )}
            </View>

            <Searchbar
              placeholder="Buscar receitas..."
              value={search}
              onChangeText={setSearch}
              style={styles.search}
            />
          </>
        }
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Icon name="restaurant" size={72} color="#BDBDBD" />

            <Text variant="titleMedium">Nenhuma receita encontrada</Text>
            {search.length !== 0 ? (
              <Text variant="bodyMedium">
                Você ainda não cadastrou essa receita - {search}
              </Text>
            ) : (
              <Text variant="bodyMedium">
                Cadastre uma nova receita para começar.
              </Text>
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.badge}>
                <Icon
                  name="local-offer"
                  size={14}
                  color={theme.colors?.primary}
                />

                <Text style={styles.badgeText}>{item.category?.name}</Text>
              </View>

              <Text variant="titleLarge" style={styles.recipeTitle}>
                {item.name}
              </Text>

              <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                  <Icon name="schedule" size={18} color="#616161" />

                  <Text>{item.preparationTimeMinutes} min</Text>
                </View>

                <View style={styles.infoRow}>
                  <Icon name="restaurant-menu" size={18} color="#616161" />

                  <Text>{item.servings} porções</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ingredientes</Text>

                <Text variant="bodyMedium">{item.ingredients}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Modo de preparo</Text>

                <Text variant="bodyMedium">{item.preparationMethod}</Text>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.actions}>
                <Button
                  mode="contained-tonal"
                  icon="pencil"
                  style={styles.actions_edit}
                  onPress={() => openEditModal(item)}
                >
                  Editar
                </Button>

                <IconButton
                  icon="delete"
                  mode="contained"
                  containerColor="#FEE2E2"
                  iconColor="#DC2626"
                  onPress={() => openDeleteModal(item.id)}
                />
              </View>
            </Card.Content>
          </Card>
        )}
      />
      <Button
        mode="contained"
        icon="plus"
        style={styles.createButton}
        contentStyle={styles.createButtonContent}
        onPress={openCreateModal}
      >
        Cadastrar nova receita
      </Button>
      <RecipesForm
        visible={formVisible}
        loading={submitLoading}
        recipe={selectedRecipe}
        onClose={closeFormModal}
        onSubmit={handleSubmitRecipe}
      />

      <Portal>
        <Dialog visible={deleteModalVisible} onDismiss={closeDeleteModal}>
          <Dialog.Title>Excluir receita</Dialog.Title>

          <Dialog.Content>
            <Text variant="bodyMedium">
              Deseja realmente excluir essa receita?
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={closeDeleteModal}>Cancelar</Button>

            <Button
              mode="contained"
              buttonColor="#DC2626"
              onPress={confirmDeleteRecipe}
            >
              Excluir
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default HomeScreen;
