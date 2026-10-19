# Лабораторна робота №2. JavaScript, TypeScript і модульне тестування

## Мета роботи

Навчитися створювати невеликий консольний проєкт спочатку на JavaScript, а потім самостійно перенести його на TypeScript. У процесі студент працює з функціями, масивами об’єктів, класами, модулями, перевіркою введених даних і unit-тестами.

Сценарій: **Campus Events** — модуль для роботи з подіями університету. Він зберігає події, знаходить доступні, реєструє учасника та обчислює вартість групової реєстрації.

## Що має бути в результаті

Після виконання роботи у вас буде один проєкт з двома версіями однакової логіки:

```text
campus-events/
├── src-js/                    # перша, виконувана версія на JavaScript
│   ├── basics.js
│   ├── events.js
│   ├── attendee.js
│   ├── pricing.js
│   └── index.js
├── src/                       # та сама логіка, переписана на TypeScript
│   ├── basics.ts
│   ├── events.ts
│   ├── attendee.ts
│   ├── pricing.ts
│   └── index.ts
├── tests/
│   ├── events.test.ts
│   └── pricing.test.ts
├── dist/                      # JavaScript, створений компілятором; у Git не додається
├── package.json
├── tsconfig.json
├── tsconfig.build.json
└── jest.config.cjs
```

Ви повинні вміти виконати три команди без помилок:

```bash
npm run start:js
npm run typecheck
npm test
```

Після виконання `npm run build` у папці `dist/` мають з’явитися скомпільовані `.js`-файли, які запускаються командою `npm run start:ts`.

## Готовий демо-проєкт для дослідження

У папці [Демо-проєкт Study Planner](Демо-проєкт%20Study%20Planner/README.md) є повністю готовий, перевірений проєкт іншої тематики — планувальник навчальних завдань. Він не є розв’язком завдань цієї лабораторної, але має таку саму організацію: окремі JavaScript- і TypeScript-версії, модулі, клас, перевірки, компіляцію та Jest-тести.

Вивчайте його після ознайомлення з відповідним розділом методички:

1. запустіть `npm run start:js` у папці демо;
2. порівняйте `src-js/` і `src/` файл за файлом;
3. запустіть `npm run typecheck`, `npm run build`, `npm run start:ts` і `npm test`;
4. прочитайте коментарі в коді, а потім змініть, наприклад, одне завдання чи кількість днів у плані та повторіть перевірки.

## 1. Підготовка середовища

### Крок 1. Встановіть Node.js

