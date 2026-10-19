import Heading from './components/Heading';
import Subject from './components/Subject';

export default function App() {
  return (
    <main className="page">
      <Heading
        firstName="Сергій"
        lastName="Перерва"
        group="ІПЗ-41"
      />

      <section aria-labelledby="subjects-title">
        <h2 id="subjects-title">Мої дисципліни</h2>

        <div className="subjects">
          <Subject
            subjectName="Розробка кросплатформних додатків на базі React Native"
            lessonType="Практичні"
            description="Розробка кросплатформних мобільних інтерфейсів та застосунків з використанням React Native."
            credits={5}
            semester="VII"
            teacher="Ящук Андрій Анатолійович"
            classroom="ауд. П 304"
            building="Корпус П, 3 поверх"
          />
          <Subject
            subjectName="Платформа .NET і мова програмування C#"
            lessonType="Практичні"
            description="Програмування мовою C#, об'єктно-орієнтована архітектура та створення застосунків на платформі .NET."
            credits={5}
            semester="VII"
            teacher="Ящук Андрій Анатолійович"
            classroom="ауд. П 304"
            building="Корпус П, 3 поверх"
          />
          <Subject
            subjectName="Адміністрування комп'ютерних систем та мереж"
            lessonType="Лекції"
            description="Архітектура систем, налаштування та адміністрування мережевих служб і серверних ОС."
            credits={4}
            semester="VI"
            teacher="Саварин Павло Вікторович"
            classroom="ауд. П 304"
            building="Корпус П, 3 поверх"
          />
          <Subject
            subjectName="Якість програмного забезпечення та тестування"
            lessonType="Лекції"
            description="Методи забезпечення якості, рівні тестування, складання тест-планів та автоматизація тестування ПЗ."
            credits={4}
            semester="VI"
            teacher="Гордєєв Олександр Олександрович"
            classroom="Дистанційно"
          />
        </div>
      </section>
    </main>
  );
}
