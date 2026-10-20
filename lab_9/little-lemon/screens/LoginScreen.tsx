import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { Palette } from '../theme/palette';

type LoginScreenProps = {
  colors: Palette;
  onContinue: (email: string) => void;
};

export default function LoginScreen({ colors, onContinue }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleContinue() {
    const normalizedEmail = email.trim();
    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!emailLooksValid) {
      setError('Введіть email у форматі name@example.com.');
      return;
    }

    if (password.length === 0) {
      setError('Введіть навчальний пароль.');
      return;
    }

    setError(null);
    Keyboard.dismiss();
    setPassword('');
    onContinue(normalizedEmail);
  }

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Text style={[styles.heading, { color: colors.text }]}>Вхід до Little Lemon</Text>
        <Text style={[styles.subheading, { color: colors.muted }]}>
          Увійдіть для перегляду персональних знижок та бронювання столиків.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Email</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) setError(null);
            }}
            placeholder="example@mail.com"
            placeholderTextColor={colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Електронна пошта"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Пароль</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (error) setError(null);
            }}
            placeholder="Введіть пароль"
            placeholderTextColor={colors.muted}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            submitBehavior="blurAndSubmit"
            accessibilityLabel="Пароль"
          />
        </View>

        {error !== null && (
          <Text style={[styles.message, { color: colors.error }]}>
            {error}
          </Text>
        )}

        <Pressable
          accessibilityRole="button"
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.accent },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: colors.onAccent }]}>
            Увійти (демо)
          </Text>
        </Pressable>

        <View style={[styles.infoBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.infoText, { color: colors.muted }]}>
            Це навчальна форма з локальною перевіркою даних.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoBox: {
    marginTop: 24,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  infoText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});
