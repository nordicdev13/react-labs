import { Attendee } from './attendee';

export type EventCategory = 'lecture' | 'workshop' | 'meetup';

export interface CampusEvent {
  id: string;
  title: string;
  startsAt: Date;
  seatsLeft: number;
  capacity: number;
  category: EventCategory;
  price: number;
}

export const events: CampusEvent[] = [
  {
    id: 'ux-lecture',
    title: 'Відкрита лекція: Мобільний UX',
    startsAt: new Date('2026-10-25T16:00:00'),
    seatsLeft: 15,
    capacity: 30,
    category: 'lecture',
    price: 0,
  },
  {
    id: 'react-native-workshop',
    title: 'Воркшоп: Знайомство з React Native',
    startsAt: new Date('2026-10-28T14:00:00'),
    seatsLeft: 8,
    capacity: 20,
    category: 'workshop',
    price: 150,
  },
  {
    id: 'ai-meetup',
    title: 'Мітап: ШІ в мобільних додатках',
    startsAt: new Date('2026-11-02T18:00:00'),
    seatsLeft: 0,
    capacity: 50,
    category: 'meetup',
    price: 100,
  },
  {
    id: 'typescript-workshop',
    title: 'Практикум: TypeScript для початківців',
    startsAt: new Date('2026-11-05T15:30:00'),
    seatsLeft: 12,
    capacity: 25,
    category: 'workshop',
    price: 200,
  },
];

export function getOpenEvents(items: CampusEvent[]): CampusEvent[] {
  return items.filter((event) => event.seatsLeft > 0);
}

export function getEventsByCategory(
  items: CampusEvent[],
  category: EventCategory,
): CampusEvent[] {
  return items.filter((event) => event.category === category);
}

export function findEventById(
  items: CampusEvent[],
  id: string,
): CampusEvent | undefined {
  return items.find((event) => event.id === id);
}

export function getEventTitles(items: CampusEvent[]): string[] {
  return items.map((event) => event.title);
}

export function registerForEvent(
  attendee: Attendee,
  event: CampusEvent,
): CampusEvent {
  if (event.seatsLeft <= 0) {
    throw new Error(`На подію "${event.title}" немає вільних місць`);
  }
  const registered = attendee.register(event.id);
  if (!registered) {
    throw new Error(`Учасник ${attendee.name} вже зареєстрований на подію "${event.title}"`);
  }
  event.seatsLeft -= 1;
  return event;
}
