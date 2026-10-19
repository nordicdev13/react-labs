import { StyleSheet, Text, View } from 'react-native';

export function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ласкаво просимо до Little Lemon</Text>

      <Text style={styles.leadText}>
        Little Lemon — це затишне сімейне середземноморське бістро, де автентичні традиційні рецепти
        поєднуються із сучасним кулінарним підходом.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Наша філософія</Text>
        <Text style={styles.cardText}>
          Ми віримо, що найкраща їжа починається з найпростіших та найсвіжіших інгредієнтів. Щоранку
          наші кухарі відбирають фермерські овочі, свіжі трави, оливкову олію першого віджиму та локальні
          морепродукти, щоб кожна страва дарувала справжнє сонячне тепло Середземномор'я.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Фірмові страви меню</Text>
        <Text style={styles.cardText}>
          Спробуйте наш знаменитий грецький салат із хрустким листям і ніжною фетою, традиційну лазанью
          за старовинним рецептом або ароматну рибу на грилі з розмарином і цитрусовим соусом. А на десерт
          обов'язково замовте наш фірмовий лимонний пиріг із легким безе.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Атмосфера та затишок</Text>
        <Text style={styles.cardText}>
          Незалежно від того, чи це швидкий бізнес-ланч посеред робочого дня, сімейна вечеря у вихідні або
          романтична зустріч при свічках — наш гостинний персонал створить для вас незабутній настрій та
          комфорт.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Години роботи</Text>
        <Text style={styles.cardText}>
          Понеділок – П'ятниця: 10:00 – 22:00{'\n'}
          Субота – Неділя: 11:00 – 23:00{'\n'}
          Ми завжди раді вітати вас та ваших близьких!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 24,
    paddingHorizontal: 8,
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
