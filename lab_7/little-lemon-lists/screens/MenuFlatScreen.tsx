import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { MenuItemRow } from '../components/MenuItemRow';
import { menuItems } from '../data/menu';
import type { MenuItem } from '../types/menu';

export default function MenuFlatScreen() {
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLocaleLowerCase('uk-UA');
  const visibleItems = menuItems.filter((item) =>
    item.name.toLocaleLowerCase('uk-UA').includes(normalizedQuery),
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Пошук страви..."
          placeholderTextColor="#A0AEC0"
          value={query}
          onChangeText={setQuery}
          accessibilityLabel="Пошук страви за назвою"
        />
      </View>

      <FlatList<MenuItem>
        style={styles.list}
        contentContainerStyle={styles.content}
        data={visibleItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemRow item={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Меню Little Lemon</Text>
            <Text style={styles.headerSubtitle}>Список усіх страв (FlatList)</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Страви не знайдено за запитом «{query}».</Text>
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#495E57',
  },
  searchInput: {
    backgroundColor: '#EDEFEE',
    color: '#333333',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
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
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#5A6F68',
    marginHorizontal: 16,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#EDEFEE',
    fontSize: 16,
    textAlign: 'center',
  },
});
