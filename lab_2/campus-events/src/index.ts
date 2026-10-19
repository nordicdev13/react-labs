import { events, getOpenEvents } from './events';
import { Attendee } from './attendee';
import { calculateRegistration } from './pricing';

console.log('=== Campus Events (TypeScript версія) ===\n');

console.log('Відкриті події:');
for (const event of getOpenEvents(events)) {
  console.log(`- ${event.title} (місць залишилось: ${event.seatsLeft}, ціна: ${event.price} грн)`);
}

console.log('\n--- Реєстрація учасника ---');
const attendee = new Attendee('att-02', 'Олена Коваль');

const reg1 = attendee.register('ux-lecture');
console.log(`Реєстрація на ux-lecture: ${reg1}`);

const reg2 = attendee.register('react-native-workshop');
console.log(`Реєстрація на react-native-workshop: ${reg2}`);

const regDuplicate = attendee.register('ux-lecture');
console.log(`Повторна реєстрація на ux-lecture: ${regDuplicate}`);

console.log(`Усі зареєстровані події учасника:`, attendee.registeredEventIds);

console.log('\n--- Розрахунок вартості для групи ---');
try {
  const result = calculateRegistration(
    events,
    ['react-native-workshop', 'typescript-workshop'],
    10,
  );
  console.log('Розрахунок для 10 осіб на два воркшопи:');
  console.log(`- Проміжний підсумок: ${result.subtotal} грн`);
  console.log(`- Знижка (10%): ${result.discount} грн`);
  console.log(`- До сплати: ${result.total} грн`);
} catch (error) {
  if (error instanceof Error) {
    console.error('Помилка розрахунку:', error.message);
  }
}
