import { StyleSheet, Text, View } from 'react-native';

export function LittleLemonFooter() {
  const year = new Date().getFullYear();

  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© {year} Little Lemon. Всі права захищені.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#EDEFEE',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#D3D6D4',
  },
  text: {
    color: '#333333',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});
