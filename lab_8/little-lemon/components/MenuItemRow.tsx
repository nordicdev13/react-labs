import { StyleSheet, Text, View } from 'react-native';
import type { MenuItem } from '../types/menu';

type MenuItemRowProps = {
  item: MenuItem;
};

export function MenuItemRow({ item }: MenuItemRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price.toFixed(2)} грн</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  name: {
    flex: 1,
    color: '#EDEFEE',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 16,
  },
  price: {
    color: '#F4CE14',
    fontSize: 16,
    fontWeight: '700',
  },
});
