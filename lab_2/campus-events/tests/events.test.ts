import { describe, expect, test, beforeEach } from '@jest/globals';
import {
  events,
  findEventById,
  getEventsByCategory,
  getEventTitles,
  getOpenEvents,
  registerForEvent,
  CampusEvent,
} from '../src/events';
import { Attendee } from '../src/attendee';

describe('Функції для роботи з подіями', () => {
  test('getOpenEvents не повертає події з нульовою кількістю місць', () => {
    const openEvents = getOpenEvents(events);

    expect(openEvents.length).toBeGreaterThan(0);
    expect(openEvents.every((event) => event.seatsLeft > 0)).toBe(true);
    expect(openEvents.some((event) => event.id === 'ai-meetup')).toBe(false);
  });

  test('getEventsByCategory повертає лише події потрібної категорії', () => {
    const workshops = getEventsByCategory(events, 'workshop');

    expect(workshops.length).toBe(2);
    expect(workshops.every((event) => event.category === 'workshop')).toBe(true);
  });

  test('findEventById повертає правильну подію за ID', () => {
    const event = findEventById(events, 'ux-lecture');

    expect(event).toBeDefined();
    expect(event?.title).toBe('Відкрита лекція: Мобільний UX');
  });

  test('findEventById повертає undefined для невідомого ID', () => {
    const event = findEventById(events, 'non-existent-id');

    expect(event).toBeUndefined();
  });

  test('getEventTitles повертає масив рядків із назвами подій', () => {
    const titles = getEventTitles(events);

    expect(titles).toContain('Відкрита лекція: Мобільний UX');
    expect(titles).toContain('Воркшоп: Знайомство з React Native');
    expect(titles.length).toBe(events.length);
  });
});

describe('Клас Attendee', () => {
  let attendee: Attendee;

  beforeEach(() => {
    attendee = new Attendee('att-101', 'Данило');
  });

  test('register додає новий ID події та повертає true', () => {
    expect(attendee.register('ux-lecture')).toBe(true);
    expect(attendee.isRegisteredFor('ux-lecture')).toBe(true);
    expect(attendee.registeredEventIds).toEqual(['ux-lecture']);
  });

  test('register не додає той самий ID події двічі та повертає false', () => {
    expect(attendee.register('ux-lecture')).toBe(true);
    expect(attendee.register('ux-lecture')).toBe(false);
    expect(attendee.registeredEventIds).toHaveLength(1);
  });

  test('cancel видаляє зареєстровану подію та повертає true', () => {
    attendee.register('react-native-workshop');

    expect(attendee.cancel('react-native-workshop')).toBe(true);
    expect(attendee.isRegisteredFor('react-native-workshop')).toBe(false);
  });

  test('cancel повертає false, якщо подія не була зареєстрована', () => {
    expect(attendee.cancel('unknown-event')).toBe(false);
  });
});

describe('Додаткове завдання: registerForEvent', () => {
  test('успішна реєстрація додає подію учаснику та зменшує seatsLeft на 1', () => {
    const attendee = new Attendee('att-102', 'Марія');
    const testEvent: CampusEvent = {
      id: 'test-event-1',
      title: 'Тестовий семінар',
      startsAt: new Date(),
      seatsLeft: 5,
      capacity: 10,
      category: 'workshop',
      price: 100,
    };

    registerForEvent(attendee, testEvent);

    expect(testEvent.seatsLeft).toBe(4);
    expect(attendee.isRegisteredFor('test-event-1')).toBe(true);
  });

  test('кидає помилку при спробі реєстрації на подію без вільних місць', () => {
    const attendee = new Attendee('att-103', 'Олексій');
    const fullEvent: CampusEvent = {
      id: 'full-event',
      title: 'Заповнена подія',
      startsAt: new Date(),
      seatsLeft: 0,
      capacity: 20,
      category: 'meetup',
      price: 50,
    };

    expect(() => registerForEvent(attendee, fullEvent)).toThrow(
      'На подію "Заповнена подія" немає вільних місць',
    );
  });

  test('кидає помилку при повторній реєстрації того ж учасника', () => {
    const attendee = new Attendee('att-104', 'Іван');
    const testEvent: CampusEvent = {
      id: 'test-event-2',
      title: 'Тестова зустріч',
      startsAt: new Date(),
      seatsLeft: 3,
      capacity: 10,
      category: 'lecture',
      price: 0,
    };

    registerForEvent(attendee, testEvent);

    expect(() => registerForEvent(attendee, testEvent)).toThrow(
      'Учасник Іван вже зареєстрований на подію "Тестова зустріч"',
    );
  });
});
