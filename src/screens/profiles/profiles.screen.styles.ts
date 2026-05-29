import { StyleSheet } from 'react-native';

export const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      backgroundColor: '#F8FAFC',
    },

    avatar: {
      marginBottom: 24,
    },

    name: {
      fontWeight: '700',
      marginBottom: 8,
      textAlign: 'center',
    },

    login: {
      opacity: 0.7,
      marginBottom: 32,
      textAlign: 'center',
    },

    infoContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },

    label: {
      fontWeight: '700',
      marginBottom: 4,
    },

    button: {
      marginTop: 2,
      width: '100%',
      borderRadius: 12,
    },
  });