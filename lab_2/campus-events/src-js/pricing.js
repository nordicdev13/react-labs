const { findEventById } = require('./events');

function calculateRegistration(events, selectedIds, groupSize) {
  if (!Number.isInteger(groupSize) || groupSize < 1 || groupSize > 30) {
    throw new Error('Кількість учасників має бути цілим числом від 1 до 30');
  }

  let singleTotal = 0;

  for (const id of selectedIds) {
    const event = findEventById(events, id);

    if (!event) {
      throw new Error(`Подію з ID ${id} не знайдено`);
    }

    if (event.seatsLeft === 0) {
      throw new Error(`На подію "${event.title}" немає вільних місць`);
    }

    singleTotal += event.price;
  }

  const subtotal = singleTotal * groupSize;

  let discountRate = 0;
  if (groupSize >= 10) {
    discountRate = 0.1;
  } else if (groupSize >= 5) {
    discountRate = 0.05;
  }

  const discount = Number((subtotal * discountRate).toFixed(2));
  const total = Number((subtotal - discount).toFixed(2));

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discount,
    total,
  };
}

module.exports = { calculateRegistration };
