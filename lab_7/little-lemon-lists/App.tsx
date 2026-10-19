import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { LittleLemonFooter } from './components/LittleLemonFooter';
import { LittleLemonHeader } from './components/LittleLemonHeader';
import MenuFlatScreen from './screens/MenuFlatScreen';
import MenuGroupedScreen from './screens/MenuGroupedScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';

type ScreenMode = 'menuFlat' | 'menuGrouped' | 'welcome' | 'login';

const navButtons: { id: ScreenMode; label: string }[] = [
  { id: 'menuFlat', label: 'Меню' },
  { id: 'menuGrouped', label: 'Категорії' },
  { id: 'welcome', label: 'Привітання' },
  { id: 'login', label: 'Вхід' },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenMode>('menuFlat');

  function handleSwitchScreen(screen: ScreenMode) {
    Keyboard.dismiss();
    setActiveScreen(screen);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <StatusBar style="light" />
        <LittleLemonHeader />

        <View style={styles.navBar}>
          {navButtons.map((btn) => {
            const isActive = activeScreen === btn.id;
            return (
              <Pressable
                key={btn.id}
                style={[styles.navButton, isActive && styles.navButtonActive]}
                onPress={() => handleSwitchScreen(btn.id)}
              >
                <Text style={[styles.navButtonText, isActive && styles.navButtonTextActive]}>
                  {btn.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.content}>
          {activeScreen === 'menuFlat' && <MenuFlatScreen />}
          {activeScreen === 'menuGrouped' && <MenuGroupedScreen />}
          {activeScreen === 'welcome' && <WelcomeScreen />}
          {activeScreen === 'login' && <LoginScreen />}
        </View>

        <LittleLemonFooter />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#495E57',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#384B45',
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#2C3A35',
  },
  navButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  navButtonActive: {
    backgroundColor: '#F4CE14',
  },
  navButtonText: {
    color: '#EDEFEE',
    fontSize: 14,
    fontWeight: '600',
  },
  navButtonTextActive: {
    color: '#333333',
  },
  content: {
    flex: 1,
  },
});
