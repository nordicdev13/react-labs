import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function isEmailFormatValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const trimmedEmail = email.trim();
  const isEmailValid = isEmailFormatValid(trimmedEmail);
  const isPasswordValid = password.length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Text style={styles.heading}>Вхід до Little Lemon</Text>
        <Text style={styles.subheading}>
          Увійдіть для перегляду персональних знижок та бронювання столиків.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              emailTouched && !isEmailValid && trimmedEmail.length > 0 ? styles.inputError : null,
            ]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailTouched(true);
            }}
            onBlur={() => {
              setEmailTouched(true);
              setEmail(trimmedEmail);
            }}
            placeholder="example@mail.com"
            placeholderTextColor="#A0AEC0"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            accessibilityLabel="Електронна пошта"
          />
          {emailTouched && trimmedEmail.length === 0 && (
            <Text style={styles.errorText}>Введіть адресу електронної пошти.</Text>
          )}
          {emailTouched && trimmedEmail.length > 0 && !isEmailValid && (
            <Text style={styles.errorText}>Невірний формат email (приклад: user@example.com).</Text>
          )}
          {emailTouched && isEmailValid && (
            <Text style={styles.successText}>✓ Формат email правильний.</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Пароль</Text>
          <TextInput
            style={[
              styles.input,
              passwordTouched && !isPasswordValid ? styles.inputError : null,
            ]}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordTouched(true);
            }}
            onBlur={() => setPasswordTouched(true)}
            placeholder="Введіть пароль"
            placeholderTextColor="#A0AEC0"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            submitBehavior="blurAndSubmit"
            accessibilityLabel="Пароль"
          />
          {passwordTouched && !isPasswordValid && (
            <Text style={styles.errorText}>Пароль не може бути порожнім.</Text>
          )}
          {passwordTouched && isPasswordValid && (
            <Text style={styles.successText}>✓ Пароль введено.</Text>
          )}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
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
    backgroundColor: '#495E57',
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
  },
  heading: {
    color: '#EDEFEE',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  subheading: {
    color: '#EDEFEE',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: '#EDEFEE',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#EDEFEE',
    color: '#333333',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  inputError: {
    borderColor: '#EE9972',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#EE9972',
    fontSize: 13,
    marginTop: 6,
    fontWeight: '500',
  },
  successText: {
    color: '#F4CE14',
    fontSize: 13,
    marginTop: 6,
    fontWeight: '500',
  },
  infoBox: {
    marginTop: 16,
    padding: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  infoText: {
    color: '#EDEFEE',
    fontSize: 13,
    textAlign: 'center',
  },
});
