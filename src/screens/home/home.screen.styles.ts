import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },


  contentContainer: {
    padding: 15,
    paddingTop: 30,
    paddingBottom: 32,
  },

  hero: {
    marginBottom: 24,
  },

  heroTitle: {
    fontWeight: '700',
    marginBottom: 8,
  },

  heroSubtitle: {
    color: '#616161',
  },

  search: {
    marginBottom: 24,
    borderRadius: 16,
  },

  card: {
    borderRadius: 24,
    backgroundColor: '#FFF',
  },

  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 12,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6A1B9A',
  },

  cardHeader: {
    flexDirection: 'row',
  },

  recipeContent: {
    flex: 1,
  },

  recipeTitle: {
    fontWeight: '700',
    marginBottom: 5,
  },

  infoContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 5,
    flexWrap: 'wrap',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  section: {
    marginTop: 12,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },

  divider: {
    marginVertical: 20,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    gap: 8,
  },

  createButton: {
    marginTop: 24,
    borderRadius: 16,
  },

  createButtonContent: {
    height: 56,
  },

  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    gap: 12,
  },
});