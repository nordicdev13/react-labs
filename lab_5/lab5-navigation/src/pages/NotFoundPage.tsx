import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section>
      <h1>404 — Сторінку не знайдено</h1>
      <p>Запитуваної адреси не існує.</p>
      <p>
        <Link to="/" className="btn btn-primary">Повернутися на Головну</Link>
      </p>
    </section>
  );
}
