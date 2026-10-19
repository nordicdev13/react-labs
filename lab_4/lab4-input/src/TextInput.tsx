import { useState, type FormEvent } from 'react';

type TextInputProps = {
  value: string;
  onTextChange: (text: string) => void;
};

export default function TextInput({ value, onTextChange }: TextInputProps) {
  const [submittedText, setSubmittedText] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (value.trim() === '') {
      setError('Поле не може бути порожнім або містити лише пробіли');
      return;
    }

    setError('');
    setSubmittedText(value);
  }

  return (
    <section aria-labelledby="form-title">
      <h2 id="form-title">Введення тексту</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Текст:
          <input
            type="text"
            value={value}
            onChange={event => onTextChange(event.currentTarget.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {error && <p role="alert" className="error-message">{error}</p>}
      {submittedText && (
        <div className="submitted-box">
          <p style={{ margin: 0 }}>Підтверджений текст: <strong>{submittedText}</strong></p>
        </div>
      )}
    </section>
  );
}
