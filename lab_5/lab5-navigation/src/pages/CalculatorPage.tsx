import { useState } from 'react';

export default function CalculatorPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);
  const [error, setError] = useState('');

  function getValidatedOperand(): number | null {
    if (input.trim() === '') {
      setError('Введіть число.');
      return null;
    }

    const operand = Number(input);
    if (!Number.isFinite(operand)) {
      setError('Введіть скінченне число.');
      return null;
    }

    return operand;
  }

  function applyOperation(nextResult: number) {
    if (!Number.isFinite(nextResult)) {
      setError('Результат завеликий для обчислення.');
      return;
    }

    setResult(nextResult);
    setError('');
  }

  function handleAdd() {
    const operand = getValidatedOperand();
    if (operand === null) return;
    applyOperation(result + operand);
  }

  function handleSubtract() {
    const operand = getValidatedOperand();
    if (operand === null) return;
    applyOperation(result - operand);
  }

  function handleMultiply() {
    const operand = getValidatedOperand();
    if (operand === null) return;
    applyOperation(result * operand);
  }

  function handleDivide() {
    const operand = getValidatedOperand();
    if (operand === null) return;

    if (operand === 0) {
      setError('Ділення на нуль неможливе.');
      return;
    }

    applyOperation(result / operand);
  }

  function handleClearInput() {
    setInput('');
    setError('');
  }

  function handleResetResult() {
    setResult(0);
    setError('');
  }

  return (
    <section>
      <h1>Калькулятор</h1>
      <p>Калькулятор із накопичуваним результатом та перевіркою коректності введення.</p>

      <div className="calculator-card">
        <p className="calc-result" aria-live="polite">
          Результат: {result}
        </p>

        <div className="calc-input-group">
          <label htmlFor="operand">Число для операції</label>
          <input
            id="operand"
            type="number"
            step="any"
            value={input}
            onChange={event => {
              setInput(event.currentTarget.value);
              setError('');
            }}
            placeholder="Введіть число"
          />
        </div>

        <div className="calc-grid">
          <button type="button" className="btn" onClick={handleAdd}>
            Додати (+)
          </button>
          <button type="button" className="btn" onClick={handleSubtract}>
            Відняти (−)
          </button>
          <button type="button" className="btn" onClick={handleMultiply}>
            Помножити (×)
          </button>
          <button type="button" className="btn" onClick={handleDivide}>
            Поділити (÷)
          </button>
        </div>

        <div className="calc-reset-grid">
          <button type="button" className="btn" onClick={handleClearInput}>
            Очистити поле
          </button>
          <button type="button" className="btn" onClick={handleResetResult}>
            Скинути результат
          </button>
        </div>

        {error && <p role="alert" className="error-text">{error}</p>}
      </div>
    </section>
  );
}
