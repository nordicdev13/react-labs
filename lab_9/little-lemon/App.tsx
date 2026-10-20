import { useColorScheme } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import StackFlow from './navigation/StackFlow';
import TabsFlow from './navigation/TabsFlow';
import DrawerFlow from './navigation/DrawerFlow';

/**
 * Варіанти навігації відповідно до лабораторної роботи №9:
 * - StackFlow  (Завдання 1 і 2: Native Stack)
 * - TabsFlow   (Завдання 3: Bottom Tabs)
 * - DrawerFlow (Завдання 4: Drawer бічне меню)
 *
 * Для перемикання навігатора розкоментуйте потрібний нижче:
 */
export const ActiveNavigator = StackFlow;
// export const ActiveNavigator = TabsFlow;
// export const ActiveNavigator = DrawerFlow;

export default function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <ActiveNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
