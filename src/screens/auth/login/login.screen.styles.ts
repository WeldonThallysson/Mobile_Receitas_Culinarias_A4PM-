import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 10,
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 12,
  },

  subtitle: {
    marginTop: 4,
    opacity: 0.7,
    textAlign: 'center',
  },
});