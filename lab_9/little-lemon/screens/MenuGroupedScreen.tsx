import { SectionList, StyleSheet, Text, View, type SectionListData } from 'react-native';
import { MenuItemRow } from '../components/MenuItemRow';
import { categories, menuItems } from '../data/menu';
import type { CategoryInfo, MenuItem } from '../types/menu';

const sections: SectionListData<MenuItem, CategoryInfo>[] = categories.map(
  (category) => ({
    ...category,
    data: menuItems.filter((item) => item.category === category.key),
  }),
);

export default function MenuGroupedScreen() {
  return (
    <View style={styles.container}>
      <SectionList<MenuItem, CategoryInfo>
        style={styles.list}
        contentContainerStyle={styles.content}
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemRow item={item} />}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={true}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Меню за категоріями</Text>
            <Text style={styles.headerSubtitle}>Розподіл страв (SectionList)</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495E57',
  },
  list: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    color: '#F4CE14',
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#EDEFEE',
    fontSize: 14,
    marginTop: 2,
  },
  sectionHeader: {
    backgroundColor: '#EE9972',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#D97A53',
    borderBottomWidth: 1,
    borderBottomColor: '#D97A53',
  },
  sectionTitle: {
    color: '#333333',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: '#5A6F68',
    marginHorizontal: 16,
  },
});
