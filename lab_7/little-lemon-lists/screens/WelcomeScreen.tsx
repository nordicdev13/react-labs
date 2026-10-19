import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function WelcomeScreen() {
  const [name, setName] = useState('');

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Ласкаво просимо до Little Lemon</Text>

      <Text style={styles.leadText}>
        Little Lemon — це затишне сімейне середземноморське бістро, де автентичні традиційні рецепти
        поєднуються із сучасним кулінарним підходом.
      </Text>

      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>Ваше ім’я</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Введіть ваше ім’я"
          placeholderTextColor="#A0AEC0"
          accessibilityLabel="Ваше ім’я"
        />
        <Text style={styles.greetingText}>
          {name.trim() ? `Вітаємо, ${name.trim()}!` : 'Введіть ім’я.'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Наша філософія</Text>
        <Text style={styles.cardText}>
          Ми віримо, що найкраща їжа починається з найпростіших та найсвіжіших інгредієнтів. Щоранку
          наші кухарі відбирають фермерські овочі, свіжі трави, оливкову олію першого віджиму та локальні
          морепродукти.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Атмосфера та затишок</Text>
        <Text style={styles.cardText}>
          Незалежно від того, чи це швидкий бізнес-ланч, сімейна вечеря або зустріч із друзями — наш
          персонал створить для вас незабутній настрій та комфорт.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#495E57',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 32,
  },
  heading: {
    color: '#EDEFEE',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 14,
  },
  leadText: {
    color: '#EDEFEE',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D4DFEA',
  },
  inputLabel: {
    color: '#495E57',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#EDEFEE',
    color: '#333333',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginBottom: 10,
  },
  greetingText: {
    color: '#EE9972',
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D4DFEA',
  },
  cardTitle: {
    color: '#495E57',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardText: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 22,
  },
});
