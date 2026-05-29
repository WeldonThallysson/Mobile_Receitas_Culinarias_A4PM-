import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/home.screen';
import RecipesScreen from '../screens/recipes/recipes.screen';
import ProfileScreen from '../screens/profiles/profiles.screen';
 
const Tab =
  createBottomTabNavigator();

 const AppRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Recipes"
        component={RecipesScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default AppRoutes;