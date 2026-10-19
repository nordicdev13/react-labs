import Heading from './components/Heading';
import Subject from './components/Subject';

export default function App() {
  return (
    <main className="page">
      <Heading
        firstName="Сергій"
        lastName="Перерва"
        group="ІПЗ-21"
      />

      <section aria-labelledby="subjects-title">
        <h2 id="subjects-title">Мої дисципліни</h2>

        <div className="subjects">
          <Subject
            subjectName="Розробка мобільних застосунків"
            description="Розробка мобільних інтерфейсів та застосунків з використанням React Native."
            credits={5}
            semester={4}
            teacher="Ірина Мельник"
          />
          <Subject
            subjectName="Бази даних та інформаційні системи"
            description="Моделювання даних, нормалізація, складання та оптимізація запитів SQL."
            credits={4}
            semester={4}
            teacher="Андрій Бондар"
          />
          <Subject
            subjectName="Комп’ютерні мережі"
            description="Архітектура мереж, стеки протоколів TCP/IP, маршрутизація та обмін даними."
            credits={4}
            semester={4}
          />
          <Subject
            subjectName="Алгоритми та структури даних"
            description="Оцінка складності алгоритмів, дерева, графи, методи сортування та динамічне програмування."
            credits={5}
            semester={3}
            teacher="Олександр Шевченко"
          />
        </div>
      </section>
    </main>
  );
}
