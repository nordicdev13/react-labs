import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import type { Palette } from '../theme/palette';

type WelcomeScreenProps = {
  colors: Palette;
  email: string;
  onExit: () => void;
};

export default function WelcomeScreen({ colors, email, onExit }: WelcomeScreenProps) {
  const [name, setName] = useState('');
  const { width } = useWindowDimensions();
  const wide = width >= 600;

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.heroContainer, { flexDirection: wide ? 'row' : 'column' }]}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel="Логотип Little Lemon"
        />
        <View style={wide ? styles.heroTextWide : styles.heroText}>
          <Text style={[styles.heading, { color: colors.text }]}>
            Ласкаво просимо до Little Lemon
          </Text>
          <Text style={[styles.leadText, { color: colors.muted }]}>
            Little Lemon — це затишне сімейне середземноморське бістро, де автентичні традиційні рецепти
            поєднуються із сучасним кулінарним підходом.
          </Text>
        </View>
      </View>

      <View style={[styles.statusBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.statusText, { color: colors.text }]}>
          Навчальний екран привітання для{' '}
          <Text style={[styles.emailHighlight, { color: colors.accent }]}>{email}</Text>
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onExit}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: colors.accent },
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={[styles.buttonText, { color: colors.onAccent }]}>
          Повернутися до форми
        </Text>
      </Pressable>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.inputLabel, { color: colors.text }]}>Ваше ім’я</Text>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.border,
            },
          ]}
          value={name}
          onChangeText={setName}
          placeholder="Введіть ваше ім’я"
          placeholderTextColor={colors.muted}
          accessibilityLabel="Ваше ім’я"
        />
        <Text style={[styles.greetingText, { color: colors.accent }]}>
          {name.trim() ? `Вітаємо, ${name.trim()}!` : 'Введіть ім’я.'}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Наша філософія</Text>
        <Text style={[styles.cardText, { color: colors.muted }]}>
          Ми віримо, що найкраща їжа починається з найпростіших та найсвіжіших інгредієнтів. Щоранку
          наші кухарі відбирають фермерські овочі, свіжі трави, оливкову олію першого віджиму та локальні
          морепродукти.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Атмосфера та затишок</Text>
        <Text style={[styles.cardText, { color: colors.muted }]}>
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
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 32,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  heroText: {
    alignItems: 'center',
  },
  heroTextWide: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 140,
    alignSelf: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  leadText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 16,
  },
  statusBox: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  emailHighlight: {
    fontWeight: '700',
  },
  button: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  textInput: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
