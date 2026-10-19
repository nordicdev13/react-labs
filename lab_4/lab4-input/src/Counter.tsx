import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section aria-labelledby="counter-title">
      <h2 id="counter-title">Лічильник</h2>
      <p>Поточне значення: {count}</p>
      <div className="button-group">
        <button type="button" onClick={() => setCount(previous => previous + 1)}>
          Increase
        </button>
        <button type="button" onClick={() => setCount(previous => previous - 1)}>
          Decrease
        </button>
      </div>
      {count < 0 && <p role="status" className="warning-message">Counter can't be negative</p>}
    </section>
  );
}
