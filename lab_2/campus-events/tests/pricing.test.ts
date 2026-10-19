import { describe, expect, test } from '@jest/globals';
import { calculateRegistration } from '../src/pricing';
import { events } from '../src/events';

describe('Функція calculateRegistration', () => {
  test('правильно обчислює вартість без знижки для групи до 4 осіб', () => {
    // react-native-workshop коштує 150 грн
    const result = calculateRegistration(events, ['react-native-workshop'], 3);

    expect(result.subtotal).toBe(450);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(450);
  });

  test('застосовує 5% знижку для групи від 5 до 9 осіб', () => {
    // typescript-workshop коштує 200 грн; 5 осіб = 1000 грн, 5% знижка = 50 грн, разом = 950 грн
    const result = calculateRegistration(events, ['typescript-workshop'], 5);

    expect(result.subtotal).toBe(1000);
    expect(result.discount).toBe(50);
    expect(result.total).toBe(950);
  });

  test('застосовує 10% знижку для групи від 10 до 30 осіб', () => {
    // 150 + 200 = 350 грн; для 10 осіб: subtotal = 3500 грн, знижка = 350 грн, total = 3150 грн
    const result = calculateRegistration(
      events,
      ['react-native-workshop', 'typescript-workshop'],
      10,
    );

    expect(result.subtotal).toBe(3500);
    expect(result.discount).toBe(350);
    expect(result.total).toBe(3150);
  });

  test('правильно рахує безкоштовні події', () => {
    const result = calculateRegistration(events, ['ux-lecture'], 4);

    expect(result.subtotal).toBe(0);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(0);
  });

  test('кидає помилку для некоректного розміру групи (0 або менше)', () => {
    expect(() =>
      calculateRegistration(events, ['react-native-workshop'], 0),
    ).toThrow('Кількість учасників має бути цілим числом від 1 до 30');

    expect(() =>
      calculateRegistration(events, ['react-native-workshop'], -5),
    ).toThrow('Кількість учасників має бути цілим числом від 1 до 30');
  });

  test('кидає помилку для групи понад 30 осіб', () => {
    expect(() =>
      calculateRegistration(events, ['react-native-workshop'], 31),
    ).toThrow('Кількість учасників має бути цілим числом від 1 до 30');
  });

  test('кидає помилку для дробового числа учасників', () => {
    expect(() =>
      calculateRegistration(events, ['react-native-workshop'], 3.5),
    ).toThrow('Кількість учасників має бути цілим числом від 1 до 30');
  });

  test('кидає помилку для невідомого ID події', () => {
    expect(() =>
      calculateRegistration(events, ['invalid-event-id'], 2),
    ).toThrow('Подію з ID invalid-event-id не знайдено');
  });

  test('кидає помилку при спробі реєстрації на заповнену подію (seatsLeft === 0)', () => {
    // ai-meetup має seatsLeft: 0
    expect(() => calculateRegistration(events, ['ai-meetup'], 2)).toThrow(
      'На подію "Мітап: ШІ в мобільних додатках" немає вільних місць',
    );
  });
});
