# Лабораторна робота №9. Навігація в React Native

Застосунок **Little Lemon** із підтримкою трьох окремих типізованих сценаріїв навігації на базі **React Navigation 7.x**:
1. **Native Stack** (`navigation/StackFlow.tsx`): стек екранів з обов'язковим параметром email та стандартним поверненням.
2. **Bottom Tabs** (`navigation/TabsFlow.tsx`): нижні вкладки з підписами, іконками `Ionicons` та підтримкою гостьового перегляду (`route.params?.email ?? 'Гість'`).
3. **Drawer** (`navigation/DrawerFlow.tsx`): бічне висувне меню з лівого боку (`drawerPosition: 'left'`).

---

## Швидкий запуск

1. Встановлення залежностей:
   ```bash
   npm install
   ```

2. Запуск локального сервера розробки Expo:
   ```bash
   npx expo start
   ```

3. Перевірка типізації TypeScript:
   ```bash
   npx tsc --noEmit
   ```

---

## Вибір активного навігатора

Навігатори реалізовані як окремі незалежні модулі у папці `navigation/`.
Для перемикання між ними відкрийте файл **`App.tsx`** та розкоментуйте відповідний експорт:

```tsx
// 1. Native Stack (Завдання 1 і 2)
export const ActiveNavigator = StackFlow;

// 2. Bottom Tabs (Завдання 3)
// export const ActiveNavigator = TabsFlow;

// 3. Drawer бічне меню (Завдання 4)
// export const ActiveNavigator = DrawerFlow;
```

---

## Структура проєкту

```text
little-lemon/
├── App.tsx                     # Корінь із GestureHandlerRootView, SafeAreaProvider та NavigationContainer
├── navigation/
│   ├── types.ts                # Списки параметрів: StackParamList, TabParamList, DrawerParamList
│   ├── StackFlow.tsx           # Native Stack навігатор та оболонки LoginRoute / WelcomeRoute
│   ├── TabsFlow.tsx            # Bottom Tabs навігатор з іконками Ionicons
│   └── DrawerFlow.tsx          # Drawer навігатор
├── screens/
│   ├── LoginScreen.tsx         # Форма з валідацією, Pressable та очищенням пароля
│   ├── WelcomeScreen.tsx       # Екран привітання (логотип, опис, нейтральне привітання, onExit)
│   ├── MenuFlatScreen.tsx      # Збережені списки меню з ЛР №7
│   └── MenuGroupedScreen.tsx   # Збережені секційні списки меню з ЛР №7
├── theme/
│   ├── palette.ts              # Палітри lightColors, darkColors, тип Palette
│   └── useAppColors.ts         # Хук вибору активної теми (useColorScheme)
└── assets/
    └── images/
        └── logo.png            # Локальний логотип Little Lemon
```
