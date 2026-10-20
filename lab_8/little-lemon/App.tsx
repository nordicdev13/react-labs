import { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { LittleLemonHeader } from './components/LittleLemonHeader';
import { LittleLemonFooter } from './components/LittleLemonFooter';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { darkColors, lightColors } from './theme/palette';

export default function App() {
  const [demoEmail, setDemoEmail] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <LittleLemonHeader colors={colors} />
        <View style={styles.content}>
          {demoEmail === null ? (
            <LoginScreen colors={colors} onContinue={setDemoEmail} />
          ) : (
            <WelcomeScreen
              colors={colors}
              email={demoEmail}
              onExit={() => setDemoEmail(null)}
            />
          )}
        </View>
        <LittleLemonFooter colors={colors} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
