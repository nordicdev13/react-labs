export function formatEventTitle(
  title: string,
  category: string = 'загальна',
): string {
  return `Подія: ${title} (${category})`;
}

export function isRegistrationOpen(seatsLeft: number): boolean {
  return seatsLeft > 0;
}

export function printEventSummary(
  title: string,
  seatsLeft: number,
  category: string = 'загальна',
): void {
  const status = isRegistrationOpen(seatsLeft) ? 'відкрита' : 'закрита';
  console.log(`${formatEventTitle(title, category)} — Реєстрація: ${status}`);
}
