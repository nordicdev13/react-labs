import { useState } from 'react';
import ExtraImage from '../components/ExtraImage';
import campusUrl from '../assets/campus.svg';

const photoUrl = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=960&q=80';
const videoWatchUrl = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
const videoEmbedUrl = 'https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ';

export default function MediaPage() {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section>
      <h1>Зображення і відео</h1>
      <p>На цій сторінці продемонстровано різні способи підключення медіаресурсів.</p>

      <section className="resource-section">
        <h2>1. Локальне статичне зображення</h2>
        <figure>
          <img src={campusUrl} alt="Схема навчального кампусу" />
          <figcaption>Локальний файл завантажено статичним імпортом із src/assets/campus.svg.</figcaption>
        </figure>
      </section>

      <section className="resource-section">
        <h2>2. Зовнішнє зображення</h2>
        {photoError ? (
          <p role="status" className="error-text">
            Не вдалося завантажити зовнішнє зображення. Локальні ресурси та сторінки продовжують працювати.
          </p>
        ) : (
          <figure>
            <img
              src={photoUrl}
              alt="Лісова природа та сонячне проміння"
              loading="lazy"
              onError={() => setPhotoError(true)}
            />
            <figcaption>
              Джерело: <a href={photoUrl} target="_blank" rel="noopener noreferrer">Unsplash</a> (потрібне підключення до мережі).
            </figcaption>
          </figure>
        )}
      </section>

      <ExtraImage />

      <section className="resource-section">
        <h2>4. Вбудоване відео</h2>
        <p>Короткометражна анімація Big Buck Bunny від Blender Foundation.</p>
        <iframe
          className="video-frame"
          src={videoEmbedUrl}
          title="Big Buck Bunny — анімація Blender Foundation"
          loading="lazy"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
        <p className="caption">
          Якщо плеєр заблоковано або недоступний,{' '}
          <a href={videoWatchUrl} target="_blank" rel="noopener noreferrer">
            відкрийте відео на YouTube
          </a>.
        </p>
      </section>
    </section>
  );
}