Завантажте та встановіть LTS-версію Node.js з [офіційної сторінки](https://nodejs.org/en/download). **Node.js** — це середовище, яке запускає JavaScript не в браузері, а на вашому комп’ютері. Разом із ним встановлюється **npm** — менеджер пакетів, тобто інструмент для підключення бібліотек до проєкту.

Відкрийте VS Code, запустіть вбудований термінал через **Terminal → New Terminal** і перевірте встановлення:

```bash
node --version
npm --version
```

Першою командою ви перевіряєте Node.js, другою — npm. Якщо термінал показав номери версій, середовище готове. Якщо команда не знайдена, перезапустіть VS Code або встановіть Node.js ще раз.

### Крок 2. Створіть папку проєкту

У терміналі виконайте:

```bash
mkdir campus-events
cd campus-events
npm init -y
```

- `mkdir campus-events` створює папку проєкту;
- `cd campus-events` переходить до неї;
- `npm init -y` створює `package.json` із типовими відповідями.

`package.json` — це «паспорт» Node.js-проєкту. У ньому зберігаються назва, команди запуску та список бібліотек. Не створюйте його вручну: команда `npm init -y` робить коректний початковий файл.

Відкрийте створену папку через **File → Open Folder** у VS Code.

### Крок 3. Додайте команди проєкту

У `package.json` знайдіть об’єкт `scripts` і замініть його на:

```json
"scripts": {
  "start:js": "node src-js/index.js",
  "typecheck": "tsc --noEmit",
  "build": "tsc -p tsconfig.build.json",
  "start:ts": "node dist/index.js",
  "test": "jest"
}
```

`scripts` — це короткі назви команд. Наприклад, `npm run start:js` виконає текст праворуч від `start:js`. Поки що TypeScript, `build` і `test` не працюватимуть, бо ми ще не встановили потрібні інструменти. Це нормально: на першому етапі виконуємо JavaScript.

## 2. Спочатку JavaScript: що він робить і де його межі

### JavaScript як мова виконання

JavaScript — це мова, яку виконує Node.js або браузер. Змінні зберігають значення, функції виконують повторювану дію, а об’єкти групують пов’язані дані. Наприклад:

```js
function calculateTotal(price, groupSize) {
  return price * groupSize;
}

console.log(calculateTotal(50, 3)); // 150
```

Функція отримує два значення, множить їх та повертає результат. JavaScript не вимагає повідомляти наперед, які саме значення очікуються. Це зручно для швидкого старту, але дозволяє випадково передати неправильний аргумент:

```js
calculateTotal('безкоштовно', 3); // NaN — некоректний числовий результат
```

Помилка виявляється лише під час запуску. Саме цю проблему пізніше допоможе побачити TypeScript.

### Змінні, об’єкти та масиви

Для значень, які не потрібно переприсвоювати, використовуйте `const`. Для змінної, значення якої справді зміниться, — `let`. У цій роботі не використовуйте `var`: воно має старі правила області видимості, які ускладнюють читання коду.

```js
const event = {
  id: 'ux-lecture',
  title: 'Відкрита лекція: Мобільний UX',
  seatsLeft: 20,
};

const events = [event];
```

`event` — об’єкт: дані записано парами «властивість: значення». `events` — масив, тобто впорядкований список. До властивості звертаються через крапку: `event.title`. До елемента масиву — за індексом: `events[0]`. У реальному коді частіше шукають елемент за ID, а не покладаються на номер у масиві.

### Функції, повернення значення та перевірки

Функція може або повернути результат через `return`, або виконати дію без результату, наприклад вивести текст у консоль. Функції, які обчислюють дані, краще не змішувати з `console.log`: їх можна повторно використати і легко перевірити тестом.

```js
function isRegistrationOpen(seatsLeft) {
  return seatsLeft > 0;
}

const open = isRegistrationOpen(5); // true
```

Умова `seatsLeft > 0` дає булеве значення `true` або `false`. Воно підходить для `if`:

```js
if (isRegistrationOpen(event.seatsLeft)) {
  console.log('Реєстрація відкрита');
}
```

### Модулі

Коли весь код знаходиться в одному файлі, його важко читати й тестувати. **Модуль** — це файл із логічно пов’язаним кодом. У JavaScript-версії використайте CommonJS-модулі, що зрозуміло працюють у Node.js:

```js
// events.js
function getOpenEvents(events) {
  return events.filter((event) => event.seatsLeft > 0);
}

module.exports = { getOpenEvents };
```

```js
// index.js
const { getOpenEvents } = require('./events');
```

`module.exports` робить функцію доступною з іншого файлу. `require('./events')` завантажує файл `events.js`; розширення `.js` Node.js додає сам. Фігурні дужки означають: «візьми лише властивість `getOpenEvents` з об’єкта, який експортує модуль».

## 3. Частина A — реалізація на JavaScript

Створіть папку `src-js` і п’ять файлів із переліку в розділі «Що має бути в результаті». Кожне завдання нижче спочатку виконайте саме в `src-js/*.js`.

### Завдання A1. Найпростіші функції (`src-js/basics.js`)

1. Створіть `formatEventTitle(title, category)`. Функція повертає рядок `Подія: <title> (<category>)`.
2. Створіть `isRegistrationOpen(seatsLeft)`. Вона повертає `true`, якщо місць більше за нуль, і `false` у протилежному разі.
3. Створіть `printEventSummary(title, seatsLeft)`. Вона використовує дві попередні функції та один раз виводить у консоль назву події й стан реєстрації.
4. Експортуйте три функції через `module.exports`.

Підказка: для побудови рядка зручно використати template literal — текст у зворотних лапках:

```js
return `Подія: ${title}`;
```

Частина `${title}` підставляє значення змінної в текст. Це читабельніше, ніж з’єднувати рядки оператором `+`.

### Завдання A2. Масив подій (`src-js/events.js`)

1. Створіть масив `events` із чотирьох об’єктів. Кожна подія повинна мати `id`, `title`, `startsAt`, `seatsLeft`, `category` і `price`.
2. Напишіть `getOpenEvents(events)`. Вона повертає новий масив лише з подіями, у яких `seatsLeft > 0`.
3. Напишіть `getEventsByCategory(events, category)`. Вона повертає події однієї категорії.
4. Напишіть `findEventById(events, id)`. Вона повертає подію з потрібним ID або `undefined`, якщо події немає.
5. Напишіть `getEventTitles(events)`. Вона повертає масив лише з назв подій.
6. Експортуйте масив і всі функції.

Для завдань 2 і 3 використайте `filter`:

```js
const openEvents = events.filter((event) => event.seatsLeft > 0);
```

`filter` проходить по кожному елементу й перевіряє умову. Якщо умова `true`, елемент потрапляє до **нового** масиву. Початковий `events` не змінюється. Саме тому `filter` безпечний для пошуку даних.

Для завдання 4 використайте `find`:

```js
return events.find((event) => event.id === id);
```

`find` повертає перший відповідний елемент. Якщо відповідного немає, результат — `undefined`. Потрійне порівняння `===` перевіряє і значення, і тип, тому в цій роботі використовуйте саме його.

Для завдання 5 використайте `map`:

```js
return events.map((event) => event.title);
```

`map` теж створює новий масив, але перетворює кожен елемент. Тут об’єкт події перетворюється на її назву.

### Завдання A3. Клас учасника (`src-js/attendee.js`)

1. Створіть клас `Attendee`.
2. У `constructor(id, name)` збережіть аргументи у `this.id` та `this.name`, а також створіть порожній масив `this.registeredEventIds`.
3. Додайте метод `register(eventId)`. Якщо ID ще немає в масиві, додайте його через `push` і поверніть `true`. Якщо ID уже є, нічого не додавайте й поверніть `false`.
4. Додайте `cancel(eventId)`. Він має видалити ID із масиву та повернути `true`, якщо зміни відбулися.
5. Додайте `isRegisteredFor(eventId)`, який повертає результат `this.registeredEventIds.includes(eventId)`.
6. Експортуйте клас.

Клас — це шаблон для об’єктів одного виду. `new Attendee('st-01', 'Олена')` створює конкретний об’єкт-учасника. Усередині методу `this` означає саме той об’єкт, для якого викликали метод. Наприклад, `this.registeredEventIds.push(eventId)` змінює список реєстрацій цього учасника, а не будь-який глобальний масив.

Для `cancel` зручно знайти позицію ID через `indexOf`. Якщо результат `-1`, такого ID немає. Якщо результат не `-1`, видаліть один елемент методом `splice(index, 1)`. `splice` змінює масив, тому тут він доречний: метод класу навмисно змінює внутрішній стан учасника.

### Завдання A4. Розрахунок вартості (`src-js/pricing.js`)

Створіть `calculateRegistration(events, selectedIds, groupSize)`.

1. На початку перевірте `groupSize`. Якщо це не ціле число від 1 до 30, киньте помилку: `throw new Error('Кількість учасників має бути цілим числом від 1 до 30');`.
2. Для кожного ID із `selectedIds` знайдіть подію через `findEventById`.
3. Якщо події не існує або `seatsLeft` дорівнює нулю, киньте помилку з поясненням.
4. Обчисліть `subtotal`: сума цін вибраних подій, помножена на `groupSize`.
5. Визначте ставку знижки: 0% для групи до 4 осіб, 5% для 5–9 осіб, 10% для 10–30 осіб.
6. Поверніть об’єкт `{ subtotal, discount, total }`, де `discount` — сума знижки в грошах, а `total` — сума після знижки.
7. Округліть усі три суми до двох знаків через `Number(value.toFixed(2))`.

`throw new Error(...)` негайно припиняє роботу функції й передає опис проблеми тому коду, який її викликав. Це краще, ніж повертати «дивне» число чи продовжувати обчислення з неіснуючою подією. Такий підхід називають захисним програмуванням: програма перевіряє умови на вході, перш ніж працювати з даними.

### Завдання A5. Зберіть і запустіть JavaScript-версію (`src-js/index.js`)

1. Імпортуйте функції та дані з попередніх файлів через `require`.
2. Виведіть у консоль назви відкритих подій. Для цього використайте `for...of`:

```js
for (const event of getOpenEvents(events)) {
  console.log(event.title);
}
```

`for...of` зручно використовувати, коли для кожного елемента потрібна дія, наприклад виведення. На відміну від `map`, він не створює новий масив.

3. Створіть учасника, зареєструйте його на дві події, а потім спробуйте повторно зареєструвати на першу. Виведіть результати викликів `register`.
4. Викличте `calculateRegistration` для однієї або двох подій та групи з 10 людей. Виведіть отриманий об’єкт.
5. Запустіть програму:

```bash
npm run start:js
```

Якщо Node.js показує помилку `Cannot find module`, перевірте назву файлу та відносний шлях у `require`. Шлях `./events` означає «файл events у цій самій папці».

## 4. Перехід від JavaScript до TypeScript

### Що змінюється

TypeScript не замінює JavaScript: майже весь валідний JavaScript-код лишається валідним TypeScript-кодом. TypeScript додає описи типів і перевіряє їх до запуску. Порівняйте:

```js
// JavaScript
function calculateTotal(price, groupSize) {
  return price * groupSize;
}

calculateTotal('безкоштовно', 3); // JavaScript запуститься, але результат буде NaN
```

```ts
// TypeScript
function calculateTotal(price: number, groupSize: number): number {
  return price * groupSize;
}

calculateTotal('безкоштовно', 3); // помилка TypeScript до запуску
```

Переваги TypeScript порівняно зі звичайним JavaScript:

- редактор підказує доступні властивості об’єкта й параметри функції;
- неправильний тип аргументу видно ще до запуску;
- легше безпечно змінювати код: компілятор покаже місця, які потребують оновлення;
- опис типу слугує документацією для іншого розробника.

TypeScript не перевіряє дані, що надходять з інтернету, форми чи файлу **під час виконання програми**. Типи зникають після компіляції, тому перевірки `if`, помилки `throw` і unit-тести все одно потрібні.

### Крок 1. Встановіть інструменти TypeScript і тестування

Після того як JavaScript-версія працює, виконайте в корені проєкту:

```bash
npm install --save-dev typescript@^6.0.3 jest ts-jest @types/node @types/jest @jest/globals
```

`--save-dev` означає «це інструменти розробника». Вони потрібні вам для перевірки, компіляції та тестів, але не є частиною логіки Campus Events.

- `typescript` містить компілятор `tsc`;
- `jest` запускає тести;
- `ts-jest` пояснює Jest, як працювати з `.ts`-файлами;
- `@types/node` додає типи вбудованих можливостей Node.js, потрібні Jest;
- `@types/jest` і `@jest/globals` додають TypeScript-підказки для `test`, `expect` і `describe`.

Після інсталяції npm додасть залежності до `package.json` і створить `package-lock.json`. Обидва файли треба зберегти в проєкті: вони фіксують однакові версії інструментів для всіх.

> Використано гілку TypeScript 6, сумісну з поточною версією ts-jest. Не змінюйте її на TypeScript 7, доки ts-jest офіційно не оголосить підтримку.

### Крок 2. Налаштуйте перевірку типів

Створіть у корені `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "noEmit": true,
    "types": ["node", "jest"]
  },
  "include": ["src", "tests"]
}
```

Цей файл керує компілятором TypeScript.

- `target: "ES2022"` — версія JavaScript, у яку TypeScript має перетворювати сучасні конструкції;
- `module: "commonjs"` — формат модулів для Node.js у цій навчальній роботі;
- `strict: true` — увімкнути сувору перевірку, зокрема не дозволяти непомічені `undefined` і неявний `any`;
- `esModuleInterop: true` — полегшує спільне використання різних стилів модулів;
- `noEmit: true` — у режимі `typecheck` лише перевіряти код, не створюючи файлів.

Створіть також `tsconfig.build.json`:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

Це окрема конфігурація для **компіляції**. Вона успадковує основні правила з `tsconfig.json`, але змінює `noEmit` на `false`: тепер TypeScript створить JavaScript-файли. `rootDir` указує, де лежать вихідні `.ts`, а `outDir` — куди потрапить готовий JavaScript. Тести не входять до збірки, бо їх не потрібно запускати як застосунок.

Створіть `jest.config.cjs`:

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
};
```

Розширення `.cjs` однозначно повідомляє Node.js, що файл конфігурації використовує CommonJS. `preset: 'ts-jest'` дозволяє Jest читати TypeScript. `testMatch` обмежує пошук файлами, що закінчуються на `.test.ts` у папці `tests`.

### Крок 3. Створіть TypeScript-копію JavaScript-логіки

Створіть папку `src`. Не видаляйте `src-js`: вона потрібна, щоб було видно завершену JavaScript-версію. Переписуйте файли один за одним, а не все одразу:

1. скопіюйте логіку з `src-js/basics.js` у `src/basics.ts`;
2. замініть `module.exports` на `export`;
3. додайте типи параметрів і результату;
4. запустіть `npm run typecheck`;
5. лише коли помилок немає, переходьте до наступного файла.

Такий малий крок важливий: якщо компілятор показує помилку, ви точно знаєте, у якому файлі вона з’явилася.

#### Приклад: `basics.js` → `basics.ts`

JavaScript-версія:

```js
function isRegistrationOpen(seatsLeft) {
  return seatsLeft > 0;
}

