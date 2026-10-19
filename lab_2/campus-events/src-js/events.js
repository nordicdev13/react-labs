const events = [
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

function getOpenEvents(items) {
  return items.filter((event) => event.seatsLeft > 0);
}

function getEventsByCategory(items, category) {
  return items.filter((event) => event.category === category);
}

function findEventById(items, id) {
  return items.find((event) => event.id === id);
}

function getEventTitles(items) {
  return items.map((event) => event.title);
}

function registerForEvent(attendee, event) {
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

module.exports = {
  events,
  getOpenEvents,
  getEventsByCategory,
  findEventById,
  getEventTitles,
  registerForEvent,
};
