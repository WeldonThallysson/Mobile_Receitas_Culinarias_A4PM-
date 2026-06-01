import { StyleSheet } from 'react-native';
import { theme } from '../../global/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 10
  },

  contentContainer: {

    paddingTop: 2,
    paddingBottom: 2,
  },

  hero: {
    marginBottom: 12,
  },

  heroTitle: {
    fontWeight: '700',
    marginBottom: 2,
    fontSize: 22
  },

  heroSubtitle: {
    color: '#616161',
  },

  search: {
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

    
  
    borderRadius: 16,
  },

  createButtonContent: {
    height: 50
  },

  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    gap: 12,
  },
});