module.exports = { isRegistrationOpen };
```

TypeScript-версія:

```ts
export function isRegistrationOpen(seatsLeft: number): boolean {
  return seatsLeft > 0;
}
```

Тут `number` забороняє передати текст замість кількості місць, а `boolean` документує результат. Запис `export function` одночасно оголошує функцію і робить її доступною іншому модулю.

#### Крок 4. Опишіть дані події у `src/events.ts`

На початку файла створіть тип категорії й інтерфейс:

```ts
export type EventCategory = 'lecture' | 'workshop' | 'meetup';

export interface CampusEvent {
  id: string;
  title: string;
  startsAt: Date;
  seatsLeft: number;
  category: EventCategory;
  price: number;
}
```

`EventCategory` — union-тип: значення може бути лише одним із трьох рядків. Це захищає від помилки на кшталт `'lectuer'`.

`CampusEvent` — інтерфейс, тобто опис форми об’єкта. Він не створює об’єкт і не існує у готовому JavaScript; це правило для компілятора та редактора. Після нього позначте масив і параметри функцій:

```ts
export const events: CampusEvent[] = [
  {
    id: 'ux-lecture',
    title: 'Відкрита лекція: Мобільний UX',
    startsAt: new Date('2026-10-01T16:00:00'),
    seatsLeft: 20,
    category: 'lecture',
    price: 0,
  },
];

