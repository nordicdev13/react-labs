import { useState } from 'react';

export default function ExtraImage() {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLoad() {
    setIsLoading(true);
    setError('');

    try {
      const imageModule = await import('../assets/detail.svg');
      setUrl(imageModule.default);
    } catch {
      setError('Не вдалося отримати ресурс. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="resource-section">
      <h2>3. Додаткове зображення (динамічний імпорт)</h2>
      <p>Це зображення завантажується через <code>await import(...)</code> тільки після натискання кнопки.</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleLoad}
        disabled={isLoading || url !== null}
      >
        {isLoading ? 'Завантаження…' : url !== null ? 'Зображення завантажено' : 'Показати зображення'}
      </button>
      {error && <p role="alert" className="error-text">{error}</p>}
      {url !== null && (
        <figure style={{ marginTop: '16px' }}>
          <img
            src={url}
            alt="Деталь навчального корпусу (схема зони відпочинку)"
            onError={() => {
              setUrl(null);
              setError('Файл отримано, але зображення не відобразилося.');
            }}
          />
          <figcaption>Локальний файл завантажено динамічно з src/assets/detail.svg.</figcaption>
        </figure>
      )}
    </section>
  );
}
