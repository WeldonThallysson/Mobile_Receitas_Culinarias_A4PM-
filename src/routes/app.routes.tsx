import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home/home.screen';
import ProfileScreen from '../screens/profiles/profiles.screen';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';

const Tab = createBottomTabNavigator();

const AppRoutes = () => {
  const { logout } = useAuth();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,

        headerStyle: {
          backgroundColor: '#F5F0FA',
        },

        headerTintColor: '#000',

        headerTitle: 'Receitas culinárias',

        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#9CA3AF',

        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = 'restaurant-menu';
          }

          if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Receitas',
          headerLeft: () => <IconButton icon="logout" onPress={logout} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
};

export default AppRoutes;