export function getOpenEvents(events: CampusEvent[]): CampusEvent[] {
  return events.filter((event) => event.seatsLeft > 0);
}
```

Зверніть увагу на `findEventById`: TypeScript змушує врахувати, що подія може не знайтися:

```ts
export function findEventById(
  events: CampusEvent[],
  id: string,
): CampusEvent | undefined {
  return events.find((event) => event.id === id);
}
```

Вертикальна риска `|` означає «або». Перед використанням результату перевіряйте його:

```ts
const event = findEventById(events, selectedId);

if (!event) {
  throw new Error(`Подію з ID ${selectedId} не знайдено`);
}
```

Після `if (!event)` TypeScript розуміє, що нижче `event` уже точно є об’єктом `CampusEvent`.

#### Крок 5. Типізуйте клас у `src/attendee.ts`

Для класу учасника опишіть поля, конструктор і тип результату методів:

```ts
export class Attendee {
  id: string;
  name: string;
  registeredEventIds: string[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.registeredEventIds = [];
  }

  register(eventId: string): boolean {
    if (this.registeredEventIds.includes(eventId)) {
      return false;
    }

    this.registeredEventIds.push(eventId);
    return true;
  }
}
```

Завершіть клас методами `cancel(eventId: string): boolean` та `isRegisteredFor(eventId: string): boolean`, повторивши логіку JavaScript-версії. Перевага тут у тому, що редактор більше не дозволить випадково передати число замість ID.

#### Крок 6. Типізуйте розрахунок у `src/pricing.ts`

Імпортуйте `CampusEvent` і `findEventById` з `events.ts`. Додайте інтерфейс результату:

```ts
export interface RegistrationResult {
  subtotal: number;
  discount: number;
  total: number;
}
```

Задайте повний підпис функції:

```ts
export function calculateRegistration(
  events: CampusEvent[],
  selectedIds: string[],
  groupSize: number,
): RegistrationResult {
  // перенесіть і збережіть усі перевірки з JavaScript-версії
}
```

Типи не замінюють перевірку `Number.isInteger(groupSize)` і меж від 1 до 30. TypeScript перевіряє, що `groupSize` — число в коді, який ви пишете. Але число `-5` теж має тип `number`, тому бізнес-правило про допустимий діапазон має залишатися у функції.

#### Крок 7. Перепишіть точку запуску (`src/index.ts`)

У TypeScript використовуйте ES-імпорт:

```ts
import { events, getOpenEvents } from './events';
import { Attendee } from './attendee';
import { calculateRegistration } from './pricing';
```

Далі перенесіть сценарій із `src-js/index.js`: виведення відкритих подій, створення учасника, реєстрації та обчислення вартості. Хоча у вихідному TypeScript використано `import`/ `export`, налаштування `module: "commonjs"` перетворить їх на формат, який Node.js зможе виконати у `dist/`.

### Крок 8. Перевірте й скомпілюйте TypeScript

Спочатку виконайте:

```bash
npm run typecheck
```

Ця команда запускає `tsc --noEmit`: компілятор читає всі файли у `src` та `tests`, перевіряє типи, але не створює JavaScript. Це швидка перевірка під час розробки.

Потім скомпілюйте застосунок:

```bash
npm run build
```

Команда бере налаштування з `tsconfig.build.json`, перетворює `.ts` із `src/` на `.js` і записує результат у `dist/`. Відкрийте `dist/` у VS Code: це звичайний JavaScript без `interface`, `type` та позначок `: number`, бо Node.js їх не виконує.

Запустіть скомпільовану версію:

```bash
npm run start:ts
```

Результат має відповідати JavaScript-версії. Якщо `start:ts` не знаходить файл, спочатку повторіть `npm run build` і перевірте, чи існує `dist/index.js`.

## 5. Частина B — unit-тести для TypeScript-версії

### Що саме перевіряє тест

Unit-тест не запускає весь застосунок вручну. Він бере одну функцію або клас, подає контрольні дані та перевіряє результат. Це допомагає не зламати розрахунки під час змін.

Створіть `tests/events.test.ts`. На початку імпортуйте інструменти Jest і код, який перевіряєте:

```ts
import { describe, expect, test } from '@jest/globals';
import { events, findEventById, getOpenEvents } from '../src/events';
import { Attendee } from '../src/attendee';
```

`describe` об’єднує споріднені тести, `test` описує один сценарій, `expect` формулює очікування. Приклад:

```ts
test('повертає лише відкриті події', () => {
  const result = getOpenEvents(events);

  expect(result.every((event) => event.seatsLeft > 0)).toBe(true);
});
```

`every` повертає `true`, лише якщо умову виконують усі елементи масиву. `toBe(true)` перевіряє точну рівність із `true`.

### Обов’язкові тести

Напишіть щонайменше сім тестів у `events.test.ts` та `pricing.test.ts`:

1. `getOpenEvents` не повертає подію з нульовою кількістю місць.
2. `getEventsByCategory` повертає лише потрібну категорію.
3. `findEventById` повертає `undefined` для невідомого ID.
4. `getEventTitles` повертає масив рядків із назвами.
5. `Attendee.register` додає новий ID.
6. `Attendee.register` не додає той самий ID двічі.
7. `calculateRegistration` правильно рахує суму без знижки.
8. `calculateRegistration` застосовує 10% знижку для групи з 10 людей.
9. Додайте тест помилки: недопустимий `groupSize`, невідома або заповнена подія.

Для перевірки помилки використайте `toThrow`:

```ts
expect(() => calculateRegistration(events, ['unknown-id'], 1)).toThrow(
  'Подію з ID unknown-id не знайдено',
);
```

Функцію передано в `expect` без виклику. Jest сам викликає її та перевіряє, чи справді вона кине очікувану помилку.

Запустіть тести:

```bash
npm test
```

Якщо тест не пройшов, спочатку прочитайте назву тесту, потім рядок із `Expected` (очікуване значення) і `Received` (отримане значення). Не змінюйте очікування лише для того, щоб отримати зелений результат: спершу з’ясуйте, чи неправильний код, чи неправильно описаний сценарій.

## Додаткове завдання

Додайте до `CampusEvent` властивість `capacity: number`. Створіть функцію `registerForEvent(attendee: Attendee, event: CampusEvent)`, яка:

1. кидає помилку, якщо `seatsLeft` дорівнює нулю;
2. не допускає повторної реєстрації;
3. додає подію учаснику;
4. зменшує `seatsLeft` на 1;
5. повертає оновлену подію або `void` — вибраний варіант поясніть.

Додайте щонайменше два тести: успішна реєстрація зменшує кількість місць, а реєстрація на заповнену подію кидає помилку.

## Самоперевірка перед захистом

- JavaScript-версія у `src-js/` запускається через `npm run start:js`.
- TypeScript-версія у `src/` має ту саму логіку, але всі робочі файли мають розширення `.ts`.
- У `tsconfig.json` увімкнено `strict: true`.
- У TypeScript-коді немає `any` і вимкнених перевірок типів.
- `findEventById` повертає `CampusEvent | undefined`, а код перевіряє можливу відсутність події.
- Функція розрахунку перевіряє допустимий діапазон `groupSize` у runtime.
- Є щонайменше сім змістовних тестів, включно з помилковим сценарієм.
- Успішно виконуються `npm run typecheck`, `npm run build`, `npm run start:ts` і `npm test`.

## Захист лабораторної роботи

Захист відбувається усно з демонстрацією проєкту в редакторі та терміналі. Студент повинен показати JavaScript-версію, TypeScript-версію, скомпільований результат і unit-тести.

Під час захисту студент має вміти:

1. Пояснити, що роблять Node.js, npm, `package.json` і кожна команда з `scripts`.
2. Показати одну функцію в JavaScript і її TypeScript-версію, пояснивши додані типи.
3. Пояснити, чому TypeScript не скасовує runtime-перевірки й тестування.
4. Пояснити різницю між `filter`, `find`, `map` і `for...of` на прикладі власного коду.
5. Пояснити стан і методи об’єкта `Attendee`, зокрема роль `this`.
6. Показати результат `npm run typecheck`, `npm run build`, `npm run start:ts` і `npm test`.
7. Внести мінімальну зміну за вказівкою викладача: додати подію, нову категорію, змінити правило знижки, виправити тип або додати тест. Після зміни потрібно повторити перевірку типів і тести.

### Орієнтовні контрольні питання

- Що виконує JavaScript, а що робить TypeScript-компілятор?
- Чому `calculateTotal('безкоштовно', 3)` є проблемою, але JavaScript не зупиняє програму?
- Що означають `: number` після параметра та `: boolean` після дужок функції?
- Чим `interface` відрізняється від об’єкта JavaScript?
- Що означає `CampusEvent | undefined` і чому його потрібно перевіряти?
- Навіщо потрібен `strict: true`?
- Чому `any` небажаний?
- У чому різниця між `map`, `filter`, `find` та `for...of`?
- Що роблять `module.exports`/`require` у JavaScript і `export`/`import` у TypeScript?
- Чим відрізняються `npm run typecheck` і `npm run build`?
- Що робить unit-тест і що означає matcher `toThrow`?
- Чому тестування не можна замінити лише TypeScript-перевіркою?

## Корисні джерела

- [Node.js: завантаження LTS](https://nodejs.org/en/download)
- [TypeScript: встановлення та запуск компілятора](https://www.typescriptlang.org/download/)
- [TypeScript для JavaScript-розробників](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [TypeScript Handbook: базові щоденні типи](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript Handbook: функції](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [Jest: початок роботи та TypeScript](https://jestjs.io/docs/getting-started)
