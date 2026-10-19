export default function App() {
  function handleClick() {
    const input = window.prompt('Введіть ціле число від 1 до 5');

    if (input === null) return; // «Скасувати» — завершити спробу без повідомлення.

    if (input.trim() === '') {
      window.alert('Ви не ввели число');
      return;
    }

    const userNumber = Number(input);

    if (!Number.isInteger(userNumber) || userNumber < 1 || userNumber > 5) {
      window.alert('Потрібно ввести ціле число від 1 до 5');
      return;
    }

    const computerNumber = Math.floor(Math.random() * 5) + 1;

    if (userNumber === computerNumber) {
      window.alert(`Ви вказали число: ${userNumber}, число комп’ютера: ${computerNumber}. Ви вгадали!`);
    } else {
      window.alert(`Ви вказали число: ${userNumber}, число комп’ютера: ${computerNumber}. Спробуйте ще раз.`);
    }
  }

  return (
    <main className="game-container">
      <h1>Гра «Вгадай число»</h1>
      <p>Вкажіть будь-яке число від 1 до 5</p>
      <button type="button" onClick={handleClick}>
        Почати
      </button>
    </main>
  );
}
