import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },


  contentContainer: {
    padding: 15,
    paddingTop: 25,
    paddingBottom: 25,
  },

  hero: {
    marginBottom: 15,
  },

  heroTitle: {
    fontWeight: '700',
    marginBottom: 8,
    fontSize: 22
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
    backgroundColor: '#edecf3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 12,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors?.primary,
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
    marginVertical: 15,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    gap: 8,
  },

  actions_edit: {
     backgroundColor: '#edecf3',
  },
  createButton: {
    marginTop: 10,
    marginBottom: 10,
    
    marginLeft: 12,
    marginRight: 12,
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