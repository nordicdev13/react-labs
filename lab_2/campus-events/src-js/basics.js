function formatEventTitle(title, category = 'загальна') {
  return `Подія: ${title} (${category})`;
}

function isRegistrationOpen(seatsLeft) {
  return seatsLeft > 0;
}

function printEventSummary(title, seatsLeft, category = 'загальна') {
  const status = isRegistrationOpen(seatsLeft) ? 'відкрита' : 'закрита';
  console.log(`${formatEventTitle(title, category)} — Реєстрація: ${status}`);
}

module.exports = {
  formatEventTitle,
  isRegistrationOpen,
  printEventSummary,
};
