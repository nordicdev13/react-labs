import { StyleSheet, Text, View } from 'react-native';

export function LittleLemonHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Little Lemon</Text>
      <Text style={styles.subtitle}>Середземноморське бістро</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#EE9972',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D97A53',
  },
  title: {
    color: '#333333',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
});
